document.addEventListener('DOMContentLoaded', () => {
  class App {
    constructor() {
      this.init();
    }

    init() {
      this.addEventListeners();
    }

    showTimeEndedModal() {
      let modalReview = document.querySelector("#modal-review");
      let reviewBtn = document.querySelector("#review-button");
      modalReview.style.display = "block";
      
      reviewBtn.addEventListener('click', () => {
        
      });

    }

    addEventListeners() {
      let startBtn = document.querySelector(".start");

      startBtn.addEventListener("click", () => {
        let modalStart = document.querySelector("#modal-start");
        modalStart.style.display = "none";
        this.essay = new Essay();
        // setTimeout(this.essay.startTimer.bind(this), 1);
      });
    }

    // checkWordCount() {
    //   let checkWordCountBtn = document.querySelector("#check-word-count-button");
      
    //   checkWordCountBtn.addEventListener('click', () => {
    //     let text = document.querySelector("textarea").value;
    //     let numWords = text.match(/(\w|')*(\w|\-)+/gi).length;

    //     alert(numWords);
    //   });
    // }

    // getNewQuestion() {
    //   let getNewQuestionBtn = document.querySelector("#get-new-question-button");

    //   getNewQuestionBtn.addEventListener('click', () => {

    //   });
    // }
    

  }

  class Essay {
    constructor() {
      this.init();
    }

    init() {
      this.selectQuestion();
      this.setTab();
    }

    insertQuestion(question) {
      let questionContainer = document.querySelector("#question-container");
      this.processTemplates();
      questionContainer.innerHTML = this.templates["question-template"]({question});
      // debugger;
    }

    selectQuestion() {
      fetch("./test-questions.json")
      .then(response => response.json())
      .then(json => this.insertQuestion(Utilities.getRandom(json.questions)));
    }

    processTemplates() {
      this.templates = {};

      document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
        this.templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
      });
    }

    setTab() {
      let essayArea = document.querySelector("#essay-area");

      essayArea.addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
      
          this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);
      
          this.selectionStart =
            this.selectionEnd = start + 1;
        }
      });
    }
    
    startTimer(){      
      let seconds = 1800;
      let countDiv = document.getElementById("timer");
      const countDown = setInterval(() => {
                        secondsPass();
                      }, 1000);
      
      const secondsPass = () => {
        let min = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        
        if (remainingSeconds < 10) {
          remainingSeconds = '0' + remainingSeconds;
        }

        if (min < 10) {
          min = '0' + min;
        }
      
      // let textArea = document.querySelector("textarea");
      // textArea.disabled = false;

      countDiv.innerHTML = min + ":" + remainingSeconds;
        
        if (seconds > 0) {
          seconds = seconds - 1;
        } else {
          clearInterval(countDown);
          textArea.disabled = true;
          this.showTimeEndedModal();
        }
      }
    }
  }

  class Utilities {
    static getRandom(questions) {
      let index = Math.floor(Math.random() * questions.length);
      return questions[index];
    }
  }

  new App();
});
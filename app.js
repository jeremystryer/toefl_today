document.addEventListener('DOMContentLoaded', () => {
  class App {
    constructor() {
      this.init();
    }

    init() {
      this.selectQuestion();
      this.bind();
      setTimeout(this.startTimer.bind(this), 1);
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
      
      let textArea = document.querySelector("textarea");
      textArea.disabled = false;

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

    showTimeEndedModal() {
      let modal = document.querySelector("#modal");
      let reviewBtn = document.querySelector("#review-button");
      modal.style.display = "block";
      
      reviewBtn.addEventListener('click', () => {
        
      });

    }

    bind() {
      this.setTab();
      this.checkWordCount();
      this.getNewQuestion();
    }

    checkWordCount() {
      let checkWordCountBtn = document.querySelector("#check-word-count-button");
      
      checkWordCountBtn.addEventListener('click', () => {
        let text = document.querySelector("textarea").value;
        let numWords = text.match(/(\w|')*(\w|\-)+/gi).length;

        alert(numWords);
      });
    }

    getNewQuestion() {
      let getNewQuestionBtn = document.querySelector("#get-new-question-button");

      getNewQuestionBtn.addEventListener('click', () => {

      });
    }

    setTab() {
      let textArea = document.querySelector('textarea');

      textArea.addEventListener('keydown', function(e) {
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
    
    insertQuestion(question) {
      let questionPlacement= document.getElementById("question");
      let essayArea = document.getElementById("essay-area");

      this.processTemplates();
      questionPlacement.innerHTML = this.templates["question-template"]({question});
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
  }

  class Essay {

  }

  class Utilities {
    static getRandom(questions) {
      let index = Math.floor(Math.random() * questions.length);
      return questions[index];
    }
  }

  new App();
});
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
      let newQuestionBtn = document.querySelector(".new-question");

      startBtn.addEventListener("click", () => {
        this.essay = new Essay();
        setTimeout(this.essay.startTimer.bind(this), 5000);
      });

      newQuestionBtn.addEventListener("click", () => {
        this.essay.resetTimer();
        this.essay = new Essay();
        setTimeout(this.essay.startTimer.bind(this), 5000);
      });
    }
  }

  class Essay {
    constructor() {
      this.init();
    }

    init() {
      this.selectQuestion();
      this.setTab();
      this.addEventListeners();
    }

    addEventListeners() {
      this.checkWordCount();
    }

    resetTimer() {
      let countDiv = document.getElementById("timer");
      
    }

    checkWordCount() {
      let checkWordCountBtn = document.querySelector(".word-count");
      
      checkWordCountBtn.addEventListener('click', () => {
        let essayArea = document.querySelector("#essay-area");
        let text = essayArea.textContent;    
        let numWords = text.match(/(\w|')*(\w|\-)+/gi);

        if (!numWords) {
          numWords = "";
        }

        alert(numWords.length);
      });
    }

    insertQuestion(question) {
      let questionContainer = document.querySelector("#question-container");
      this.processTemplates();
      questionContainer.innerHTML = this.templates["question-template"]({question});
      this.removeInstructions();
    }

    allowTyping() {
      let essayArea = document.querySelector("#essay-area");
      essayArea.setAttribute("contenteditable", "true");
      essayArea.setAttribute("data-placeholder", "Edit");
    }

    startEssay(question) {
      this.insertQuestion(question);
    }

    removeInstructions() {
      let essayArea = document.querySelector("#essay-area");
      let essayAreaHeight = essayArea.offsetHeight;
      essayArea.innerHTML = "";
      essayArea.style.minHeight = essayAreaHeight + "px";
    }

    selectQuestion() {
      fetch("./test-questions.json")
      .then(response => response.json())
      // .then(json => this.insertQuestion(Utilities.getRandom(json.questions)));
      .then(json => this.startEssay(Utilities.getRandom(json.questions)));
    }

    processTemplates() {
      this.templates = {};

      document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
        this.templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
      });
    }

    setTab() {
      let essayArea = document.querySelector("#essay-area");

      essayArea.addEventListener("keydown", function(e) {
        if (e.keyCode === 9) {
          e.preventDefault();
          var doc = e.target.ownerDocument.defaultView;
          var sel = doc.getSelection();
          var range = sel.getRangeAt(0);
  
          var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
          range.insertNode(tabNode);
  
          range.setStartAfter(tabNode);
          range.setEndAfter(tabNode); 
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    }
    
    startTimer() {     
      let seconds = 1800;
      let countDiv = document.getElementById("timer");
      let optionsContainer = document.querySelector("#options");
      let options = [...optionsContainer.children];

      options.forEach(option => option.disabled = false);

      this.essay.allowTyping();
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

      countDiv.innerHTML = min + ":" + remainingSeconds;
        
        if (seconds > 0) {
          seconds = seconds - 1;
        } else {
          clearInterval(countDown);
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
document.addEventListener('DOMContentLoaded', () => {
  class App {
    constructor() {
      // this.essay = new Essay();
      this.init();
    }

    init() {
      this.addEventListeners();
    }

    addEventListeners() {
      this.newQuestionBtn = document.querySelector("#new-question-btn");
      this.newQuestionBtn.addEventListener("click", () => {
        this.selectQuestion();
      });
    }
    
    insertQuestion(question) {
      let questionSection = document.getElementById("question-section");
      let modal = document.getElementById("modal");
      let modalContent = document.getElementById("modal-content");

      this.processTemplates();
      // questionSection.innerHTML = this.templates["question-template"]({question});

      modal.style.display = "block";
      // modalContent.innerHTML = this.templates["question-template"]({question});
      modalContent.insertAdjacentHTML('afterbegin', this.templates["question-template"]({question}));
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
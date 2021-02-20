document.addEventListener('DOMContentLoaded', () => {
  let templates = {};

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  selectQuestion();

  function selectQuestion() {
    fetch("./test-questions.json")
    .then(response => response.json())
    .then(json => insertQuestion(random(json.questions)));
  }

  function random(allQuestions) {
    let index = Math.floor(Math.random() * allQuestions.length);
    return allQuestions[index];
  }

  function insertQuestion(question) {
    let questionSection = document.getElementById("question-section");
    questionSection.innerHTML = templates["question-template"]({question});
  }
});
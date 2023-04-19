import quizData from './quizData.js';

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
let score = 0;

function buildQuiz() {
  const output = [];

  quizData.forEach((question, index) => {
    const answers = [];

    for (let i = 0; i < question.answers.length; i++) {
      answers.push(`
        <label class="d-block answer">
          <input type="radio" name="question-${index}" value="${question.answers[i]}"> ${question.answers[i]}
        </label>
      `);
    }

    output.push(`
      <div class="mb-4">
        <div class="question">${index + 1}. ${question.question}</div>
        <div class="answers">${answers.join('')}</div>
      </div>
    `);
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  quizData.forEach((question, index) => {
    const answerContainer = answerContainers[index];
    const selectedAnswer = answerContainer.querySelector(`input[name="question-${index}"]:checked`);
    const isCorrect = selectedAnswer.value === question.correctAnswer;

    if (isCorrect) {
      answerContainer.classList.add('correct');
      score++;
    } else {
      answerContainer.classList.add('incorrect');
    }
  });

  quizContainer.innerHTML += `<div class="text-center mt-4">You scored ${score} out of ${quizData.length}.</div>`;
  submitButton.disabled = true;
}

buildQuiz();

submitButton.addEventListener('click', showResults);

const questions = [
  {
    question: "Which tag is used to create a hyperlink?",
    answers: [
      {
        answer: "<a>",
        correct: true,
      },
      {
        answer: "<img>",
        correct: false,
      },
      {
        answer: "<dl>",
        correct: false,
      },
      {
        answer: "<link>",
        correct: false,
      },
    ],
  },
  {
    question: "What is the HTML element used to display an image?",
    answers: [
      {
        answer: "<img>",
        correct: true,
      },
      {
        answer: "<image>",
        correct: false,
      },
      {
        answer: "<pic>",
        correct: false,
      },
      {
        answer: "<images>",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the tags below must be located in the <head> section of your page?",
    answers: [
      {
        answer: "<title>",
        correct: true,
      },
      {
        answer: "<form>",
        correct: false,
      },
      {
        answer: "<link>",
        correct: false,
      },
      {
        answer: "<head>",
        correct: false,
      },
    ],
  },
  {
    question: "How to make a text italic?",
    answers: [
      {
        answer: "<i>Some text.</i>",
        correct: true,
      },
      {
        answer: "<italic>Some text.</italic>",
        correct: false,
      },
      {
        answer: "<em>Some text.</em>",
        correct: false,
      },
      {
        answer: "<strong>Some text.</strong>",
        correct: false,
      },
    ],
  },
  {
    question: "Which of the following HTML tags is not valid?",
    answers: [
      {
        answer: "<h8>",
        correct: true,
      },
      {
        answer: "<h1>",
        correct: false,
      },
      {
        answer: "<h2>",
        correct: false,
      },
      {
        answer: "<h3>",
        correct: false,
      },
    ],
  },
  {
    question: "Which of the following HTML tags is not valid?",
    answers: [
      {
        answer: "fontSize",
        correct: true,
      },
      {
        answer: "alt",
        correct: false,
      },
      {
        answer: "target",
        correct: false,
      },
      {
        answer: "id",
        correct: false,
      },
    ],
  },
  {
    question:
      "What is the HTML attribute used to reference the location of an image inside the <img> tag?",
    answers: [
      {
        answer: "src",
        correct: true,
      },
      {
        answer: "href",
        correct: false,
      },
      {
        answer: "link",
        correct: false,
      },
      {
        answer: "location",
        correct: false,
      },
    ],
  },
  {
    question: "Select inline elements.",
    answers: [
      {
        answer: "<span>",
        correct: true,
      },
      {
        answer: "<p>",
        correct: false,
      },
      {
        answer: "<h1>",
        correct: false,
      },
      {
        answer: "<div>",
        correct: false,
      },
    ],
  },
];

shuffleAnswers(questions);

const questionEl = document.querySelector(".question");
const answersButtons = document.querySelector(".answers");
const nextButtonEl = document.querySelector(".nextBtn");
const startBtnEl = document.querySelector(".start-btn");

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  questionEl.textContent = "Start quiz!";

  startBtnEl.addEventListener("click", () => {
    answersButtons.classList.remove("hidden");

    if (startBtnEl.classList.contains("show")) {
      startBtnEl.classList.remove("show");
    }

    startBtnEl.classList.add("hidden");

    showQuestion();
  });
}

function showQuestion() {
  resetField();

  questionEl.textContent = `${currentQuestionIndex + 1}. ${
    questions[currentQuestionIndex].question
  }`;

  const answersList = shuffleAnswers(questions[currentQuestionIndex].answers);

  answersList.forEach((btnAnswer) => {
    const button = createButton(btnAnswer.answer, answersButtons);

    button.addEventListener("click", () => {
      if (btnAnswer.correct) {
        button.classList.add("correct");
        score++;
      } else {
        button.classList.add("incorrect");
      }

      // Make all buttons to disabled after click for choice
      Array.from(answersButtons.children).forEach((button) => {
        button.disabled = true;
      });

      nextButtonEl.classList.add("show");
      nextButtonEl.textContent = "Next";
    });
  });
}

// Clean container with answer buttons
function resetField() {
  answersButtons.innerHTML = "";
  nextButtonEl.classList.remove("show");
  nextButtonEl.classList.add("hidden");
}

function createButton(answer, parent) {
  const button = document.createElement("button");

  button.classList.add("answer");
  button.textContent = answer;

  return parent.appendChild(button);
}

function showNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetField();

  if (nextButtonEl.classList.contains("hidden")) {
    nextButtonEl.classList.add("show");
  }

  questionEl.textContent = `Your score: ${score}/${questions.length}`;
  nextButtonEl.textContent = "Try again";
}

function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}

nextButtonEl.addEventListener("click", () => {
  if (currentQuestionIndex > questions.length - 1) {
    startQuiz();
    startBtnEl.classList.add("show");
    nextButtonEl.classList.remove("show");
  } else {
    showNextQuestion();
  }
});

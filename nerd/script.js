const questions = [
  {
    question: "What's your favorite way to spend a weekend?",
    options: [
      "Reading code",
      "Hanging with friends",
      "Watching movies",
      "Playing video games",
    ],
  },
  {
    question: "Which gadget excites you the most?",
    options: ["VR headset", "Bluetooth speaker", "Drone", "ear pods"],
  },
  {
    question: "Your go-to outfit is...",
    options: [
      "Round Neck & jeans",
      "Blazer & kicks",
      "Hoodie & joggers",
      "Button-down & Pant Trousers",
    ],
  },
  {
    question: "How do you handle group projects?",
    options: [
      "Lead the team",
      "Keep the vibe",
      "Take notes",
      "Research deeply",
    ],
  },
  {
    question: "Pick a snack:",
    options: ["Trail mix", "Buger", "Popcorn", "Pizza"],
  },
];

let currentQuestion = 0;
let score = 0;
let userName = "";
let answers = []; // Optional: to remember user selections

const errorMessage = document.querySelector(".error-message");
function startQuiz() {
  const input = document.getElementById("username");
  userName = input.value.trim();
  if (userName === "") {
    errorMessage.innerText = "Please enter your name";
    return;
  }
  setTimeout(() => {
    errorMessage.innerText = ""; // Clear error message after a short delay
  }, 2000);
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("quizPage").classList.remove("hidden");
  document.getElementById("greeting").innerText = `Hello, ${userName}!`;
  showQuestion();
}

function backToPreviousQuiz() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  } else {
    alert("This is the first question.");
  }
}
function firstQuestion() {
  firstQuestion.classList.add("show");
  setTimeout(() => {
    firstQuestion.classList.remove("show");
  }, 3000);
}
function copyHandle() {
  if (questions[0]) return;
  firstQuestion();
}
function showQuestion() {
  const questionBox = document.getElementById("questionText");
  const optionsBox = document.getElementById("optionsContainer");
  const q = questions[currentQuestion];

  // Show the question
  questionBox.innerHTML = `<p>${q.question}</p>`;

  // Build the options separately
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    const checked = answers[currentQuestion] === idx ? "checked" : "";
    optionsHtml += `
      <div>
        <input type="radio" name="option" value="${idx}" id="opt${idx}" ${checked}>
        <label for="opt${idx}">${opt}</label>
      </div>`;
  });

  optionsBox.innerHTML = optionsHtml;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option.");
    return;
  }

  const selectedValue = parseInt(selected.value);
  answers[currentQuestion] = selectedValue;

  if (selectedValue === 0 || selectedValue === 2) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");

  const resultText =
    score >= 3
      ? `${userName}, you're a bit of a Nurd 😄`
      : `${userName}, you're totally Cool 😎`;

  document.getElementById("result").innerText = resultText;
}

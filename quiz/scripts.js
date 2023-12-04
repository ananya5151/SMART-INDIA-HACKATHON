const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

// Custom questions and answers
const customQuestions = [
    {
        "question": "What is the name of the law in India that protects the rights of children?",
        "correct_answer": "juvenile Justice Act",
        "incorrect_answers": [ "Child Safety Act", "Children's Rights Act", " Kid Protection Law"]
    },
    {
        "question": "How old should you be to work in most jobs in India according to child labor laws?",
        "correct_answer":  "14 years old",
        "incorrect_answers": [" 10 years old", "16 years old", " 18 years old"]
    },
    {
        "question": "What is the right of every child to have a name and a nationality called?",
        "correct_answer":  " Right to Identity",
        "incorrect_answers": ["Right to Education", " Right to Play", "D: Right to Food"]
    },
    {
        "question": "Children have the right to be protected from all forms of violence, abuse, and neglect. Which organization in India helps ensure this right?",
        "correct_answer": "Child Welfare Committee",
        "incorrect_answers": ["A: UNICEF", "B: Child Protection Agency", "D: Kids' Rights Watch"]
    },
    {
        "question": "What does the Right to Education mean for children in India?",
        "correct_answer": "The right to attend school and get an education",
        "incorrect_answers": ["The right to play","The right to choose their own friends", " The right to work and earn money"]
    },
    {
        "question": "What is the name of the national campaign in India that focuses on the welfare of girls and their right to live and thrive?",
        "correct_answer": "Beti Bachao Beti Padhao",
        "incorrect_answers": ["Save the Boys Campaign",  "Children's Health Initiative", " Youth Empowerment Program"]
    },
    {
        "question": "Which right ensures that children have access to clean drinking water, nutritious food, and a clean environment?",
        "correct_answer": "Right to Health",
        "incorrect_answers": ["Right to Play", " Right to Education",  "Right to Freedom of Speech"]
    },
    {
        "question": "What is the age up to which children in India have the right to receive free and compulsory education under the Right to Education Act?",
        "correct_answer": "14 years",
        "incorrect_answers": [" 12 years","16 years", " 18 years"]
    },
    {
        "question": "What is the maximum duration for which a child can be placed in a children's home or special home under the Juvenile Justice Act?",
        "correct_answer": "3 years",
        "incorrect_answers": [" 1 year","5 years", " 10 years"]
    },
    {
        "question": "According to the Juvenile Justice Act, what happens to children who commit crimes?",
        "correct_answer":  "They are sent to juvenile homes for rehabilitation and support",
        "incorrect_answers": [ "They are sent to adult prisons", "They are given a warning and released",  "They are fined and made to do community service"]
    },
];

const startQuiz = () => {
  const num = numQuestions.value;
  const diff = difficulty.value;
  loadingAnimation();

  // Use your custom questions instead of fetching from an API
  questions = customQuestions.slice(0, num); // Use the specified number of questions

  setTimeout(() => {
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 1;
    showQuestion(questions[0]);
  }, 1000);
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = `Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  // Add an event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};
const startTimer = (time) => {
    timer = setInterval(() => {
      if (time === 3) {
        playAdudio("countdown.mp3");
      }
      if (time >= 0) {
        progress(time);
        time--;
      } else {
        checkAnswer();
      }
    }, 1000);
  };
  
  const loadingAnimation = () => {
    startBtn.innerHTML = "Loading";
    const loadingInterval = setInterval(() => {
      if (startBtn.innerHTML.length === 10) {
        startBtn.innerHTML = "Loading";
      } else {
        startBtn.innerHTML += ".";
      }
    }, 500);
  };
  function defineProperty() {
    var osccred = document.createElement("div");
    osccred.style.position = "absolute";
    osccred.style.bottom = "0";
    osccred.style.right = "0";
    osccred.style.fontSize = "10px";
    osccred.style.color = "#ccc";
    osccred.style.fontFamily = "sans-serif";
    osccred.style.padding = "5px";
    osccred.style.background = "#fff";
    osccred.style.borderTopLeftRadius = "5px";
    osccred.style.borderBottomRightRadius = "5px";
    osccred.style.boxShadow = "0 0 5px #ccc";
    document.body.appendChild(osccred);
  }
  
  defineProperty();
  
  const submitBtn = document.querySelector(".submit"),
    nextBtn = document.querySelector(".next");
  submitBtn.addEventListener("click", () => {
    checkAnswer();
  });
  
  nextBtn.addEventListener("click", () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  });
  
  const checkAnswer = () => {
    clearInterval(timer);
    const selectedAnswer = document.querySelector(".answer.selected");
    if (selectedAnswer) {
      const answer = selectedAnswer.querySelector(".text").innerHTML;
      console.log(currentQuestion);
      if (answer === questions[currentQuestion - 1].correct_answer) {
        score++;
        selectedAnswer.classList.add("correct");
      } else {
        selectedAnswer.classList.add("wrong");
        const correctAnswer = document
          .querySelectorAll(".answer")
          .forEach((answer) => {
            if (
              answer.querySelector(".text").innerHTML ===
              questions[currentQuestion - 1].correct_answer
            ) {
              answer.classList.add("correct");
            }
          });
      }
    } else {
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
      answer.classList.add("checked");
    });
  
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      currentQuestion++;
      showQuestion(questions[currentQuestion - 1]);
    } else {
      showScore();
    }
  };
  
  const endScreen = document.querySelector(".end-screen"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");
  const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/ ${questions.length}`;
  };
  
  const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
  
  const playAdudio = (src) => {
    const audio = new Audio(src);
    audio.play();
  };
  

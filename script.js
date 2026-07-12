 (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', 747300);
    
document.addEventListener('DOMContentLoaded', function() {

  const quizData = [
      {
          question: "You...",
          weight: 0.1,
          options: [
              { 
                text: "don't like showing emotions and weakness and are slow to trust.",
                results: ["C", "F", "D", "A", "B"]
              },
              { 
                text: "see the best in people, but do not tolerate any bullshit if they prove otherwise",
                results: ["E", "G"]
              },
          ]
      },
      { 
          question: "Someone wronged you, you...",
          weight: 0.2,
          options: [
              { 
                text: "Steal something imposrtant from them and leave a note so they know it was you.",
                results: ["D"]
              },
              { 
                text: "Forgive them and move on.",
                results: ["E"]
              },
              { 
                text: "Run an elaborate scheme to ruin them completely.",
                results: ["B"]
              },
              { 
                text: "Wait for them in a dark alley and confront them. Show them your sword. Scare them.",
                results: ["Veyre", "C"]
              },
              { 
                text: "Hide a smelly pouch in their house that makes it impossibel to be inside. Watch them go mad.",
                results: ["A"]
              },
              { 
                text: "Break into their house at night and convince them you've poisoned them. Watch them beg for an untidode. Smile and leave. There was no poison.",
                results: ["G"]
              },
          ]
      },
      {
          question: "What are you fighting for?",
          weight: 0.3,
          options: [
              { 
                text: "For the person / people I love.",
                results: ["D"]
              },
              { 
                text: "For what is right.",
                results: ["E", "G"]
              },
              { 
                text: "For revenge.",
                results: ["B"]
              },
              { 
                text: "For redemption.",
                results: ["A", "C"]
              },
              { 
                text: "For duty.",
                results: ["Veyre"]
              },
          ]
      },
      {
          question: "When you're not busy fighting for/against rebels, your hobby is...",
          weight: 0.2,
          options: [
              { 
                text: "Playing cards",
                results: ["D"]
              },
              { 
                text: "Singing",
                results: ["G"]
              },
              { 
                text: "Playing an instrument",
                results: ["E"]
              },
              { 
                text: "Restoring old things.",
                results: ["B"]
              },
              { 
                text: "Running innocent pranks",
                results: ["A", "C"]
              },
              { 
                text: "Practicing marcial arts",
                results: ["F"]
              },{ 
                text: "Gardening",
                results: ["C"]
              },
          ]
      },
      {
          question: "Can you lie easily?",
          weight: 0.1,
          options: [
              { 
                text: "Yes",
                results: ["D", "B"]
              },
              { 
                text: "No",
                results: ["F", "E", "A"]
              },
              { 
                text: "No but I am good at withholding information",
                results: ["G", "C"]
              },
          ]
      },
      {
          question: "You rely on",
         weight: 0.2,
          options: [
              { 
                text: "Instinct",
                results: ["F"]
              },
               { 
                text: "Planning",
                results: ["C", "B"]
              },
              { 
                text: "Logic",
                results: ["A"]
              },
              { 
                text: "Your (found) family",
                results: ["E"]
              },
              { 
                text: "Skill",
                results: ["D", "G"]
              },
          ]
      }
  ];

  let currentQuestion = 0;
  let userAnswers = Array(quizData.length).fill(null);
  let result = null;
  let characterScores = {};
  
  const quizQuestionElement = document.getElementById("quiz-question");
  const quizOptionsElement = document.getElementById("quiz-options");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const restartBtn = document.getElementById("restart-btn");
  const progressBar = document.getElementById("progress");
  const resultContainer = document.getElementById("result-container");
  const resultText = document.getElementById("result-text");

  function initQuiz() {
      initializeCharacterScores();
      showQuestion();
      updateProgress();
      setupEventListeners();
       setupSubscriptionForm();
  }

  function showQuestion() {
      const question = quizData[currentQuestion];
      quizQuestionElement.textContent = question.question;
      quizOptionsElement.innerHTML = "";

      question.options.forEach((option, index) => {
          const optionElement = document.createElement("div");
          optionElement.classList.add("option");
          optionElement.textContent = option.text;
          optionElement.dataset.index = index;

          if (userAnswers[currentQuestion] === index) {
              optionElement.classList.add("selected");
          }

          optionElement.addEventListener("click", () => selectOption(index));
          quizOptionsElement.appendChild(optionElement);
      });

      prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
      nextBtn.style.display = currentQuestion === quizData.length - 1 ? "none" : "inline-block";
      submitBtn.style.display = currentQuestion === quizData.length - 1 ? "inline-block" : "none";
  }

  function selectOption(index) {
      userAnswers[currentQuestion] = index;
      showQuestion();
  }

  function updateProgress() {
      const progress = ((currentQuestion + 1) / quizData.length) * 100;
      progressBar.style.width = `${progress}%`;
  }

  function setupEventListeners() {
      prevBtn.addEventListener("click", () => {
          if (currentQuestion > 0) {
              currentQuestion--;
              showQuestion();
              updateProgress();
          }
      });

      nextBtn.addEventListener("click", () => {
          if (currentQuestion < quizData.length - 1) {
              currentQuestion++;
              showQuestion();
              updateProgress();
          }
      });

      submitBtn.addEventListener("click", calculateResult);
      restartBtn.addEventListener("click", restartQuiz);
  }

  function initializeCharacterScores() {
      quizData.forEach(question => {
          question.options.forEach(option => {
              option.results.forEach(character => {
                  if (!characterScores[character]) {
                      characterScores[character] = 0;
                  }
              });
          });
      });
  }


  

function calculateResult() {
    if (userAnswers.some(answer => answer === null)) {
        alert("Please answer all questions!");
        return;
    }

    initializeCharacterScores();

    // Calculate scores based on user answers
    quizData.forEach((question, questionIndex) => {
        const selectedOptionIndex = userAnswers[questionIndex];
        const selectedOption = question.options[selectedOptionIndex];
        const weight = question.weight;

        selectedOption.results.forEach(character => {
            characterScores[character] += weight;
        });
    });

    let maxScore = 0;
    let resultCharacter = "";

    for (const character in characterScores) {
        if (characterScores[character] > maxScore) {
            maxScore = characterScores[character];
            resultCharacter = character;
        }
    }

    document.getElementById("result-input").value = resultCharacter;

    document.querySelector('.quiz-navigation').style.display = 'none';

    quizOptionsElement.innerHTML = "";
    resultContainer.classList.remove("hidden");
}


function setupSubscriptionForm() {
    const form = document.getElementById("subscription-form");
    const messageElement = document.getElementById("subscription-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-input").value;
        const name = document.getElementById("name-input").value;
        const result = document.getElementById("result-input").value;

        try {
            const response = await fetch("https://mailerlite-proxy-worker.ayleen-k-kyrstin.workers.dev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, name, result }),
            });

            if (response.ok) {
                messageElement.textContent = "Success! Check your email for your result.";
                messageElement.style.color = "green";
                form.reset();
            } else {
                throw new Error("Failed to subscribe.");
            }
        } catch (error) {
            messageElement.textContent = "Error: Could not subscribe. Please try again.";
            messageElement.style.color = "red";
            console.error("Error:", error);
        }
    });
}


function restartQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizData.length).fill(null);
    resultContainer.classList.add("hidden");
    showQuestion();
    updateProgress();
}

  initQuiz();

});
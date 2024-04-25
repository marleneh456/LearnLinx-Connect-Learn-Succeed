$(document).ready(function () {
    $('#html').click(function () {
        showVideoAndQuiz('HTML', 'https://www.youtube.com/embed/qz0aGYrrlhU?si=uPa8lFjlrd2-nIRw');
    });

    $('#css').click(function () {
        showVideoAndQuiz('CSS', 'https://www.youtube.com/embed/1PnVor36_40?si=Uyv1sGlf6RlOBA-s');
    });

    $('#javascript').click(function () {
        showVideoAndQuiz('JavaScript', 'https://www.youtube.com/embed/W6NZfCO5SIk?si=W-6Q25ao6Sphctbo');
    });
});

function showVideoAndQuiz(subject, link) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `<iframe width="560" height="315" src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    // Find the quiz corresponding to the subject
    const quizData = getQuizDataBySubject(subject);
    displayQuiz(quizData);
}

// Function to retrieve quiz data based on the subject
function getQuizDataBySubject(subject) {
    switch (subject) {
        case 'HTML':
            return htmlQuizData;
        case 'CSS':
            return cssQuizData;
        case 'JavaScript':
            return jsQuizData;
        default:
            return [];
    }
}

// Function to display quiz
function displayQuiz(quizData) {
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');

    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];

    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to display question
    function displayQuestion() {
        const questionData = quizData[currentQuestion];

        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = questionData.question;

        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';

        const shuffledOptions = [...questionData.options];
        shuffleArray(shuffledOptions);

        for (let i = 0; i < shuffledOptions.length; i++) {
            const option = document.createElement('label');
            option.className = 'option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz';
            radio.value = shuffledOptions[i];

            const optionText = document.createTextNode(shuffledOptions[i]);

            option.appendChild(radio);
            option.appendChild(optionText);
            optionsElement.appendChild(option);
        }

        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
    }

    // Function to check answer
    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === quizData[currentQuestion].answer) {
                score++;
            } else {
                incorrectAnswers.push({
                    question: quizData[currentQuestion].question,
                    incorrectAnswer: answer,
                    correctAnswer: quizData[currentQuestion].answer,
                });
            }
            currentQuestion++;
            selectedOption.checked = false;
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }
    }

    // Function to display result
    function displayResult() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }

    // Function to retry quiz
    function retryQuiz() {
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        quizContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
        retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        resultContainer.innerHTML = '';
        displayQuestion();
    }

    // Function to show answer
    function showAnswer() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'none';

        let incorrectAnswersHtml = '';
        for (let i = 0; i < incorrectAnswers.length; i++) {
            incorrectAnswersHtml += `
                <p>
                    <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                    <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                    <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
                </p>
            `;
        }

        resultContainer.innerHTML = `
            <p>You scored ${score} out of ${quizData.length}!</p>
            <p>Incorrect Answers:</p>
            ${incorrectAnswersHtml}
        `;
    }

    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);

    displayQuestion();
}

// HTML Quiz Data
const htmlQuizData = [
    {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Link'],
        answer: 'Hyper Text Markup Language',
    },
    // Add more HTML quiz questions as needed
];

// CSS Quiz Data
const cssQuizData = [
    {
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets'],
        answer: 'Cascading Style Sheets',
    },
    // Add more CSS quiz questions as needed
];

// JavaScript Quiz Data
const jsQuizData = [
    {
        question: 'Which one of these is a JavaScript package manager?',
        options: ['Node.js', 'TypeScript', 'npm', 'ESLint'],
        answer: 'npm',
    },
    // Add more JavaScript quiz questions as needed
];
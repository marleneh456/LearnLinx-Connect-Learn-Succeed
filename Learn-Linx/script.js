$(document).ready(function () {
    $('#html').click(function () {
        showVideoAndQuiz('HTML', 'https://www.youtube.com/embed/qz0aGYrrlhU?si=uPa8lFjlrd2-nIRw');
    });

    $('#html2').click(function () {
        showVideoAndQuiz('HTML 2', 'https://www.youtube.com/embed/FQdaUv95mR8');
    });

    $('#html3').click(function () {
        showVideoAndQuiz('HTML 3', 'https://www.youtube.com/embed/kUMe1FH4CHE');
    });

    $('#html4').click(function () {
        showVideoAndQuiz('HTML 4', 'https://www.youtube.com/embed/916GWv2Qs08');
    });

    $('#css').click(function () {
        showVideoAndQuiz('CSS', 'https://www.youtube.com/embed/1PnVor36_40?si=Uyv1sGlf6RlOBA-s');
    });

    $('#css2').click(function () {
        showVideoAndQuiz('CSS 2', 'https://www.youtube.com/embed/wRNinF7YQqQ');
    });

    $('#css3').click(function () {
        showVideoAndQuiz('CSS 3', 'https://www.youtube.com/embed/1Rs2ND1ryYc?si=zWCsBZImRUCbKBC7');
    });

    $('#css4').click(function () {
        showVideoAndQuiz('CSS 4', 'https://www.youtube.com/embed/yfoY53QXEnI');
    });

    $('#javascript').click(function () {
        showVideoAndQuiz('JavaScript', 'https://www.youtube.com/embed/W6NZfCO5SIk?si=W-6Q25ao6Sphctbo');
    });

    $('#javascript2').click(function () {
        showVideoAndQuiz('JavaScript 2', 'https://www.youtube.com/embed/hdI2bqOjy3c');
    });

    $('#javascript3').click(function () {
        showVideoAndQuiz('JavaScript 3', 'https://www.youtube.com/embed/lfmg-EJ8gm4');
    });

    $('#javascript4').click(function () {
        showVideoAndQuiz('JavaScript 4', 'https://www.youtube.com/embed/E3XxeE7NF30');
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
        case 'HTML 2':
            return html2QuizData;
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
        options: [
            'HyperText Markup Language',
            'HyperTool Markup Language',
            'HyperText Markdown Language',
            'HyperTech Markup Language'
        ],
        answer: 'HyperText Markup Language'
    },
    {
        question: 'Which tool does the instructor recommend for writing HTML and CSS code in the tutorial?',
        options: [
            'Adobe Dreamweaver',
            'Atom',
            'Visual Studio Code',
            'Sublime Text'
        ],
        answer: 'Visual Studio Code'
    },
    {
        question: 'What is the purpose of the <strong> tag in HTML?',
        options: [
            'To change the font color to strong colors like red or blue',
            'To indicate that the text is important and should be bolded',
            'To add special effects to the text such as shadows',
            'To insert images into the document'
        ],
        answer: 'To indicate that the text is important and should be bolded'
    },
    {
        question: 'What does CSS stand for?',
        options: [
            'Cascading Style Sheets',
            'Combined Styling Sheets',
            'Computer Style Sheets',
            'Creative Style Sheets'
        ],
        answer: 'Cascading Style Sheets'
    },
    {
        question: 'Which extension does the instructor use in the tutorial to automatically refresh the web page upon saving the changes?',
        options: [
            'Prettier Code Formatter',
            'Live Server',
            'Auto Refresh',
            'Quick HTML Viewer'
        ],
        answer: 'Live Server'
    }
];
const html2QuizData = [
    {
        question: 'What is HTML an acronym for?',
        options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tech Markup Language', 'Hyperlink Text Markup Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: 'According to Kevin, what is the basic building block of the web?',
        options: ['JavaScript', 'CSS', 'HTML', 'SQL'],
        answer: 'HTML'
    },
    {
        question: 'What does Kevin suggest using to create an HTML website on your computer?',
        options: ['Notepad', 'Adobe Dreamweaver', 'Microsoft Word', 'Visual Studio Code'],
        answer: 'Notepad'
    },
    {
        question: 'What browser does Kevin use to open the HTML file?',
        options: ['Mozilla Firefox', 'Microsoft Edge', 'Google Chrome', 'Safari'],
        answer: 'Microsoft Edge'
    },
    {
        question: 'What is the purpose of the <h1> tag as demonstrated by Kevin?',
        options: ['To create a link', 'To define a header', 'To insert an image', 'To write a paragraph'],
        answer: 'To define a header'
    }
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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('html').addEventListener('click', function () {
        showVideoAndQuiz('HTML', 'https://www.youtube.com/embed/qz0aGYrrlhU');
    });
	
	document.getElementById('html2').addEventListener('click', function () {
        showVideoAndQuiz('HTML 2', 'https://www.youtube.com/embed/FQdaUv95mR8');
    });
	
	document.getElementById('html3').addEventListener('click', function () {
        showVideoAndQuiz('HTML 3', 'https://www.youtube.com/embed/kUMe1FH4CHE');
    });
	
	document.getElementById('html4').addEventListener('click', function () {
        showVideoAndQuiz('HTML 4', 'https://www.youtube.com/embed/916GWv2Qs08');
    });

    document.getElementById('css').addEventListener('click', function () {
        showVideoAndQuiz('CSS', 'https://www.youtube.com/embed/1PnVor36_40');
    });
	
	document.getElementById('css2').addEventListener('click', function () {
        showVideoAndQuiz('CSS 2', 'https://www.youtube.com/embed/wRNinF7YQqQ');
    });
	
	document.getElementById('css3').addEventListener('click', function () {
        showVideoAndQuiz('CSS 3', 'https://www.youtube.com/embed/1Rs2ND1ryYc?si=zWCsBZImRUCbKBC7');
    });
	
	document.getElementById('css4').addEventListener('click', function () {
        showVideoAndQuiz('CSS 4', 'https://www.youtube.com/embed/yfoY53QXEnI');
    });

    document.getElementById('javascript').addEventListener('click', function () {
        showVideoAndQuiz('JavaScript', 'https://www.youtube.com/embed/W6NZfCO5SIk');
    });
	
	document.getElementById('javascript2').addEventListener('click', function () {
        showVideoAndQuiz('JavaScript 2', 'https://www.youtube.com/embed/hdI2bqOjy3c');
    });
	
	document.getElementById('javascript3').addEventListener('click', function () {
        showVideoAndQuiz('JavaScript 3', 'https://www.youtube.com/embed/lfmg-EJ8gm4');
    });
	
	document.getElementById('javascript4').addEventListener('click', function () {
        showVideoAndQuiz('JavaScript 4', 'https://www.youtube.com/embed/E3XxeE7NF30');
    });
});

function showVideoAndQuiz(subject, link) {
    var videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '<iframe width="560" height="315" src="' + link + '" frameborder="0" allowfullscreen></iframe>';

    var quizData = getQuizDataBySubject(subject);
    displayQuiz(quizData);
}

function getQuizDataBySubject(subject) {
    var quizzes = {
        'HTML': htmlQuizData,
        'HTML 2': html2QuizData,
        'CSS': cssQuizData,
        'JavaScript': jsQuizData
    };
    return quizzes[subject] || [];
}

function displayQuiz(quizData) {
    var quizContainer = document.getElementById('quiz');
    var resultContainer = document.getElementById('result');
    quizContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    for (var i = 0; i < quizData.length; i++) {
        var question = quizData[i];
        var questionElement = document.createElement('div');
        questionElement.classList.add('question'); // Add class for question styling
        questionElement.textContent = question.question;

        var optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options'); // Add class for options styling

        for (var j = 0; j < question.options.length; j++) {
            var option = question.options[j];
            var optionLabel = document.createElement('label');
            optionLabel.classList.add('option'); // Add class for option styling

            var optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question' + i;
            optionInput.value = option;
            optionLabel.appendChild(optionInput);
            optionLabel.append(' ' + option);
            optionsContainer.appendChild(optionLabel);
        }

        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsContainer);
    }

    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Answers';
    submitButton.id = 'submit-answers';
    submitButton.classList.add('button'); // Add class for button styling
    submitButton.onclick = function () {
        checkAnswers(quizData);
    };
    quizContainer.appendChild(submitButton);
}

function checkAnswers(quizData) {
    var score = 0;
    var wrongAnswers = [];
    for (var i = 0; i < quizData.length; i++) {
        var selected = document.querySelector('input[name="question' + i + '"]:checked');
        if (selected && selected.value === quizData[i].answer) {
            score++;
        } else {
            wrongAnswers.push(i); // Save the index of the wrong answer
        }
    }
    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = 'You scored ' + score + ' out of ' + quizData.length + '<br>' + '<br>';

    var submitButton = document.getElementById('submit-answers');
    submitButton.style.display = 'none'; // Hide submit button

    if (wrongAnswers.length > 0) {
        var showAnswerButton = document.createElement('button');
        showAnswerButton.textContent = 'Show Answers';
        showAnswerButton.onclick = function () {
            showAnswers(wrongAnswers, quizData);
        };
        resultContainer.appendChild(showAnswerButton);
    }
}


function showAnswers(wrongAnswers, quizData) {
    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '<div>Your incorrect answers:</div>' + '<br>';
    
    // Create a div to hold the list of incorrect answers
    var incorrectAnswersList = document.createElement('div');
    incorrectAnswersList.id = 'incorrect-answers-list';

    // Fill the incorrect answers list with the wrong answers
    for (var i = 0; i < wrongAnswers.length; i++) {
        var questionIndex = wrongAnswers[i];
        var question = quizData[questionIndex];
        var selectedAnswer = document.querySelector('input[name="question' + questionIndex + '"]:checked').value;
        
        var incorrectAnswerDiv = document.createElement('div');
        incorrectAnswerDiv.innerHTML = '<strong>Question:</strong> ' + question.question + '<br><strong>Correct Answer:</strong> ' + question.answer + '<br><strong>You Answer:</strong> ' + selectedAnswer;
        incorrectAnswersList.appendChild(incorrectAnswerDiv);
        incorrectAnswersList.innerHTML += '<br>';
    }

    // Append the incorrect answers list to the result container
    resultContainer.appendChild(incorrectAnswersList);

    // Create and append the retry button to the result container
    var retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.onclick = function () {
        displayQuiz(quizData); // Redisplay the quiz
    };
    resultContainer.appendChild(retryButton);
}



// HTML Quiz Data
const htmlQuizData = [
    {
        question: '1. What does HTML stand for?',
        options: [
            'HyperText Markup Language',
            'HyperTool Markup Language',
            'HyperText Markdown Language',
            'HyperTech Markup Language'
        ],
        answer: 'HyperText Markup Language'
    },
    {
        question: '2. Which tool does the instructor recommend for writing HTML and CSS code in the tutorial?',
        options: [
            'Adobe Dreamweaver',
            'Atom',
            'Visual Studio Code',
            'Sublime Text'
        ],
        answer: 'Visual Studio Code'
    },
    {
        question: '3. What is the purpose of the <strong> tag in HTML?',
        options: [
            'To change the font color to strong colors like red or blue',
            'To indicate that the text is important and should be bolded',
            'To add special effects to the text such as shadows',
            'To insert images into the document'
        ],
        answer: 'To indicate that the text is important and should be bolded'
    },
    {
        question: '4. What does CSS stand for?',
        options: [
            'Cascading Style Sheets',
            'Combined Styling Sheets',
            'Computer Style Sheets',
            'Creative Style Sheets'
        ],
        answer: 'Cascading Style Sheets'
    },
    {
        question: '5. Which extension does the instructor use in the tutorial to automatically refresh the web page upon saving the changes?',
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
        question: '1. What is HTML an acronym for?',
        options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tech Markup Language', 'Hyperlink Text Markup Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: '2. According to Kevin, what is the basic building block of the web?',
        options: ['JavaScript', 'CSS', 'HTML', 'SQL'],
        answer: 'HTML'
    },
    {
        question: '3. What does Kevin suggest using to create an HTML website on your computer?',
        options: ['Notepad', 'Adobe Dreamweaver', 'Microsoft Word', 'Visual Studio Code'],
        answer: 'Notepad'
    },
    {
        question: '4. What browser does Kevin use to open the HTML file?',
        options: ['Mozilla Firefox', 'Microsoft Edge', 'Google Chrome', 'Safari'],
        answer: 'Microsoft Edge'
    },
    {
        question: '5. What is the purpose of the <h1> tag as demonstrated by Kevin?',
        options: ['To create a link', 'To define a header', 'To insert an image', 'To write a paragraph'],
        answer: 'To define a header'
    }
];

// CSS Quiz Data
const cssQuizData = [
    {
        question: '1. What does CSS stand for?',
        options: ['Computer Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets'],
        answer: 'Cascading Style Sheets',
    },
    // Add more CSS quiz questions as needed
];

// JavaScript Quiz Data
const jsQuizData = [
    {
        question: '1. Which one of these is a JavaScript package manager?',
        options: ['Node.js', 'TypeScript', 'npm', 'ESLint'],
        answer: 'npm',
    },
    // Add more JavaScript quiz questions as needed
];

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
        'HTML 3': html3QuizData,
        'HTML 4': html4QuizData,
        'CSS': cssQuizData,
        'CSS 2': css2QuizData,
        'CSS 3': css3QuizData,
        'CSS 4': css4QuizData,
        'JavaScript': jsQuizData,
        'JavaScript 2': js2QuizData,
        'JavaScript 3': js3QuizData,
        'JavaScript 4': js4QuizData
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
		showAnswerButton.classList.add('button', 'show-answers-button'); // Add classes for button styling
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
	retryButton.classList.add('button', 'retry-button'); // Add classes for button styling
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
        question: '3. What is the purpose of the strong tag in HTML?',
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
        question: '5. What is the purpose of the "h1" tag as demonstrated by Kevin?',
        options: ['To create a link', 'To define a header', 'To insert an image', 'To write a paragraph'],
        answer: 'To define a header'
    }
];

const html3QuizData = [
    {
        question: '1. What is the purpose of the "img" element in HTML, as demonstrated by Kevin in the video tutorial at this link?',
        options: [
            'To create a link',
            'To define a header',
            'To insert an image',
            'To write a paragraph'
        ],
        answer: 'To insert an image'
    },
    {
        question: '2. Which HTML tag is used to create a hyperlink?',
        options: ['"link" tag', '"a" tag', '"href" tag', '"url" tag'],
        answer: '"a" tag'
    },
    {
        question: '3. What does the acronym "HTML" stand for?',
        options: [
            'Hyper Text Markup Language',
            'High Text Markup Language',
            'Hyper Tech Markup Language',
            'Hyperlink Text Markup Language'
        ],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: '4. Which HTML tag is used to define the main heading of a webpage?',
        options: ['"h1" tag', '"header" tag', '"main" tag', '"title" tag'],
        answer: '"h1" tag'
    },
    {
        question: '5. What is the purpose of the "p" tag in HTML?',
        options: [
            'To create a link',
            'To define a paragraph',
            'To insert an image',
            'To write a header'
        ],
        answer: 'To define a paragraph'
    }
];

const html4QuizData = [
    {
        question: '1. What does the "meta" tag in HTML primarily do?',
        options: [
            'Define a header',
            'Create a link to an external resource',
            'Insert metadata about the document',
            'Write a paragraph'
        ],
        answer: 'Insert metadata about the document'
    },
    {
        question: '2. Which HTML tag is used to create an ordered list?',
        options: ['"ul" tag', '"ol" tag', '"li" tag', '"dl" tag'],
        answer: '"ol" tag'
    },
    {
        question: '3. What does the "a" tag in HTML represent?',
        options: ['Anchor', 'Article', 'Audio', 'Abbreviation'],
        answer: 'Anchor'
    },
    {
        question: '4. What is the purpose of the "table" element in HTML?',
        options: [
            'To create a form',
            'To define a table structure',
            'To insert an image',
            'To write a paragraph'
        ],
        answer: 'To define a table structure'
    },
    {
        question: '5. Which HTML attribute specifies an alternative text for an image?',
        options: ['alt', 'src', 'href', 'title'],
        answer: 'alt'
    }
];

// CSS Quiz Data
const cssQuizData = [
    {
        question: '1. What does CSS stand for?',
        options: ['Computer Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets'],
        answer: 'Cascading Style Sheets',
    },
    {
        question: '2. What does the "link" element in HTML primarily do?',
        options: [
            'Define a header',
            'Create a link to an external resource',
            'Insert metadata about the document',
            'Write a paragraph'
        ],
        answer: 'Create a link to an external resource'
    },
    {
        question: '3. Which CSS property is used to change the font size of text?',
        options: ['font-family', 'font-weight', 'font-size', 'font-style'],
        answer: 'font-size'
    },
    {
        question: '4. What does the margin property in CSS control?',
        options: [
            'Text alignment',
            'Background color',
            'Spacing outside an element',
            'Border style'
        ],
        answer: 'Spacing outside an element'
    },
    {
        question: '5. What does the background-color property in CSS define?',
        options: [
            'Text color',
            'Border color',
            'Background color of an element',
            'Font style'
        ],
        answer: 'Background color of an element'
    }
];

const css2QuizData = [
    {
        question: '1. What does the margin property in CSS control?',
        options: [
            'Text alignment',
            'Background color',
            'Spacing outside an element',
            'Border style'
        ],
        answer: 'Spacing outside an element'
    },
    {
        question: '2. Which CSS property is used to change the font size of text?',
        options: ['font-family', 'font-weight', 'font-size', 'font-style'],
        answer: 'font-size'
    },
    {
        question: '3. What does the background-color property in CSS define?',
        options: [
            'Text color',
            'Border color',
            'Background color of an element',
            'Font style'
        ],
        answer: 'Background color of an element'
    },
    {
        question: '4. What is the purpose of the display: flex; property in CSS?',
        options: [
            'To create a link',
            'To define a header',
            'To create a flexible layout',
            'To write a paragraph'
        ],
        answer: 'To create a flexible layout'
    },
    {
        question: '5. Which CSS selector targets all "p" elements with a class of highlight?',
        options: ['.highlight p', 'p.highlight', '#highlight p', '.highlight > p'],
        answer: 'p.highlight'
    }
];

const css3QuizData = [
    {
        question: '1. What does the CSS property "float" do?',
        options: [
            'Aligns text vertically',
            'Positions an element to the left or right of its container',
            'Changes font style',
            'Sets the opacity of an element'
        ],
        answer: '2. Positions an element to the left or right of its container'
    },
    {
        question: '2. Which CSS property is used to add space between elements?',
        options: ['padding', 'margin', 'border', 'width'],
        answer: 'margin'
    },
    {
        question: '3. What does the CSS property "position" control?',
        options: [
            'Text alignment',
            'Element visibility',
            'Element stacking order',
            'Font size'
        ],
        answer: 'Element stacking order'
    },
    {
        question: '4. Which CSS value is used to make an element transparent?',
        options: ['transparent', 'visible', 'hidden', 'opacity'],
        answer: 'opacity'
    },
    {
        question: '5. What does the CSS property "box-sizing" determine?',
        options: [
            'Element dimensions including padding and border',
            'Element position',
            'Element background color',
            'Element font style'
        ],
        answer: 'Element dimensions including padding and border'
    }
];

const css4QuizData = [
    {
        question: '1. What does the CSS property "display" control?',
        options: [
            'Element visibility',
            'Element stacking order',
            'Element dimensions',
            'Element font style'
        ],
        answer: 'Element dimensions'
    },
    {
        question: '2. Which CSS selector targets all "h2" elements within a class of "section"?',
        options: ['h2.section', '.section h2', '#section h2', 'section > h2'],
        answer: '.section h2'
    },
    {
        question: '3. What does the CSS property "border-radius" define?',
        options: [
            'Element border color',
            'Element border width',
            'Element border style',
            'Element corner curvature'
        ],
        answer: 'Element corner curvature'
    },
    {
        question: '4. Which CSS value is used to create a shadow effect for an element?',
        options: ['shadow', 'box-shadow', 'text-shadow', 'element-shadow'],
        answer: 'box-shadow'
    },
    {
        question: '5. What does the CSS property "z-index" control?',
        options: [
            'Element visibility',
            'Element stacking order',
            'Element dimensions',
            'Element font style'
        ],
        answer: 'Element stacking order'
    }
];


// JavaScript Quiz Data
const jsQuizData = [
    {
        question: '1. What does the JavaScript method "querySelector()" do?',
        options: [
            'Selects the first element that matches a specified CSS selector',
            'Selects all elements that match a specified CSS selector',
            'Selects the last element that matches a specified CSS selector',
            'Selects the parent element of a specified CSS selector'
        ],
        answer: 'Selects the first element that matches a specified CSS selector'
    },
    {
        question: '2. Which JavaScript method is used to add a new item to the end of an array?',
        options: ['push()', 'unshift()', 'append()', 'addToEnd()'],
        answer: 'push()'
    },
    {
        question: '3. What does the JavaScript function "parseInt()" do?',
        options: [
            'Converts a string to a floating-point number',
            'Converts a string to an integer',
            'Rounds a number to the nearest integer',
            'Returns the length of a string'
        ],
        answer: 'Converts a string to an integer'
    },
    {
        question: '4. Which JavaScript operator is used to compare the equality of two values without considering their data types?',
        options: ['==', '===', '!=', '!=='],
        answer: '=='
    },
    {
        question: '5. What does the JavaScript method "addEventListener()" do?',
        options: [
            'Adds an event listener to an HTML element',
            'Removes an event listener from an HTML element',
            'Triggers an event on an HTML element',
            'Creates a new event listener object'
        ],
        answer: 'Adds an event listener to an HTML element'
    }
];

const js2QuizData = [
    {
        question: '1. What does the JavaScript keyword "const" do?',
        options: [
            'Declares a constant variable that cannot be reassigned',
            'Declares a variable with block scope',
            'Declares a variable that can be reassigned',
            'Declares a variable with global scope'
        ],
        answer: 'Declares a constant variable that cannot be reassigned'
    },
    {
        question: '2. Which JavaScript method is used to remove the last item from an array?',
        options: ['pop()', 'shift()', 'slice()', 'removeLast()'],
        answer: 'pop()'
    },
    {
        question: '3. What does the JavaScript function "parseFloat()" do?',
        options: [
            'Converts a string to a floating-point number',
            'Converts a string to an integer',
            'Rounds a number to the nearest integer',
            'Returns the length of a string'
        ],
        answer: 'Converts a string to a floating-point number'
    },
    {
        question: '4. Which JavaScript operator is used to compare the value and type of two variables?',
        options: ['==', '===', '!=', '!=='],
        answer: '==='
    },
    {
        question: '5. What does the JavaScript method "setTimeout()" do?',
        options: [
            'Delays the execution of a function by a specified number of milliseconds',
            'Executes a function immediately',
            'Repeats the execution of a function at specified intervals',
            'Clears the timeout set by setTimeout()'
        ],
        answer: 'Delays the execution of a function by a specified number of milliseconds'
    }
];

const js3QuizData = [
    {
        question: '1. What does the JavaScript operator "===" do?',
        options: [
            'Checks if two values are equal in value and type',
            'Checks if two values are equal in value but not necessarily in type',
            'Checks if two values are not equal in value and type',
            'Checks if two values are not equal in value but not necessarily in type'
        ],
        answer: 'Checks if two values are equal in value and type'
    },
    {
        question: '2. Which JavaScript method is used to add elements to the beginning of an array?',
        options: ['unshift()', 'push()', 'concat()', 'prepend()'],
        answer: 'unshift()'
    },
    {
        question: '3. What does the JavaScript function "isNaN()" do?',
        options: [
            'Checks if a value is a number',
            'Checks if a value is not a number',
            'Converts a string to a number',
            'Converts a number to a string'
        ],
        answer: 'Checks if a value is not a number'
    },
    {
        question: '4. Which JavaScript method is used to join all elements of an array into a string?',
        options: ['join()', 'concat()', 'toString()', 'map()'],
        answer: 'join()'
    },
    {
        question: '5. What does the JavaScript method "addEventListener()" do?',
        options: [
            'Adds an event listener to an HTML element',
            'Removes an event listener from an HTML element',
            'Triggers an event on an HTML element',
            'Creates a new event listener object'
        ],
        answer: 'Adds an event listener to an HTML element'
    }
];

const js4QuizData = [
    {
        question: '1. What does the JavaScript operator "typeof" do?',
        options: [
            'Returns the type of a variable or expression',
            'Compares the type and value of two variables',
            'Checks if a variable is undefined',
            'Converts a variable to a specific type'
        ],
        answer: 'Returns the type of a variable or expression'
    },
    {
        question: '2. Which JavaScript method is used to remove the first item from an array?',
        options: ['shift()', 'pop()', 'slice()', 'removeFirst()'],
        answer: 'shift()'
    },
    {
        question: '3. What does the JavaScript function "isNaN()" do?',
        options: [
            'Checks if a value is not a number',
            'Checks if a value is a number',
            'Converts a string to a number',
            'Converts a number to a string'
        ],
        answer: 'Checks if a value is not a number'
    },
    {
        question: '4. Which JavaScript method is used to remove elements from an array and, if necessary, replace them with new elements?',
        options: ['splice()', 'slice()', 'filter()', 'remove()'],
        answer: 'splice()'
    },
    {
        question: '5. What does the JavaScript method "querySelector()" do?',
        options: [
            'Selects the first element that matches a specified CSS selector',
            'Selects all elements that match a specified CSS selector',
            'Selects the last element that matches a specified CSS selector',
            'Selects the parent element of a specified CSS selector'
        ],
        answer: 'Selects the first element that matches a specified CSS selector'
    }
];

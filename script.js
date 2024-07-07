// Function to add a question to the quiz creation section
function addQuestion() {
    // Get form input values
    var question = document.getElementById('question').value;
    var option1 = document.getElementById('option1').value;
    var option2 = document.getElementById('option2').value;
    var option3 = document.getElementById('option3').value;
    var option4 = document.getElementById('option4').value;
    var correctAnswerIndex = document.getElementById('correct-answer').value - 1; // Adjusting for array index (0-based)

    // Validate inputs
    if (!question || !option1 || !option2 || !option3 || !option4 || correctAnswerIndex < 0 || correctAnswerIndex > 3) {
        alert('Please fill in all fields and select a correct answer.');
        return;
    }

    // Create question object
    var questionObj = {
        question: question,
        options: [option1, option2, option3, option4],
        correctAnswer: correctAnswerIndex
    };

    // Reset form fields
    document.getElementById('quiz-form').reset();

    // Add question to quiz list
    var quizList = document.getElementById('quiz-list');
    var questionItem = document.createElement('div');
    questionItem.classList.add('question-item');
    questionItem.innerHTML = `
        <div><strong>Question:</strong> ${question}</div>
        <div><strong>Options:</strong></div>
        <ul>
            <li>${option1}</li>
            <li>${option2}</li>
            <li>${option3}</li>
            <li>${option4}</li>
        </ul>
        <div><strong>Correct Answer:</strong> Option ${correctAnswerIndex + 1}</div>
    `;
    quizList.appendChild(questionItem);
}

// Function to submit the quiz and calculate score
function submitQuiz() {
    var questions = document.querySelectorAll('.question-item');
    var score = 0;

    questions.forEach(function(question, index) {
        var options = question.querySelectorAll('li');
        var selectedOption = null;

        options.forEach(function(option, optionIndex) {
            if (option.classList.contains('selected')) {
                selectedOption = optionIndex;
            }
        });

        if (selectedOption === null) {
            alert('Please select an answer for all questions.');
            return;
        }

        if (selectedOption === questions[index].dataset.correctAnswer) {
            score++;
        }
    });

    alert(`Your score: ${score}/${questions.length}`);
}

// Event listener for selecting an answer in quiz taking section
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        var selectedOptions = event.target.parentElement.querySelectorAll('li');
        selectedOptions.forEach(function(option) {
            option.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
});

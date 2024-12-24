// 題目資料
const questions = [
    {
        question: "功能：執行選擇的指令或換行。",
        options: [
            "Enter",
            "Backspace",
            "Delete",
            "Shift"
        ],
        answer: 0
    },
    {
        question: "功能：刪除游標左側的字元。",
        options: [
            "Ctrl",
            "Backspace",
            "Delete",
            "Shift"
        ],
        answer: 1
    },
    {
        question: "功能：刪除游標右側的字元或選取的內容。",
        options: [
            "Ctrl",
            "Shift",
            "Enter",
            "Delete"
        ],
        answer: 3
    },
    {
        question: "功能：用於輸入大寫字母或特殊符號，並輔助其他按鍵實現額外功能。",
        options: [
            "Enter",
            "Backspace",
            "Shift",
            "Delete"
        ],
        answer: 2
    },
    {
        question: "功能：與其他按鍵搭配使用，執行各種快捷鍵功能（如複製、貼上）。",
        options: [
            "Ctrl",
            "Shift",
            "Enter",
            "Backspace"
        ],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 初始化測驗
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    
    nextButton.addEventListener('click', handleNextButton);
    submitButton.addEventListener('click', handleSubmitButton);
    
    showQuestion();
}

// 顯示當前題目
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];
    
    const questionHTML = `
        <div class="question">
            <h2>第 ${currentQuestionIndex + 1} 題</h2>
            <p>${currentQuestion.question}</p>
            <div class="options">
                ${currentQuestion.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" id="option${index}" name="answer" value="${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    questionContainer.innerHTML = questionHTML;
    updateButtons();
}

// 處理下一題按鈕
function handleNextButton() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('請選擇一個答案！');
        return;
    }
    
    if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
}

// 處理提交按鈕
function handleSubmitButton() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('請選擇一個答案！');
        return;
    }
    
    if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    showResults();
}

// 更新按鈕顯示狀態
function updateButtons() {
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.classList.add('hide');
        submitButton.classList.remove('hide');
    } else {
        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    }
}

// 顯示結果
function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    
    const percentageScore = (score / questions.length) * 100;
    
    quizContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreElement.textContent = `${percentageScore}分`;
    
    if (percentageScore === 100) {
        messageElement.textContent = '很厲害！';
    } else if (percentageScore < 60) {
        messageElement.textContent = '再加油！';
    }
}

// 當頁面載入完成時初始化測驗
document.addEventListener('DOMContentLoaded', initQuiz);
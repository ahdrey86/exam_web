document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const quizId = queryParams.get("quiz");
    const quizTitle = {
        math: "Математика",
        history: "История",
        science: "Наука"
    };

    // Установить заголовок викторины
    document.getElementById("quiz-title").textContent = quizTitle[quizId] || "Викторина";

    // Пример вопросов
    const questions = {
        math: [
            { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], correct: 1 },
            { question: "5 * 3 = ?", options: ["15", "10", "20", "25"], correct: 0 }
        ],
        history: [
            { question: "Кто открыл Америку?", options: ["Колумб", "Магеллан", "Кук", "Поло"], correct: 0 }
        ],
        science: [
            { question: "Чему равна скорость света?", options: ["300 тыс. км/с", "150 тыс. км/с", "100 тыс. км/с", "500 тыс. км/с"], correct: 0 }
        ]
    };

    const quizQuestions = questions[quizId] || [];
    const questionsContainer = document.getElementById("questions-container");

    // Генерация вопросов
    quizQuestions.forEach((q, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("mb-4");
        questionBlock.innerHTML = `
            <h5>${index + 1}. ${q.question}</h5>
            ${q.options.map((option, i) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${index}" id="question${index}option${i}" value="${i}">
                    <label class="form-check-label" for="question${index}option${i}">${option}</label>
                </div>
            `).join("")}
        `;
        questionsContainer.appendChild(questionBlock);
    });

    // Таймер
    let timeLeft = 600; // 10 минут
    const timerElement = document.getElementById("timer");

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Время вышло! Отправляем ответы...");
            document.getElementById("quizForm").submit();
        }
    }, 1000);

    // Обработка отправки формы
    document.getElementById("quizForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Ваши ответы отправлены!");
        clearInterval(timerInterval);
    });
});

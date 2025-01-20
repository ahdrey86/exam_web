document.addEventListener("DOMContentLoaded", () => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    const languageTitle = document.getElementById("language-title");
    const questionsContainer = document.getElementById("questions-container");
    const timerElement = document.getElementById("timer");
    const TOTAL_TIME = 600; // Общее время теста в секундах (10 минут)

    // Вопросы по языкам
    const questions = {
        chinese: [
            { question: "Какой иероглиф означает 'любовь'?", options: ["好", "爱", "书", "日"], correct: 1 },
            { question: "Какой иероглиф означает 'день'?", options: ["天", "月", "日", "山"], correct: 2 },
            { question: "Как переводится '谢谢'?", options: ["Пожалуйста", "Спасибо", "Добрый день", "До свидания"], correct: 1 },
            { question: "Какой иероглиф означает 'река'?", options: ["山", "水", "河", "木"], correct: 2 },
            { question: "Как переводится '你好'?", options: ["Привет", "Пока", "Добрый вечер", "Добро пожаловать"], correct: 0 }
        ],
        russian: [
            { question: "Какой антоним к слову 'хороший'?", options: ["Плохой", "Добрый", "Громкий", "Тихий"], correct: 0 },
            { question: "Какой падеж отвечает на вопросы 'кого? чего?'?", options: ["Именительный", "Родительный", "Дательный", "Винительный"], correct: 1 },
            { question: "Что такое 'глагол'?", options: ["Часть речи", "Стилистика", "Прилагательное", "Существительное"], correct: 0 },
            { question: "Сколько букв в русском алфавите?", options: ["31", "32", "33", "34"], correct: 2 },
            { question: "Какая из букв является гласной?", options: ["Б", "К", "О", "П"], correct: 2 }
        ],
        indian: [
            { question: "Какой язык официально используется в Индии?", options: ["Хинди", "Бенгали", "Тамильский", "Маратхи"], correct: 0 },
            { question: "Как сказать 'здравствуйте' на хинди?", options: ["नमस्ते", "धन्यवाद", "अलविदा", "मित्र"], correct: 0 },
            { question: "Как переводится 'धन्यवाद'?", options: ["Спасибо", "Привет", "Добрый вечер", "До свидания"], correct: 0 },
            { question: "Какой иероглиф означает 'река'?", options: ["नदी", "पर्वत", "वन", "जल"], correct: 0 },
            { question: "Как переводится 'अलविदा'?", options: ["Доброе утро", "До свидания", "Пожалуйста", "Спасибо"], correct: 1 }
        ],
        japanese: [
            { question: "Как называется японская письменность для иностранных слов?", options: ["Хирагана", "Катакана", "Кандзи", "Ромадзи"], correct: 1 },
            { question: "Как переводится слово 'こんにちは'?", options: ["Доброе утро", "Добрый день", "Добрый вечер", "Спокойной ночи"], correct: 1 },
            { question: "Какой символ означает 'гора'?", options: ["山", "川", "木", "田"], correct: 0 },
            { question: "Как переводится 'ありがとう'?", options: ["Спасибо", "Извините", "До свидания", "Добро пожаловать"], correct: 0 },
            { question: "Как называется японская письменность для местных слов?", options: ["Хирагана", "Катакана", "Кандзи", "Ромадзи"], correct: 0 }
        ]
    };

    // Установка заголовка
    languageTitle.textContent = `Тест на ${selectedLanguage === "chinese" ? "китайском" :
        selectedLanguage === "russian" ? "русском" :
        selectedLanguage === "indian" ? "индийском" : "японском"} языке`;

    const selectedQuestions = questions[selectedLanguage];

    // Генерация вопросов
    selectedQuestions.slice(0, 5).forEach((q, index) => {
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
    const startTimeKey = `startTime_${selectedLanguage}`;
    let startTime = localStorage.getItem(startTimeKey);

    if (!startTime) {
        // Если времени начала теста нет, устанавливаем его
        startTime = Date.now();
        localStorage.setItem(startTimeKey, startTime);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Прошедшее время в секундах
        const remainingTime = TOTAL_TIME - elapsedTime;

        if (remainingTime <= 0) {
            // Если время истекло
            timerElement.textContent = "Время вышло!";
            alert("Время вышло! Тест завершён.");
            localStorage.removeItem(startTimeKey);
            document.getElementById("quizForm").submit();
            return;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    updateTimer(); // Обновляем таймер сразу
    const timerInterval = setInterval(updateTimer, 1000);

    // Обработка отправки формы
    document.getElementById("quizForm").addEventListener("submit", (e) => {
        e.preventDefault();
        clearInterval(timerInterval);
        localStorage.removeItem(startTimeKey);

        let score = 0;
        const feedback = [];

        selectedQuestions.slice(0, 5).forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const isCorrect = selectedOption && parseInt(selectedOption.value) === q.correct;

            feedback.push({
                question: q.question,
                selected: selectedOption ? q.options[selectedOption.value] : null,
                correct: q.options[q.correct],
                isCorrect
            });

            if (isCorrect) {
                score++;
            }
        });

        // Сохраняем результаты
        localStorage.setItem("quizScore", score);
        localStorage.setItem("quizFeedback", JSON.stringify(feedback));

        // Переход на страницу результатов
        window.location.href = "results.html";
    });
});

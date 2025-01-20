document.addEventListener("DOMContentLoaded", () => {
    const startQuizButtons = document.querySelectorAll(".start-quiz-btn");

    startQuizButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const quizId = e.target.getAttribute("data-quiz-id");
            window.location.href = `test.html?quiz=${quizId}`; // Перенаправление на страницу теста
        });
    });
});

document.getElementById("start-quiz").addEventListener("click", () => {
    alert("Викторина началась!");
});

// Установить активный класс на текущую ссылку
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        // Удалить активный класс со всех ссылок
        navLinks.forEach((nav) => nav.classList.remove("active"));

        // Добавить активный класс к текущей ссылке
        link.classList.add("active");
    });
});

const modal = document.getElementById("modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");

if (openModal && closeModal && modal) {
    openModal.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex"; // Показываем модальное окно
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Закрываем модальное окно
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
} else {
    console.error("Не удалось найти один или несколько элементов для модального окна.");
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Обработчик авторизации
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameOrEmail = document.getElementById("loginInput").value;
        const password = document.getElementById("loginPassword").value;

        console.log("Попытка авторизации:");
        console.log("Имя пользователя или почта:", usernameOrEmail);
        console.log("Пароль:", password);

        // Здесь можно отправить данные на сервер
    });

    // Обработчик регистрации
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;

        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        console.log("Попытка регистрации:");
        console.log("Имя пользователя:", username);
        console.log("Почта:", email);
        console.log("Пароль:", password);

        // Здесь можно отправить данные на сервер
    });
});
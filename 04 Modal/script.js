const open = document.getElementById("open");
const modalContainer = document.getElementById("modal-container");
const close = document.getElementById("close");

open.addEventListener("click", () => {
    modalContainer.classList.add("active");
});

close.addEventListener("click", () => {
    modalContainer.classList.remove("active");
});
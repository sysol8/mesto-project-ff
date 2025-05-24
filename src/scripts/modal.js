export function openPopup(buttonOpen, dialog, buttonClose) {
    buttonOpen.addEventListener("click", () => {
        dialog.style.display = "flex";
    })

    closePopup(dialog, buttonClose);
}

function closePopup(dialog, buttonClose) {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            dialog.style.display = "none";
        }
    });

    buttonClose.addEventListener("click", () => {
        dialog.style.display = "none";
    })

    /* добавить закрытие по клику вне попапа */
}
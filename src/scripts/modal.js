const isOpened = "popup_is-opened";

export function openDialog(dialog) {
  dialog.classList.add(isOpened);
  const handler = escapeHandler(dialog);
  dialog._handler = handler;

  window.addEventListener("keydown", handler);
}

export function closeDialog(dialog) {
  if (dialog._handler) {
    window.removeEventListener("keydown", dialog._handler);
    delete dialog._handler;
  }
  
  dialog.classList.remove(isOpened);
}

function escapeHandler(dialog) {
  return function (e) {
    if (e.key === "Escape") {
      closeDialog(dialog);
    }
  };
}

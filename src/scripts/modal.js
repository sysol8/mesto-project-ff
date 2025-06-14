const isOpened = "popup_is-opened";

export function openDialog(dialog) {
  dialog.classList.add(isOpened);

  const keyHandler = closeDialogByKey(dialog);
  dialog._keyHandler = keyHandler;

  document.addEventListener("keydown", keyHandler);
}

export function closeDialog(dialog) {
  if (dialog._keyHandler) {
    document.removeEventListener("keydown", dialog._keyHandler);
    delete dialog._keyHandler;
  }

  dialog.classList.remove(isOpened);
}

export function closeDialogByOverlayClick(dialog) {
  return function (e) {
    if (e.target === dialog) {
      closeDialog(dialog);
    }
  };
}

function closeDialogByKey(dialog) {
  return function (e) {
    if (e.key === "Escape") {
      closeDialog(dialog);
    }
  };
}

function setLoading(dialog) {}

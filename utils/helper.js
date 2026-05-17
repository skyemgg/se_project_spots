export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...",
) {
  if (isLoading) {
    btn.textContent = loadingText; // "Saving..."
  } else {
    btn.textContent = defaultText; // "Save"
  }
}

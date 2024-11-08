export const loadMarkdownFile = (onFileGot: (file: Blob) => void) => {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".md"
  input.click()
  input.addEventListener("change", () => {
    const file = new Blob()
    onFileGot(file as Blob)
  })
}

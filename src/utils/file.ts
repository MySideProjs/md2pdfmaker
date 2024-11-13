export const loadMarkdownFile = (onFileGot: (file: Blob) => void) => {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".md"
  input.click()
  input.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement
    const selectedFile: File = (target.files as FileList)[0]
    onFileGot(selectedFile)
  })
}

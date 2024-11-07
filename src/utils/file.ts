export const loadMarkdownFile = (onLoaded: (content: string) => void) => {
  var input = document.createElement("input")
  input.type = "file"
  input.accept = ".md"
  input.click()
  input.addEventListener("change", (e) => {
    const file = (e.target as any).files[0]
    const reader = new FileReader()
    reader.addEventListener("loadend", () => {
      onLoaded(reader.result as string)
    })
    reader.readAsText(file)
  })
}

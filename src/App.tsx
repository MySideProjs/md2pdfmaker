import "./App.css"
import { AppHeader } from "./components/app-header"
import { MarkdownEditorAndPdfViewer } from "./components/markdown-editor-and-pdf-viewer"
import { StyleSideBar } from "./components/markdown-preview-style-sidebar"

function App() {
  return (
    <>
      <AppHeader />
      <MarkdownEditorAndPdfViewer />
      <StyleSideBar />
    </>
  )
}

export default App

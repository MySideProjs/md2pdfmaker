import { isEmpty, noop } from "lodash"
import { useState } from "react"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { MarkdownEditorAndPdfViewer } from "./components/markdown-editor-and-pdf-viewer"
import { SwitchCard } from "./components/switch-card"
import { loadMarkdownFile } from "./utils/file"

function App() {
  const [markdownContent, setMarkdownContent] = useState("")

  const onChooseFile = () => loadMarkdownFile(setMarkdownContent)

  return (
    <>
      <AppHeader />
      <SwitchCard onChooseFileClick={onChooseFile} onEditNowClick={noop} />
      {isEmpty(markdownContent) || <MarkdownEditorAndPdfViewer markdown={markdownContent} />}
    </>
  )
}

export default App

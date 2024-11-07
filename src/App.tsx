import { noop } from "lodash"
import { useCallback, useState } from "react"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { MarkdownEditorAndPdfViewer } from "./components/markdown-editor-and-pdf-viewer"
import { SwitchCard } from "./components/switch-card"
import { loadMarkdownFile } from "./utils/file"

function App() {
  const [markdownContent, setMarkdownContent] = useState("")
  const [currentView, setCurrentView] = useState<"switch-view" | "editor-view">("switch-view")
  const whenMarkdownContentLoad = useCallback(
    (m: string) => {
      setMarkdownContent(m)
      setCurrentView("editor-view")
    },
    [setMarkdownContent, setCurrentView],
  )
  const onChooseFile = () => {
    loadMarkdownFile(whenMarkdownContentLoad)
  }

  return (
    <>
      <AppHeader />
      {currentView == "switch-view" && <SwitchCard onChooseFileClick={onChooseFile} onEditNowClick={noop} />}
      {currentView == "editor-view" && <MarkdownEditorAndPdfViewer markdown={markdownContent} />}
    </>
  )
}

export default App

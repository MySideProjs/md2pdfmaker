import { noop } from "lodash"
import { useCallback, useState } from "react"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { MarkdownEditorAndPdfViewer } from "./components/markdown-editor-and-pdf-viewer"
import { SwitchCard } from "./components/switch-card"
import { loadMarkdownFile } from "./utils/file"

function App() {
  const [mdFile, setMdFile] = useState<Blob>(new Blob())
  const [currentView, setCurrentView] = useState<"switch-view" | "editor-view">("switch-view")
  const whenMarkdownContentLoad = useCallback(
    (file: Blob) => {
      setMdFile(file)
      setCurrentView("editor-view")
    },
    [setMdFile, setCurrentView],
  )

  const onChooseFile = () => {
    loadMarkdownFile(whenMarkdownContentLoad)
  }

  return (
    <>
      <AppHeader />
      {currentView == "switch-view" && <SwitchCard onChooseFileClick={onChooseFile} onEditNowClick={noop} />}
      {currentView == "editor-view" && <MarkdownEditorAndPdfViewer chosenMarkdownFile={mdFile} />}
    </>
  )
}

export default App

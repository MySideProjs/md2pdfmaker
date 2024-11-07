import { noop } from "lodash"
import { useState } from "react"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { SwitchCard } from "./components/switch-card"
import { loadMarkdownFile } from "./utils/file"

function App() {
  const [markdownContent, setMarkdownContent] = useState("")
  const onChooseFile = () => {
    loadMarkdownFile(setMarkdownContent)
    console.log(markdownContent)
  }
  return (
    <>
      <AppHeader />
      <SwitchCard onChooseFileClick={onChooseFile} onEditNowClick={noop} />
    </>
  )
}

export default App

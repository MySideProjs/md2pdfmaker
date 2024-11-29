import Editor from "@monaco-editor/react"
import Markdown from "react-markdown"
import { useMarkdownContent } from "../../state"

export const MarkdownEditorAndPdfViewer = () => {
  const { mdContent, setMdContent } = useMarkdownContent()
  const commonBorder = "border-b-black border-0.5 border-solid"
  return (
    <div className="flex flex-row">
      <div className={`${commonBorder} no-print`}>
        <Editor width={"50vw"} className="h-80vh" onChange={(c) => setMdContent(c || "")} value={mdContent} />
      </div>
      <div>
        <PdfPart className="h-80vh w-50vw overflow-scroll" markdown={mdContent} />
      </div>
    </div>
  )
}

type PdfPartProps = {
  markdown: string
  className?: string
}
const PdfPart = (p: PdfPartProps) => {
  return (
    <div className={`flex flex-col ${p.className}`}>
      <div id="md-preview">
        <Markdown className="p-10">{p.markdown}</Markdown>
      </div>
    </div>
  )
}

import Editor from "@monaco-editor/react"
import { useRef } from "react"
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
      <div className={`${commonBorder}`}>
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
  const pdfViewDiv = useRef<HTMLDivElement>(null)

  return (
    <div id="md-preview" className="flex flex-col">
      <div ref={pdfViewDiv}>
        <Markdown className={p.className}>{p.markdown}</Markdown>
      </div>
    </div>
  )
}

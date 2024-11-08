import { Document, Page, PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import Editor from "react-simple-code-editor"
import { useEffectOnce } from "react-use"
import { toMdTree } from "../../utils/formatter"
import { MdNodeRender } from "../pdf-renders"
import { highlight, languages } from "prismjs"
import "prismjs/components/prism-markdown"

const mdHighlighter = (content: string) => highlight(content, languages.markdown!, "markdown")

export type MarkdownEditorAndPdfViewerProps = { chosenMarkdownFile: Blob }
export const MarkdownEditorAndPdfViewer = (p: MarkdownEditorAndPdfViewerProps) => {
  const [mdContent, setMdContent] = useState("")
  useEffectOnce(() => {
    const reader = new FileReader()
    reader.addEventListener("loadend", () => setMdContent(reader.result as string))
    reader.readAsText(p.chosenMarkdownFile)
  })
  return (
    <div className="flex flex-row">
      <Editor
        className="flex-1 h-screen scroll-auto"
        highlight={mdHighlighter}
        onValueChange={setMdContent}
        value={mdContent}
        style={{
          padding: 20,
        }}
      />
      <PdfPart className="flex-1 h-screen" markdown={mdContent} />
    </div>
  )
}

type PdfPartProps = {
  markdown: string
  className?: string
}
const PdfPart = (p: PdfPartProps) => {
  const mdTree = toMdTree(p.markdown)
  return (
    <PDFViewer className={p.className}>
      <Document>
        <Page
          size="A4"
          style={{
            backgroundColor: "white",
          }}
        >
          {mdTree.children.map((node, idx) => {
            return <MdNodeRender key={idx} node={node} />
          })}
        </Page>
      </Document>
    </PDFViewer>
  )
}

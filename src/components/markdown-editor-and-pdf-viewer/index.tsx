import { Document, Page, PDFViewer } from "@react-pdf/renderer"
import { highlight, languages } from "prismjs"
import "prismjs/components/prism-markdown"
import { useEffect, useState } from "react"
import Html from "react-pdf-html"
import Editor from "react-simple-code-editor"
import { useEffectOnce } from "react-use"
import { markdown2html } from "../../utils/formatter"

const mdHighlighter = (content: string) => highlight(content, languages.markdown!, "markdown")

export type MarkdownEditorAndPdfViewerProps = { chosenMarkdownFile: Blob }
export const MarkdownEditorAndPdfViewer = (p: MarkdownEditorAndPdfViewerProps) => {
  const [mdContent, setMdContent] = useState("")

  useEffectOnce(() => {
    const reader = new FileReader()
    reader.addEventListener("loadend", () => {
      console.log("load end")
      setMdContent(reader.result as string)
    })
    reader.readAsText(p.chosenMarkdownFile)
  })

  return (
    <div className="flex flex-row">
      <Editor className="flex-1 h-screen scroll-auto" highlight={mdHighlighter} onValueChange={setMdContent} value={mdContent} />
      <PdfPart className="flex-1 h-screen" markdown={mdContent} />
    </div>
  )
}

type PdfPartProps = {
  markdown: string
  className?: string
}
const PdfPart = (p: PdfPartProps) => {
  const [htmlFromMd, setHtmlFromMd] = useState("")
  useEffect(() => {
    markdown2html(p.markdown).then((c) => {
      console.log(c)
      setHtmlFromMd(c)
    })
  }, [p.markdown])

  return (
    <PDFViewer className={p.className}>
      <Document>
        <Page
          size="A4"
          style={{
            backgroundColor: "white",
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
          }}
        >
          <Html>{htmlFromMd}</Html>
        </Page>
      </Document>
    </PDFViewer>
  )
}

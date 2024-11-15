import Editor from "@monaco-editor/react"
import { Document, Page, PDFViewer } from "@react-pdf/renderer"
import Html from "react-pdf-html"
import { useCallback, useEffect, useRef, useState } from "react"
import html2pdf from "html2pdf.js"
import { debounce } from "lodash"
import { useEffectOnce } from "react-use"
import { markdown2html } from "../../utils/formatter"
import Markdown from "react-markdown"

export type MarkdownEditorAndPdfViewerProps = { chosenMarkdownFile: Blob }
export const MarkdownEditorAndPdfViewer = (p: MarkdownEditorAndPdfViewerProps) => {
  const [mdContent, setMdContent] = useState("")

  useEffectOnce(() => {
    const reader = new FileReader()
    reader.addEventListener("loadend", () => {
      setMdContent(reader.result as string)
    })
    reader.readAsText(p.chosenMarkdownFile)
  })

  return (
    <div className="flex flex-row">
      <Editor width={"60vw"} className="flex-1 h-80vh" onChange={(c) => setMdContent(c || "")} value={mdContent} />
      <PdfPart className="flex-1 h-80vh overflow-scroll" markdown={mdContent} />
    </div>
  )
}

type PdfPartProps = {
  markdown: string
  className?: string
}
const PdfPart = (p: PdfPartProps) => {
  const [htmlFromMd, setHtmlFromMd] = useState("")
  const setHtmlFromMdDebounced = useCallback(debounce(setHtmlFromMd), [])
  useEffect(() => {
    const c = markdown2html(p.markdown)
    setHtmlFromMdDebounced(c)
  }, [p.markdown])
  const pdfViewDiv = useRef<HTMLDivElement>(null)
  

  // return (
  //   <div className="flex flex-col">
  //     <div ref={pdfViewDiv}>
  //       <Markdown className={p.className}>{p.markdown}</Markdown>
  //     </div>
  //     <button
  //       onClick={() => {
  //         pdfViewDiv.current && html2pdf(pdfViewDiv.current)
  //       }}
  //     >
  //       Download me
  //     </button>
  //   </div>
  // )

  // return <div dangerouslySetInnerHTML={{ __html: htmlFromMd }}></div>
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

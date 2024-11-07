import { Document, Page, PDFViewer } from "@react-pdf/renderer"
import { toMdTree } from "../../utils/formatter"
import { MdNodeRender } from "../pdf-renders"

export type MarkdownEditorAndPdfViewerProps = { markdown: string }
export const MarkdownEditorAndPdfViewer = (p: MarkdownEditorAndPdfViewerProps) => {
  const mdTree = toMdTree(p.markdown)
  console.log(mdTree)
  return (
    <div className=" w-full flex items-center justify-center mt-20">
      <PDFViewer>
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
    </div>
  )
}

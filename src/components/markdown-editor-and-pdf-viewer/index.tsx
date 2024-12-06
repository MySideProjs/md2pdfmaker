import Editor from "@monaco-editor/react"
import Markdown from "react-markdown"
import { useMarkdownContent, useStylesConf } from "../../state"

export const MarkdownEditorAndPdfViewer = () => {
  const { mdContent, saveMd2StateAndStore } = useMarkdownContent()
  const commonBorder = "border-b-black border-0.5 border-solid"
  return (
    <div className="flex flex-row max-w-100vw">
      <div className={`${commonBorder} no-print`}>
        <Editor width={"48vw"} className="h-74vh" onChange={(c) => saveMd2StateAndStore(c || "")} value={mdContent} />
      </div>
      <div>
        <PdfPart className="h-74vh w-[calc(100%-80px)] overflow-scroll" markdown={mdContent} />
      </div>
    </div>
  )
}

type PdfPartProps = {
  markdown: string
  className?: string
}
const PdfPart = (p: PdfPartProps) => {
  const { mdStyles } = useStylesConf()

  return (
    <div
      className={`flex flex-col ${p.className} p-40px`}
      style={{
        backgroundColor: mdStyles.overall?.backgroundColor,
      }}
    >
      <div id="md-preview" style={mdStyles.overall}>
        <Markdown
          components={{
            h1: (p) => <h1 {...p} style={mdStyles.h1} />,
            h2: (p) => <h2 {...p} style={mdStyles.h2} />,
            h3: (p) => <h3 {...p} style={mdStyles.h3} />,
            h4: (p) => <h4 {...p} style={mdStyles.h4} />,
            h5: (p) => <h5 {...p} style={mdStyles.h5} />,
          }}
        >
          {p.markdown}
        </Markdown>
      </div>
    </div>
  )
}

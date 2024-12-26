import Editor from "@monaco-editor/react"
import Markdown from "react-markdown"
import { useMarkdownContent, useStylesConf } from "../../state"

export const MarkdownEditorAndPdfViewer = () => {
  const { mdContent, saveMd2StateAndStore } = useMarkdownContent()
  const commonFrame = `flex-1 shadow-xl h-80vh border-1 border-stone border-solid`
  return (
    <div className="grid grid-auto-flow-col grid-auto-cols-[calc(50vw-3rem)] mb-4">
      <div className={`${commonFrame} rounded-r-none border-r-0.5`}>
        <Editor theme="vs-dark" onChange={(c) => saveMd2StateAndStore(c || "")} value={mdContent} />
      </div>
      <div className={`${commonFrame} rounded-l-none border-l-0.5 overflow-scroll p-0`}>
        <PdfPart markdown={mdContent} />
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
      className={`flex flex-col min-h-100% overflow-scroll p-40px`}
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

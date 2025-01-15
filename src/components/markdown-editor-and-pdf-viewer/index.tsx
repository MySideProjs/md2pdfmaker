import Editor from "@monaco-editor/react"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import Markdown from "react-markdown"
import { useIsWide } from "../../hooks"
import { useMarkdownContent, useStylesConf } from "../../state"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from "react"

export const MarkdownEditorAndPdfViewer = () => {
  const isWide = useIsWide()
  const { mdContent, saveMd2StateAndStore } = useMarkdownContent()
  const [currTab, setCurrTab] = useState<0 | 1>(0)

  // For mobile
  if (!isWide) {
    return (
      <>
        <Tabs value={currTab} onChange={(_, tabIdx) => setCurrTab(tabIdx)} variant="fullWidth">
          <Tab label="Edit" />
          <Tab label="Preview" />
        </Tabs>
        <div className="h-86vh overflow-scroll">
          {currTab === 0 && <Editor theme="vs-dark" onChange={(c) => saveMd2StateAndStore(c || "")} value={mdContent} />}
          {currTab === 1 && <PdfPart markdown={mdContent} />}
        </div>
      </>
    )
  }

  // For laptop
  const commonFrame = `flex-1 shadow-xl border-1 border-stone border-solid h-84vh`
  return (
    <div
      className="grid grid-auto-flow-col grid-auto-cols-[calc(50vw-3rem)] mb-4"
      style={{
        display: "flex",
        flexDirection: isWide ? "row" : "column",
      }}
    >
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
        <MathJaxContext>
          <MathJax>
            <Markdown
              components={{
                h1: (p) => <h1 {...p} style={mdStyles.h1} />,
                h2: (p) => <h2 {...p} style={mdStyles.h2} />,
                h3: (p) => <h3 {...p} style={mdStyles.h3} />,
                h4: (p) => <h4 {...p} style={mdStyles.h4} />,
                h5: (p) => <h5 {...p} style={mdStyles.h5} />,
                h6: (p) => <h6 {...p} style={mdStyles.h6} />,
              }}
            >
              {p.markdown}
            </Markdown>
          </MathJax>
        </MathJaxContext>
      </div>
    </div>
  )
}

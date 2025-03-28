import { Marp } from "@marp-team/marp-core"
import Editor from "@monaco-editor/react"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { useState } from "react"
import { Else, If, Then } from "react-if"
import Markdown from "react-markdown"
import styleToCss from "style-object-to-css-string"
import { useIsWide } from "../../hooks"
import { MdStyles, useMarkdownContent, usePreviewMode, useStylesConf } from "../../state"

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
  const { isSlides } = usePreviewMode()

  return (
    <div className={`flex flex-col min-h-100% overflow-scroll`}>
      <div id="md-preview" style={isSlides ? {} : mdStyles.overall}>
        <If condition={isSlides}>
          <Then>
            <div id="marp-part">
              <MarpPart markdown={p.markdown} />
            </div>
          </Then>
          <Else>
            <MathJaxContext>
              <MathJax>
                <Markdown
                  className={"p-40px"}
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
          </Else>
        </If>
      </div>
    </div>
  )
}

const MarpPart = (p: { markdown: string }) => {
  const { mdStyles } = useStylesConf()
  const { html, css } = new Marp().render(p.markdown)
  return (
    <div
      id="marp-part"
      dangerouslySetInnerHTML={{
        __html:
          html +
          //
          `<style>${buildMarpThemeFromMdStyles(mdStyles)}</style>` +
          `<style>${css}</style>`,
      }}
    />
  )
}

const buildMarpThemeFromMdStyles = (mdStyles: MdStyles) => {
  const h1Css = styleToCss(mdStyles.h1)
  const h2Css = styleToCss(mdStyles.h2)
  const h3Css = styleToCss(mdStyles.h3)
  const h4Css = styleToCss(mdStyles.h4)
  const h5Css = styleToCss(mdStyles.h5)
  const h6Css = styleToCss(mdStyles.h6)
  return `
  /* @theme marpit-theme */
  #marp-part section {
    background-color: ${mdStyles.overall?.backgroundColor};
    fontFamily: ${mdStyles.overall?.fontFamily};
    color: ${mdStyles.overall?.color};
  }

  #marp-part h1 {
    ${h1Css}
  }

  #marp-part h2 {
    ${h2Css}
  }

  #marp-part h3 {
    ${h3Css}
  }

  #marp-part h4 {
    ${h4Css}
  }

  #marp-part h5 {
    ${h5Css}
  }

  #marp-part h6 {
    ${h6Css}
  }

  `
}

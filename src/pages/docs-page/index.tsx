import { Card, List, ListItemButton } from "@mui/material"
import { isEmpty } from "lodash"
import { useState } from "react"
import { If, Then } from "react-if"
import Markdown from "react-markdown"
import { useEffectOnce } from "react-use"
import doc_basic_markdown_tutorial from "./docs/basic-markdown-tutorial.md"
import doc_quick_start from "./docs/quick-start.md"
import doc_faq from "./docs/faq.md"

export const Docs = () => {
  const [docContent, setDocCont] = useState("")
  useEffectOnce(() => loadMdContent(doc_quick_start, setDocCont))
  return (
    <div className="flex flex-row">
      <Card className="mr-4">
        <div>
          <List>
            <ListItemButton
              onClick={() => {
                loadMdContent(doc_quick_start, setDocCont)
              }}
            >
              Quick Start
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                loadMdContent(doc_basic_markdown_tutorial, setDocCont)
              }}
            >
              Basic Markdown Tutorial
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                loadMdContent(doc_faq, setDocCont)
              }}
            >
              FAQs
            </ListItemButton>
          </List>
        </div>
      </Card>

      <Card>
        <div className="h-80vh w-70vw overflow-scroll ml-10 p-4">
          <If condition={!isEmpty(docContent)}>
            <Then>
              <Markdown>{docContent}</Markdown>
            </Then>
          </If>
        </div>
      </Card>
    </div>
  )
}

const loadMdContent = (mdPath: string, cb: (text: string) => void) => {
  import(mdPath).then((res) => {
    console.log(res)
    fetch(res.default)
      .then((response) => response.text())
      .then((text) => cb(text))
  })
}

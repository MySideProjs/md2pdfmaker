import { Card, List, ListItemButton } from "@mui/material"
import { isEmpty } from "lodash"
import { useState } from "react"
import { If, Then } from "react-if"
import Markdown from "react-markdown"
import { useEffectOnce } from "react-use"
import { doc_basic_markdown_tutorial } from "./docs/basic-markdown-tutorial"
import { doc_faqs } from "./docs/faq"
import { doc_quick_start } from "./docs/quick-start"

export const Docs = () => {
  const [docContent, setDocCont] = useState("")
  useEffectOnce(() => setDocCont(doc_quick_start))
  return (
    <div className="flex flex-row">
      <Card className="mr-4">
        <div>
          <List>
            <ListItemButton
              onClick={() => {
                setDocCont(doc_quick_start)
              }}
            >
              Quick Start
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                setDocCont(doc_basic_markdown_tutorial)
              }}
            >
              Basic Markdown Tutorial
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                setDocCont(doc_faqs)
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

import { Card, List, ListItemButton } from "@mui/material"
import { isEmpty } from "lodash"
import { useState } from "react"
import { If, Then } from "react-if"
import Markdown from "react-markdown"
import basic_markdown_tutorial from "./docs/basic-markdown-tutorial.md"
import { useEffectOnce } from "react-use"

export const Docs = () => {
  const [docContent, setDocCont] = useState("")
  useEffectOnce(() => loadMdContent(basic_markdown_tutorial, setDocCont))
  return (
    <div className="flex flex-row">
      <Card className="mr-4">
        <div>
          <List>
            <ListItemButton
              onClick={() => {
                loadMdContent(basic_markdown_tutorial, setDocCont)
              }}
            >
              Basic Markdown Tutorial
            </ListItemButton>
            {/* <ListItemButton
            onClick={() => {
              loadMdContent(quick_start, setDocCont)
            }}
          >
            Quick Start
          </ListItemButton> */}
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

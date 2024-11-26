import { atom, useAtom } from "jotai"
import { loadMarkdownFile } from "../utils/file"
import { useState } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, saveMdContent2Store } from "../store"

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */
type PdfStyles = {
  frame: {
    left: string
  }
}

const pdfStylesAtom = atom<PdfStyles>()
export const useStylesConf = () => {
  const [styles] = useAtom(pdfStylesAtom)
  const [isStyleConfModalOpen, setIsStyleConfModalOpen] = useState(false)
  const openStylesConfModal = () => setIsStyleConfModalOpen(true)
  const closeStylesConfModal = () => setIsStyleConfModalOpen(false)
  return {
    styles,
    isStyleConfModalOpen,
    openStylesConfModal,
    closeStylesConfModal,
  }
}

/* -------------------------------------------------------------------------- */
/*                              Markdown Content                              */
/* -------------------------------------------------------------------------- */

const mdContentAtom = atom("")
export const useMarkdownContent = () => {
  const [mdContent, setMdContent] = useAtom(mdContentAtom)
  const saveMd2StateAndStore = (md: string) => {
    setMdContent(md)
    saveMdContent2Store(md)
  }
  useEffectOnce(() => {
    setMdContent(loadMdContentFromStore)
  })

  const loadFileAndOverwriteMarkdownContent = () => {
    loadMarkdownFile((f) => {
      const reader = new FileReader()
      reader.addEventListener("loadend", () => saveMd2StateAndStore(reader.result as string))
      reader.readAsText(f)
    })
  }

  return {
    mdContent,
    setMdContent: saveMd2StateAndStore,
    loadFileAndOverwriteMarkdownContent,
  }
}

/* -------------------------------------------------------------------------- */
/*                            Markdown Renderer Div                           */
/* -------------------------------------------------------------------------- */
export const mdRendererDiv = atom()

import { atom, useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, loadStylesFromStore, saveMdContent2Store, saveStyles2Store } from "../store"
import { loadMarkdownFile } from "../utils/file"

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */
export type PdfStyles = {
  frame: {
    padding: number
  }
}

const defaultStyles: PdfStyles = {
  frame: {
    padding: 10,
  },
}
const pdfStylesAtom = atom<PdfStyles>(loadStylesFromStore() ?? defaultStyles)
export const useStylesConf = () => {
  const [styles, setStyles] = useAtom<PdfStyles>(pdfStylesAtom)

  useEffect(() => {
    saveStyles2Store(styles)
  }, [styles])

  const [isStyleConfModalOpen, setIsStyleConfModalOpen] = useState(false)
  const openStylesConfModal = () => setIsStyleConfModalOpen(true)
  const closeStylesConfModal = () => setIsStyleConfModalOpen(false)

  /* -------------------------------------------------------------------------- */
  /*                               Style Modifier                               */
  /* -------------------------------------------------------------------------- */
  const changePadding = (padding: number) => {
    styles.frame.padding = padding
    setStyles(styles)
  }

  return {
    styles,
    changePadding,
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

import { atom, useAtom } from "jotai"
import { CSSProperties, useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, loadStylesFromStore, saveMdContent2Store, saveStyles2Store } from "../store"
import { loadMarkdownFile } from "../utils/file"

/* -------------------------------------------------------------------------- */
/*                               PDF Style Modifier                           */
/* -------------------------------------------------------------------------- */

export type MdStyles = {
  h1?: CSSProperties
  h2?: CSSProperties
  h3?: CSSProperties
  h4?: CSSProperties
  h5?: CSSProperties
  overall?: CSSProperties
}

const defaultMdStyles: MdStyles = {
  overall: {
    fontFamily: "Arial",
    padding: 50,
  },
}
const pdfStylesAtom = atom<MdStyles>(loadStylesFromStore() ?? defaultMdStyles)

export const useStylesConf = () => {
  const [mdStyles, setMdStyles] = useAtom(pdfStylesAtom)

  useEffect(() => {
    saveStyles2Store(mdStyles)
  }, [mdStyles])

  const styleModifier = {
    changeOverallFontFamily: (fontFamily: string) =>
      setMdStyles({
        ...mdStyles,
        overall: { ...mdStyles.overall, fontFamily },
      }),

    changeOverallPadding: (padding: number) => {
      setMdStyles({
        ...mdStyles,
        overall: { ...mdStyles.overall, padding },
      })
    },
  }

  const [isStyleConfModalOpen, setIsStyleConfModalOpen] = useState(false)
  const openStylesConfModal = () => setIsStyleConfModalOpen(true)
  const closeStylesConfModal = () => setIsStyleConfModalOpen(false)

  return {
    mdStyles,
    styleModifier,
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
    saveMd2StateAndStore,
    loadFileAndOverwriteMarkdownContent,
  }
}

/* -------------------------------------------------------------------------- */
/*                            Markdown Renderer Div                           */
/* -------------------------------------------------------------------------- */
export const mdRendererDiv = atom()

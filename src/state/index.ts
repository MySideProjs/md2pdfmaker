import { atom, useAtom } from "jotai"
import { CSSProperties, useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, loadStylesFromStore, saveMdContent2Store, saveStyles2Store } from "../store"
import { loadMarkdownFile } from "../utils/file"

/* -------------------------------------------------------------------------- */
/*                                  Font Options                              */
/* -------------------------------------------------------------------------- */
const defaultFonts = ["Arial", "Courier", "Georgia", "Times", "Trebuchet", "Verdana"]
export const useFontsOptions = () => {
  const [fontsOptions, setFontsOptions] = useState(defaultFonts)
  const requestUserPermissionToFetchFonts = async () => {
    window
      .queryLocalFonts()
      .then((fontDataList) => {
        const fontFamilies = fontDataList.map((fd) => fd.family)
        setFontsOptions(fontFamilies)
      })
      .catch((e) => {
        console.error("Automatically load fonts failed due to: ", e)
      })
  }

  useEffectOnce(() => {
    requestUserPermissionToFetchFonts()
  })

  return {
    fontsOptions,
    requestUserPermissionToFetchFonts,
  }
}

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
  },
  h1: {
    fontFamily: "Arial",
  },
  h2: {},
  h3: {},
  h4: {},
  h5: {},
}
const pdfStylesAtom = atom<MdStyles>(loadStylesFromStore() ?? defaultMdStyles)

export const useStylesConf = () => {
  const [mdStyles, setMdStyles] = useAtom(pdfStylesAtom)

  useEffect(() => {
    saveStyles2Store(mdStyles)
  }, [mdStyles])

  // Add style modifiers here
  const styleModifier = {
    reset: () => {
      setMdStyles(defaultMdStyles)
    },
    changeOverallFontFamily: (fontFamily: string) =>
      setMdStyles({
        ...mdStyles,
        overall: { ...mdStyles.overall, fontFamily },
      }),
    changeOverallLineHeight: (lineHeight: number) => {
      setMdStyles({
        ...mdStyles,
        overall: { ...mdStyles.overall, lineHeight: `${lineHeight}px` },
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

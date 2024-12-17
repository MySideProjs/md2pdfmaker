import { atom, useAtom } from "jotai"
import { debounce, uniq } from "lodash"
import { CSSProperties, useEffect } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, loadStylesFromStore, saveMdContent2Store, saveStyles2Store } from "../store"
import { loadMarkdownFile } from "../utils/file"
import { getPreset, PresetsNames } from "./presets"
import { helpCenterMdContent } from "../components/app-help-modal"

/* -------------------------------------------------------------------------- */
/*                                  Font Options                              */
/* -------------------------------------------------------------------------- */
const defaultFonts = ["Arial", "Courier", "Georgia", "Times", "Trebuchet", "Verdana", "monospace", "Optima", "Impact"]
const fontOptionsAtom = atom(defaultFonts)
export const useFontsOptions = () => {
  const [fontsOptions, setFontsOptions] = useAtom(fontOptionsAtom)
  const requestUserPermissionToFetchFonts = async () => {
    window
      .queryLocalFonts()
      .then((fontDataList) => {
        const fontFamilies = uniq(fontDataList.map((fd) => fd.family).concat(defaultFonts))
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

const stylesConfAtom = atom(loadStylesFromStore() ?? getPreset("Default"))
const styleConfModalOpenStatusAtom = atom(false)
export const useStylesConf = () => {
  const [mdStyles, setMdStyles] = useAtom(stylesConfAtom)
  const [isStyleConfModalOpen, setIsStyleConfModalOpen] = useAtom(styleConfModalOpenStatusAtom)

  useEffect(() => {
    const printPageStyle = document.getElementById("print-page-style")
    if (printPageStyle) {
      printPageStyle.innerHTML = `@page {background-color: ${mdStyles.overall?.backgroundColor}}`
    }
  }, [mdStyles.overall?.backgroundColor])

  useEffect(() => {
    saveStyles2Store(mdStyles)
  }, [mdStyles])

  /* * * * * * * * * * * * * *  // Add style modifiers below * * * * * * * * * * * * * * */

  const styleModifier = {
    reset: () => {
      setMdStyles(getPreset("Default"))
    },
    changePresetTo: (presetName: PresetsNames) => {
      const presetGot = getPreset(presetName)
      console.log(presetGot)
      if (presetGot !== undefined) {
        setMdStyles(presetGot)
      }
    },
    changeGroupStyle: debounce((extra: CSSProperties, styleGroup: keyof MdStyles) => {
      console.debug(`change ${styleGroup} style`, extra)
      mdStyles[styleGroup] = { ...mdStyles[styleGroup], ...extra }
      setMdStyles({ ...mdStyles })
    }, 200),
  }
  /* * * * * * * * * * * * * *  // Add style modifiers above * * * * * * * * * * * * * * */

  const openStylesConfModal = () => {
    setIsStyleConfModalOpen(true)
  }
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
    setMdContent(loadMdContentFromStore() ?? helpCenterMdContent)
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

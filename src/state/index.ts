import { atom, useAtom } from "jotai"
import { debounce, uniq } from "lodash"
import { CSSProperties, useEffect } from "react"
import { useEffectOnce } from "react-use"
import { loadMdContentFromStore, loadStylesFromStore, saveMdContent2Store, saveStyles2Store } from "../store"
import { loadMarkdownFile } from "../utils/file"
import { defaultFonts } from "./defaults"
import { getPreset, PresetsNames } from "./presets"

/* -------------------------------------------------------------------------- */
/*                                  Font Options                              */
/* -------------------------------------------------------------------------- */

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
  h6?: CSSProperties
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
    changePresetTo: (presetName: PresetsNames) => {
      const presetGot = getPreset(presetName)
      console.debug("got preset:", presetGot)
      if (presetGot !== undefined) {
        setMdStyles({ ...presetGot })
      }
    },
    changeGroupStyle: debounce((extra: CSSProperties, styleGroup: keyof MdStyles, apply2All = false) => {
      console.debug(`change ${styleGroup} style`, extra)
      if (styleGroup === "overall" && apply2All) {
        mdStyles["overall"] = { ...mdStyles["overall"], ...extra }
        mdStyles["h1"] = { ...mdStyles["h1"], ...extra }
        mdStyles["h2"] = { ...mdStyles["h2"], ...extra }
        mdStyles["h3"] = { ...mdStyles["h3"], ...extra }
        mdStyles["h4"] = { ...mdStyles["h4"], ...extra }
        mdStyles["h5"] = { ...mdStyles["h5"], ...extra }
      } else {
        mdStyles[styleGroup] = { ...mdStyles[styleGroup], ...extra }
      }
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
    setMdContent(loadMdContentFromStore() ?? "")
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

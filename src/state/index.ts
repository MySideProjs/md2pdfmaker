import { atom, useAtom } from "jotai"
import { loadMarkdownFile } from "../utils/file"

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
  const openStylesConfModal = () => {}
  return {
    styles,
    openStylesConfModal,
  }
}

/* -------------------------------------------------------------------------- */
/*                              Markdown Content                              */
/* -------------------------------------------------------------------------- */

const mdContentAtom = atom("")
export const useMarkdownContent = () => {
  const [mdContent, setMdContent] = useAtom(mdContentAtom)

  const loadFileAndOverwriteMarkdownContent = () => {
    loadMarkdownFile((f) => {
      const reader = new FileReader()
      reader.addEventListener("loadend", () => setMdContent(reader.result as string))
      reader.readAsText(f)
    })
  }

  return {
    mdContent,
    setMdContent,
    loadFileAndOverwriteMarkdownContent,
  }
}

import { useMarkdownContent, useStylesConf } from "../../state"
import { MdPreviewStyleModal } from "../markdown-preview-style-modal"
import iconDownload from "./download.svg"
import folderOpen from "./folder_open.svg"
import iconPalette from "./palette.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { openStylesConfModal } = useStylesConf()

  const commonCls = "h-12 w-12 flex items-center justify-center border-1 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <div className={`rounded-l-xl border-r-0.5 ${commonCls}`} onClick={() => window.print()}>
          <img src={iconDownload} />
        </div>
        <div className={`${commonCls}`} onClick={loadFileAndOverwriteMarkdownContent}>
          <img src={folderOpen} />
        </div>

        <div className={`rounded-r-xl border-l-0.5 ${commonCls}`} onClick={openStylesConfModal}>
          <img src={iconPalette} />
        </div>
      </div>

      <MdPreviewStyleModal />
    </div>
  )
}

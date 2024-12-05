import { useToggle } from "react-use"
import { useMarkdownContent, useStylesConf } from "../../state"
import { AppHelpModal } from "../app-help-modal"
import { MdPreviewStyleModal } from "../markdown-preview-style-modal"
import iconDownload from "./download.svg"
import folderOpen from "./folder_open.svg"
import helpCenter from "./help_center.svg"
import iconPalette from "./palette.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { openStylesConfModal } = useStylesConf()
  const [isHelpCenterModalOpen, toggleHelpCenterModal] = useToggle(false)

  const commonCls = "h-12 w-12 flex items-center justify-center border-0.5 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
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

        <div className={`${commonCls}`} onClick={() => toggleHelpCenterModal(true)}>
          <img src={helpCenter} />
        </div>

        <div className={`rounded-r-xl border-l-0.5 ${commonCls}`} onClick={openStylesConfModal}>
          <img src={iconPalette} />
        </div>
      </div>

      {/* modals */}
      <AppHelpModal isOpen={isHelpCenterModalOpen} onRequestClose={() => toggleHelpCenterModal(false)} />
      <MdPreviewStyleModal />
    </div>
  )
}

import iconDownload from "./download.svg"
import iconPalette from "./palette.svg"
import folderOpen from "./folder_open.svg"
import { useMarkdownContent, useStylesConf } from "../../state"

export type SwitchCardProps = {}
export const HeaderButtons = (p: SwitchCardProps) => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { openStylesConfModal } = useStylesConf()

  const commonCls = "h-12 w-12 flex items-center justify-center border-1 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  return (
    <div className="flex flex-row w-full items-center justify-center">
      <div className="flex flex-row">
        <div className={`rounded-l-xl border-r-0.5 ${commonCls}`} onClick={openStylesConfModal}>
          <img src={iconDownload} />
        </div>
        <div className={`${commonCls}`} onClick={openStylesConfModal}>
          <img src={iconPalette} />
        </div>
        <div className={`rounded-r-xl border-l-0.5 ${commonCls}`} onClick={loadFileAndOverwriteMarkdownContent}>
          <img src={folderOpen} />
        </div>
      </div>
    </div>
  )
}

import Modal from "react-modal"
import { useMarkdownContent, useStylesConf } from "../../state"
import iconDownload from "./download.svg"
import folderOpen from "./folder_open.svg"
import iconPalette from "./palette.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { openStylesConfModal, closeStylesConfModal, isStyleConfModalOpen } = useStylesConf()

  const commonCls = "h-12 w-12 flex items-center justify-center border-1 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <div className={`rounded-l-xl border-r-0.5 ${commonCls}`} onClick={printIt}>
          <img src={iconDownload} />
        </div>
        <div className={`${commonCls}`} onClick={loadFileAndOverwriteMarkdownContent}>
          <img src={folderOpen} />
        </div>
        <div className={`rounded-r-xl border-l-0.5 ${commonCls}`} onClick={openStylesConfModal}>
          <img src={iconPalette} />
        </div>
      </div>

      {/* modal */}
      <Modal
        isOpen={isStyleConfModalOpen}
        onRequestClose={closeStylesConfModal}
        style={{
          content: { inset: 200, backgroundColor: "#E5E1DA" },
        }}
      >
        <label>
          Margins(px)
          <input
            type="number"
            onChange={(e) => {
              console.log(e.target.value)
            }}
          ></input>
        </label>
      </Modal>
    </div>
  )
}

const printIt = () => {
  let candidateTitle = ""
  const mdPreview = document.getElementById("md-preview")!
  console.log(mdPreview)
  const h1 = mdPreview.querySelector("h1")
  if (h1) {
    candidateTitle = h1.innerText
    const currentTitle = document.title
    document.title = candidateTitle
    window.requestAnimationFrame(() => {
      document.title = currentTitle
    })
  }
  window.print()
}

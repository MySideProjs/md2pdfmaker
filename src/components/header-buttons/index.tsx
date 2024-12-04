import html2pdf from "html2pdf.js"
import Modal from "react-modal"
import { useMarkdownContent, useStylesConf } from "../../state"
import iconDownload from "./download.svg"
import folderOpen from "./folder_open.svg"
import iconPalette from "./palette.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { mdStyles, styleModifier, openStylesConfModal, closeStylesConfModal, isStyleConfModalOpen } = useStylesConf()

  const commonCls = "h-12 w-12 flex items-center justify-center border-1 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <div
          className={`rounded-l-xl border-r-0.5 ${commonCls}`}
          onClick={() => {
            const element = document.getElementById("md-preview")
            const worker = html2pdf()
            worker.set({ pagebreak: { mode: "avoid-all" } })
            worker.from(element).toPdf().save()
          }}
        >
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
          content: { inset: 200 },
        }}
      >
        {/* /* -------------------------------------------------------------------------- */
        /*                                   Overall                                  */
        /* -------------------------------------------------------------------------- */}
        <section>
          <header>
            <h1 className="text-lg">Overall</h1>
          </header>

          {/* ------------- Font Family ------------- */}
          <div>
            <label className="mr-2">Font Family:</label>
            <select
              value={mdStyles.overall?.fontFamily}
              onChange={(e) => {
                console.log(e.target.value)
                styleModifier.changeOverallFontFamily(e.target.value)
              }}
            >
              <option>Arial</option>
              <option>Courier New</option>
              <option>Georgia</option>
              <option>Times New Roman</option>
              <option>Trebuchet MS</option>
              <option>Verdana</option>
            </select>
          </div>

          <div className="m-2" />

          {/* ------------- Padding ------------- */}
          <div>
            <label className="mr-2">Padding:</label>
            <input type="number" value={mdStyles.overall?.padding} onChange={(e) => styleModifier.changeOverallPadding(parseInt(e.target.value))} />
          </div>
        </section>
      </Modal>
    </div>
  )
}

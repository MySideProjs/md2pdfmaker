import Modal from "react-modal"
import { useFontsOptions, useMarkdownContent, useStylesConf } from "../../state"
import iconDownload from "./download.svg"
import folderOpen from "./folder_open.svg"
import iconPalette from "./palette.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const { mdStyles, styleModifier, openStylesConfModal, closeStylesConfModal, isStyleConfModalOpen } = useStylesConf()
  const { fontsOptions, requestUserPermissionToFetchFonts } = useFontsOptions()

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
          <div className="mt-2">
            <label className="mr-2">Font Family:</label>
            <select value={mdStyles.overall?.fontFamily} onChange={(e) => styleModifier.changeOverallFontFamily(e.target.value)}>
              {fontsOptions.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <button onClick={requestUserPermissionToFetchFonts}>load system fonts</button>
          </div>

          <div className="mt-2">
            <label className="mr-2">Line height:</label>
            <input type="number" onChange={(e) => styleModifier.changeOverallLineHeight(parseInt(e.target.value))} />
          </div>
        </section>

        <div className="absolute right-6 bottom-6">
          <button onClick={styleModifier.reset}>Reset</button>
        </div>
      </Modal>
    </div>
  )
}

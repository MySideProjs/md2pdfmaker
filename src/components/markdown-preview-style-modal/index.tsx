import Modal from "react-modal"
import { useFontsOptions, useStylesConf } from "../../state"

export const MdPreviewStyleModal = () => {
  const { mdStyles, styleModifier, closeStylesConfModal, isStyleConfModalOpen } = useStylesConf()
  const { fontsOptions, requestUserPermissionToFetchFonts } = useFontsOptions()
  const onClickLoadLocalFonts = () => {
    if (window.queryLocalFonts == undefined) {
      alert("Sorry, seems current browser does not support loading local fonts, try Chrome please!")
    } else {
      requestUserPermissionToFetchFonts()
    }
  }
  return (
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

        {/* ------------- Font ------------- */}
        <div className="mt-2">
          <label className="mr-2">Font Family:</label>
          <select value={mdStyles.overall?.fontFamily} onChange={(e) => styleModifier.changeOverallFontFamily(e.target.value)}>
            {fontsOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <label className="mr-2">Font Color:</label>
          <input type="color" value={mdStyles.overall?.color} onChange={(e) => styleModifier.changeOverallFontColor(e.target.value)} />
        </div>

        {/* ------------- Bg ------------- */}
        <div className="mt-2">
          <label className="mr-2">Background Color:</label>
          <input type="color" value={mdStyles.overall?.backgroundColor} onChange={(e) => styleModifier.changeOverallBgColor(e.target.value)} />
        </div>
      </section>

      <div className="absolute right-6 bottom-6 flex">
        <button onClick={styleModifier.reset}>Reset</button>
        <div className="m-1" />
        <button onClick={onClickLoadLocalFonts}>Load System Fonts</button>
      </div>
    </Modal>
  )
}

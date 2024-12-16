import Modal from "react-modal"
import { MdStyles, useFontsOptions, useStylesConf } from "../../state"
import { PresetsSelector } from "../markdown-preview-style-presets"

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
      {/* ------------------------------------------------------------------------- */
      /*                                   Overall                                  */
      /* -------------------------------------------------------------------------- */}
      <section className="mb-6">
        <h3 className="text-lg">Overall</h3>

        <section className="flex justify-left items-baseline">
          {/* ------------- Font ------------- */}
          <div className="mr-4">
            <label className="mr-2">Font Family:</label>
            <select value={mdStyles.overall?.fontFamily} onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, "overall")}>
              {fontsOptions.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="mr-4">
            <label className="mr-2">Font Color:</label>
            <input type="color" value={mdStyles.overall?.color} onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, "overall")} />
          </div>

          {/* ------------- Bg ------------- */}
          <div className="mr-4">
            <label className="mr-2">Background Color:</label>
            <input
              type="color"
              value={mdStyles.overall?.backgroundColor}
              onChange={(e) => styleModifier.changeGroupStyle({ backgroundColor: e.target.value }, "overall")}
            />
          </div>
        </section>
      </section>

      {/* ------------------------------------------------------------------------- */
      /*                                Heading Levels                              */
      /* -------------------------------------------------------------------------- */}
      {[1, 2, 3, 4, 5].map((headingLevel) => {
        const styleKey = `h${headingLevel}` as keyof MdStyles
        return (
          <section key={styleKey} className="mb-6">
            <h3 className="text-lg">Heading Level {headingLevel}</h3>

            <section className="flex justify-left items-baseline">
              <div className="mr-4">
                <label className="mr-2">Font Family:</label>
                <select value={mdStyles[styleKey]?.fontFamily} onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, styleKey)}>
                  {fontsOptions.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="mr-4">
                <label className="mr-2">Font Color:</label>
                <input type="color" value={mdStyles[styleKey]?.color} onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, styleKey)} />
              </div>
            </section>
          </section>
        )
      })}

      {/* ------------------------------------------------------------------------- */
      /*                                Buttons                              */
      /* -------------------------------------------------------------------------- */}
      <div className="absolute right-6 bottom-6 flex">
        <button onClick={styleModifier.reset}>Reset</button>
        <div className="m-1" />
        <button onClick={onClickLoadLocalFonts}>Load System Fonts</button>
      </div>

      <div className="absolute right-6 top-6 flex">
        <PresetsSelector />
      </div>
    </Modal>
  )
}

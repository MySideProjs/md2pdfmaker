import Drawer from "@mui/material/Drawer"
import { MdStyles, useFontsOptions, useStylesConf } from "../../state"
import { presetsNames } from "../../state/presets"

export const MdPreviewStyleModal = () => {
  const { mdStyles, styleModifier, isStyleConfModalOpen, closeStylesConfModal } = useStylesConf()
  const { fontsOptions, requestUserPermissionToFetchFonts } = useFontsOptions()
  const onClickLoadLocalFonts = () => {
    if (window.queryLocalFonts == undefined) {
      alert("Sorry, seems current browser does not support loading local fonts, try Chrome please!")
    } else {
      requestUserPermissionToFetchFonts()
    }
  }

  return (
    <Drawer open={isStyleConfModalOpen} onClose={closeStylesConfModal}>
      <div className="p-8 font-sans">
        {/* ------------------------------------------------------------------------- */
        /*                                   Overall                                  */
        /* -------------------------------------------------------------------------- */}
        <section className="mb-6">
          <h3 className="text-lg mb-2">Overall</h3>

          <section className="">
            <div className="mb-2">
              <label className="mr-2">Font Family:</label>
              <select value={mdStyles.overall?.fontFamily} onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, "overall")}>
                {fontsOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="mr-2">Font Color:</label>
              <input type="color" value={mdStyles.overall?.color} onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, "overall")} />
            </div>

            <div>
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
              <h3 className="text-lg mb-2">Heading Level {headingLevel}</h3>

              <section className="flex flex-col justify-left items-baseline">
                <div className="mb-2">
                  <label className="mr-2">Font Family:</label>
                  <select value={mdStyles[styleKey]?.fontFamily} onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, styleKey)}>
                    {fontsOptions.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
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
        <div>
          <div>
            <label className="mr-2 text-lg font-bold">Apply Style Preset</label>

            <div className="flex flex-row">
              {presetsNames.map((k) => (
                <button className="m-2 ml-0 w-40" key={k} onClick={() => styleModifier.changePresetTo(k)}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mr-2 text-lg font-bold">Font Options</label>
            <div>
              <button className="m-2 ml-0 w-40" onClick={onClickLoadLocalFonts}>
                Load System Fonts
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

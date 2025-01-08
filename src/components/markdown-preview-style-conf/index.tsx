import { MdStyles, useFontsOptions, useStylesConf } from "../../state"
import { defaultFontSizes } from "../../state/defaults"
import { presetsNames } from "../../state/presets"

export const MdPreviewStyleConfPart = () => {
  return (
    <div className="p-8 font-sans text-sm">
      <Buttons />
      <Overall />
      <HeadingLevels />
    </div>
  )
}

const Buttons = () => {
  const { styleModifier } = useStylesConf()
  const { requestUserPermissionToFetchFonts } = useFontsOptions()
  const onClickLoadLocalFonts = () => {
    if (window.queryLocalFonts == undefined) {
      alert("Sorry, seems current browser does not support loading local fonts, try Chrome please!")
    } else {
      requestUserPermissionToFetchFonts()
    }
  }
  return (
    <section className="mb-6">
      <div>
        <label className="mr-2 text-md font-bold">Apply Style Preset</label>

        <div className="flex flex-row">
          {presetsNames.map((k) => (
            <button className="m-2 ml-0 w-40" key={k} onClick={() => styleModifier.changePresetTo(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mr-2 text-md font-bold">Font Options</label>
        <div>
          <button className="m-2 ml-0 w-40" onClick={onClickLoadLocalFonts}>
            Load System Fonts
          </button>
        </div>
      </div>
    </section>
  )
}

const Overall = () => {
  const { mdStyles, styleModifier } = useStylesConf()
  const { fontsOptions } = useFontsOptions()
  return (
    <section className="mb-6">
      <div className="mb-2">
        <label className="text-md font-bold">Overall</label>
      </div>

      <section>
        <div className="mb-2">
          <label className="mr-2">Font Size:</label>
          <select value={mdStyles.overall?.fontSize} onChange={(e) => styleModifier.changeGroupStyle({ fontSize: e.target.value }, "overall")}>
            {defaultFontSizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="mr-2">Font Family:</label>
          <select value={mdStyles.overall?.fontFamily} onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, "overall", true)}>
            {fontsOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="mr-2">Font Color:</label>
          <input type="color" value={mdStyles.overall?.color} onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, "overall", true)} />
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
  )
}

const HeadingLevels = () => {
  const { mdStyles, styleModifier } = useStylesConf()
  const { fontsOptions } = useFontsOptions()
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((headingLevel) => {
        const styleKey = `h${headingLevel}` as keyof MdStyles
        return (
          <section key={styleKey} className="mb-6">
            <div className="mb-2">
              <label className="text-md font-bold mb-2">Heading Level {headingLevel}</label>
            </div>

            <section className="flex flex-col justify-left items-baseline">
              <div className="mb-2">
                <label className="mr-2">Font Size:</label>
                <select value={mdStyles[styleKey]?.fontSize} onChange={(e) => styleModifier.changeGroupStyle({ fontSize: e.target.value }, styleKey)}>
                  {defaultFontSizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>

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
    </div>
  )
}

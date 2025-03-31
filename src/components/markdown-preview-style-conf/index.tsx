import FontDownloadIcon from "@mui/icons-material/FontDownload"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { MdStyles, PreviewMode, useFontsOptions, usePreviewMode, useStylesConf } from "../../state"
import { defaultFontSizes } from "../../state/defaults"
import { getPreset, presetsNames } from "../../state/presets"
import { reportGA } from "../../utils/ga"

export const MdPreviewStyleConfPart = () => {
  return (
    <div className="p-8 text-sm font-[Montserrat]">
      <Basics />
      <Overall />
      <HeadingLevels />
    </div>
  )
}

const Basics = () => {
  const { styleModifier } = useStylesConf()
  const { requestUserPermissionToFetchFonts, isLoaded } = useFontsOptions()
  const { previewMode, setPreviewMode } = usePreviewMode()
  const onClickLoadLocalFonts = () => {
    if (window.queryLocalFonts == undefined) {
      alert("Sorry, seems current browser does not support loading local fonts, try Chrome please!")
    } else {
      requestUserPermissionToFetchFonts()
    }
  }
  return (
    <section className="mb-6">
      {/* Themes */}
      <div>
        <div className="flex flex-row flex-wrap">
          {presetsNames.map((k) => (
            <Chip
              label={k}
              size="small"
              style={{ color: "white", backgroundColor: getPreset(k).overall?.color, width: 120, height: 30, marginRight: 10, marginBottom: 2 }}
              key={k}
              onClick={() => styleModifier.changePresetTo(k)}
            />
          ))}
        </div>
      </div>

      {/* Local fonts */}
      <div className="mt-6" />
      <div>
        <label className="text-md font-bold">Load System Font</label>
        <div className="mb-2" />
        <div>
          <Button disabled={isLoaded} startIcon={<FontDownloadIcon />} variant="contained" onClick={onClickLoadLocalFonts}>
            {isLoaded ? "Loaded" : "Load"}
          </Button>
        </div>
      </div>
      <div className="mt-6" />

      {/* Modes */}
      <div>
        <label className="text-md font-bold">Mode</label>
        <div className="mb-2" />
        <div>
          <ToggleButtonGroup
            color="primary"
            value={previewMode}
            exclusive
            onChange={(_, v: PreviewMode) => {
              reportGA(`switch_to_mode_${v}`)
              setPreviewMode(v)
            }}
            aria-label="Platform"
          >
            <ToggleButton value="slides">Slides</ToggleButton>
            <ToggleButton value="doc">Doc</ToggleButton>
          </ToggleButtonGroup>
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
        <section aria-description="overall font conf" className="flex flex-wrap">
          <FormControl>
            <InputLabel id="overall-font-size-helper-label">Font Size</InputLabel>
            <Select
              className="mr-4 mb-4"
              labelId="overall-font-size-helper-label"
              label="Font Size"
              value={mdStyles.overall?.fontSize}
              onChange={(e) => styleModifier.changeGroupStyle({ fontSize: e.target.value }, "overall")}
            >
              {defaultFontSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="overall-font-family-helper-label">Font Family</InputLabel>
            <Select
              className="mr-4 mb-4"
              label="Font Family"
              labelId='"overall-font-family-helper-label"'
              value={mdStyles.overall?.fontFamily}
              onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, "overall", true)}
            >
              {fontsOptions.map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>
        <section aria-description="overall color conf" className="flex flex-wrap">
          <FormControl>
            <div className="mr-4 mb-4">
              <TextField
                label="Font Color"
                type="color"
                value={mdStyles.overall?.color}
                onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, "overall", true)}
              />
            </div>
          </FormControl>
          <FormControl>
            <TextField
              label="Background Color"
              type="color"
              value={mdStyles.overall?.backgroundColor}
              onChange={(e) => styleModifier.changeGroupStyle({ backgroundColor: e.target.value }, "overall")}
            />
          </FormControl>
        </section>
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

            <section className="flex flex-wrap">
              <FormControl>
                <InputLabel id={`heading-${headingLevel}-font-size-helper-label`}>Font Size</InputLabel>
                <Select
                  className="mr-4 mb-4"
                  labelId={`heading-${headingLevel}-font-size-helper-label`}
                  label="Font Size"
                  value={mdStyles[styleKey]?.fontSize}
                  onChange={(e) => styleModifier.changeGroupStyle({ fontSize: e.target.value }, styleKey)}
                >
                  {defaultFontSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id={`heading-${headingLevel}-font-family-helper-label`}>Font Family</InputLabel>
                <Select
                  className="mr-4 mb-4"
                  label="Font Size"
                  labelId={`heading-${headingLevel}-font-family-helper-label`}
                  value={mdStyles[styleKey]?.fontFamily}
                  onChange={(e) => styleModifier.changeGroupStyle({ fontFamily: e.target.value }, styleKey)}
                >
                  {fontsOptions.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  label="Font Color"
                  type="color"
                  value={mdStyles[styleKey]?.color}
                  onChange={(e) => styleModifier.changeGroupStyle({ color: e.target.value }, styleKey)}
                />
              </FormControl>
            </section>
          </section>
        )
      })}
    </div>
  )
}

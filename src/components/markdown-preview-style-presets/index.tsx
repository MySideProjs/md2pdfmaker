import { ChangeEvent } from "react"
import { useStylesConf } from "../../state"
import { presetsNames, PresetsNames } from "./presets"

export const PresetsSelector = () => {
  const { styleModifier } = useStylesConf()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    styleModifier.changePresetTo(e.target.value as PresetsNames)
  }

  return (
    <div>
      <label className="mr-2">Apply Style Preset:</label>
      <select onChange={onChange}>
        {presetsNames.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
    </div>
  )
}

import { merge } from "lodash"
import { MdStyles } from "."
import { ArrayValues } from "type-fest"
import { defaultFontSizes } from "./defaults"
export const presetsNames = ["Default", "UrbanSteel", "Rusted Machinery", "Smoky Sky"]
export type PresetsNames = ArrayValues<typeof presetsNames>

const common: MdStyles = {
  overall: { fontSize: defaultFontSizes[2] },
  h6: { fontSize: defaultFontSizes[3] },
  h5: { fontSize: defaultFontSizes[4] },
  h4: { fontSize: defaultFontSizes[5] },
  h3: { fontSize: defaultFontSizes[6] },
  h2: { fontSize: defaultFontSizes[7] },
  h1: { fontSize: defaultFontSizes[8] },
}
export const getPreset = (name: PresetsNames): MdStyles => {
  switch (name) {
    case "Default":
      return merge(common, {
        overall: {
          color: "#343131",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
        h1: {
          color: "#1A1A1D",
          fontFamily: "Arial",
        },
        h2: {
          color: "#33372C",
          fontFamily: "Arial",
        },
        h3: {
          color: "#3C3D37",
          fontFamily: "Arial",
        },
        h4: {
          color: "#3C3D37",
          fontFamily: "Arial",
        },
        h5: {
          color: "#3C3D37",
          fontFamily: "Arial",
        },
      })
    case "UrbanSteel":
      return merge({
        overall: {
          backgroundColor: "#E0E2E4",
          fontFamily: "Optimal",
          color: "#4B4E54",
        },
      })
    case "Rusted Machinery":
      return merge({
        overall: {
          backgroundColor: "#F7C996",
          fontFamily: "Impact",
          color: "#8B4513",
        },
      })
    case "Smoky Sky":
      return merge({
        overall: {
          backgroundColor: "#F9F7F7",
          fontFamily: "monospace",
          color: "#4A4E69",
        },
      })
    default:
      return merge({
        overall: {
          color: "#000000",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      })
  }
}

import { ArrayValues } from "type-fest"
import { MdStyles } from "."
import { defaultFontSizes } from "./defaults"
export const presetsNames = ["Default", "UrbanSteel", "Rusted Machinery", "Smoky Sky"]
export type PresetsNames = ArrayValues<typeof presetsNames>

export const getPreset = (name: PresetsNames): MdStyles => {
  switch (name) {
    case "Default":
      return mergeStyleWithCommon({
        overall: {
          color: "#343131",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      })
    case "UrbanSteel":
      return mergeStyleWithCommon({
        overall: {
          backgroundColor: "#E0E2E4",
          fontFamily: "Optimal",
          color: "#4B4E54",
        },
      })
    case "Rusted Machinery":
      return mergeStyleWithCommon({
        overall: {
          backgroundColor: "#F7C996",
          fontFamily: "Impact",
          color: "#8B4513",
        },
      })
    case "Smoky Sky":
      return mergeStyleWithCommon({
        overall: {
          backgroundColor: "#F9F7F7",
          fontFamily: "monospace",
          color: "#4A4E69",
        },
      })
    default:
      return mergeStyleWithCommon({
        overall: {
          color: "#000000",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      })
  }
}

const mergeStyleWithCommon = (extra: MdStyles) => {
  return {
    overall: { fontSize: defaultFontSizes[2], ...extra.overall },
    h6: { fontSize: defaultFontSizes[3], ...extra.h6 },
    h5: { fontSize: defaultFontSizes[4], ...extra.h5 },
    h4: { fontSize: defaultFontSizes[5], ...extra.h4 },
    h3: { fontSize: defaultFontSizes[6], ...extra.h3 },
    h2: { fontSize: defaultFontSizes[7], ...extra.h2 },
    h1: { fontSize: defaultFontSizes[8], ...extra.h1 },
  }
}

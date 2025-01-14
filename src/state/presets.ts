import { ArrayValues } from "type-fest"
import { MdStyles } from "."
import { defaultFonts, defaultFontSizes } from "./defaults"
export const presetsNames = ["Default", "UrbanSteel", "Rusted", "Smoky Sky"]
export type PresetsNames = ArrayValues<typeof presetsNames>

export const getPreset = (name: PresetsNames): MdStyles => {
  switch (name) {
    case "Default":
      return mergeStyleWithCommon(
        {
          overall: {
            backgroundColor: "#ffffff",
          },
        },
        { defaultFontFamily: "Arial", defaultFontColor: "#000000" },
      )
    case "UrbanSteel":
      return mergeStyleWithCommon(
        {
          overall: {
            backgroundColor: "#E0E2E4",
          },
        },
        { defaultFontFamily: "Courier", defaultFontColor: "#4B4E54" },
      )
    case "Rusted":
      return mergeStyleWithCommon(
        {
          overall: {
            backgroundColor: "#F7C996",
          },
        },
        {
          defaultFontColor: "#8B4513",
          defaultFontFamily: "Impact",
        },
      )
    case "Smoky Sky":
      return mergeStyleWithCommon(
        {
          overall: {
            backgroundColor: "#F9F7F7",
          },
        },
        {
          defaultFontColor: "#4A4E69",
          defaultFontFamily: "monospace",
        },
      )
    default:
      return mergeStyleWithCommon(
        {
          overall: {
            backgroundColor: "#ffffff",
          },
        },
        {
          defaultFontColor: "#000000",
          defaultFontFamily: "Arial",
        },
      )
  }
}

const mergeStyleWithCommon = (
  mdStyles: MdStyles,
  extra: {
    defaultFontColor: string
    defaultFontFamily: ArrayValues<typeof defaultFonts>
  },
): MdStyles => {
  return {
    overall: { fontSize: defaultFontSizes[2], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.overall },
    h6: { fontSize: defaultFontSizes[3], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h6 },
    h5: { fontSize: defaultFontSizes[4], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h5 },
    h4: { fontSize: defaultFontSizes[5], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h4 },
    h3: { fontSize: defaultFontSizes[6], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h3 },
    h2: { fontSize: defaultFontSizes[7], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h2 },
    h1: { fontSize: defaultFontSizes[8], color: extra.defaultFontColor, fontFamily: extra.defaultFontFamily, ...mdStyles.h1 },
  }
}

import { MdStyles } from "."
import { ArrayValues } from "type-fest"
export const presetsNames = ["Default", "UrbanSteel", "Rusted Machinery", "Smoky Sky"]
export type PresetsNames = ArrayValues<typeof presetsNames>

const commonOverall: MdStyles["overall"] = {
  fontSize: "14pt",
}
export const getPreset = (name: PresetsNames): MdStyles => {
  switch (name) {
    case "Default":
      return {
        overall: {
          ...commonOverall,
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
      }
    case "UrbanSteel":
      return {
        overall: {
          ...commonOverall,
          backgroundColor: "#E0E2E4",
          fontFamily: "Optimal",
          color: "#4B4E54",
        },
      }
    case "Rusted Machinery":
      return {
        overall: {
          ...commonOverall,
          backgroundColor: "#F7C996",
          fontFamily: "Impact",
          color: "#8B4513",
        },
      }
    case "Smoky Sky":
      return {
        overall: {
          ...commonOverall,
          backgroundColor: "#F9F7F7",
          fontFamily: "monospace",
          color: "#4A4E69",
        },
      }
    default:
      return {
        overall: {
          ...commonOverall,
          color: "#000000",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      }
  }
}

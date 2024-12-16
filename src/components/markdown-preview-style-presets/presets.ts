import { MdStyles } from "../../state"
import { ArrayValues } from "type-fest"
export const presetsNames = ["Default", "UrbanSteel", "Rusted Machinery", "Smoky Sky"]
export type PresetsNames = ArrayValues<typeof presetsNames>

export const getPreset = (name: PresetsNames): MdStyles => {
  switch (name) {
    case "Default":
      return {
        overall: {
          color: "#000000",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      }
    case "UrbanSteel":
      return {
        overall: {
          backgroundColor: "#E0E2E4",
          fontFamily: "Optimal",
          color: "#4B4E54",
        },
      }
    case "Rusted Machinery":
      return {
        overall: {
          backgroundColor: "#F7C996",
          fontFamily: "Impact",
          color: "#8B4513",
        },
      }
    case "Smoky Sky":
      return {
        overall: {
          backgroundColor: "#F9F7F7",
          fontFamily: "monospace",
          color: "#4A4E69",
        },
      }
    default:
      return {
        overall: {
          color: "#000000",
          fontFamily: "Arial",
          backgroundColor: "#ffffff",
        },
      }
  }
}

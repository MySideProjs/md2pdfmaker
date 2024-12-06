import { MdStyles } from "../../state"

export type PresetsNames = keyof typeof presets

const _default: MdStyles = {
  overall: {
    color: "#000000",
    fontFamily: "Arial",
    backgroundColor: "#ffffff",
  },
}
const UrbanSteel: MdStyles = {
  overall: {
    backgroundColor: "#E0E2E4",
    fontFamily: "Optimal",
    color: "#4B4E54",
  },
}

const RustedMachinery: MdStyles = {
  overall: {
    backgroundColor: "#F7C996",
    fontFamily: "Impact",
    color: "#8B4513",
  },
}

const SmokySky: MdStyles = {
  overall: {
    backgroundColor: "#F9F7F7",
    fontFamily: "monospace",
    color: "#4A4E69",
  },
}

export const presets = {
  Default: _default,
  "Urban Steel": UrbanSteel,
  "Rusted Machinery": RustedMachinery,
  "Smoky Sky": SmokySky,
}

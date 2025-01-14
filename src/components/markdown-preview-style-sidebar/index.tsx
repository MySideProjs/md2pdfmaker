import { useState } from "react"
import { MdPreviewStyleConfPart } from "../markdown-preview-style-conf"
import iconCustomStyles from "./color-palette.png"
import { reportGA } from "../../utils/ga"

export const StyleSideBar = () => {
  const collapsedLeft = "-43vw"
  const expandedLeft = "-4vw"
  const [left, setLeft] = useState(collapsedLeft)
  const expand = () => setLeft(expandedLeft)
  const collapse = () => setLeft(collapsedLeft)

  const onClick =
    left == expandedLeft
      ? collapse
      : () => {
          expand()
          reportGA("open_styles_conf")
        }
  return (
    <div
      className="z-1 flex items-center absolute top-20"
      style={{
        marginLeft: left,
        transition: "margin-left .2s ease-in-out",
      }}
    >
      <div className="shadow-[5px_5px_25px_0px_#000] h-80vh w-40vw overflow-y-scroll left-0 top-10 rounded-r-2xl bg-white">
        <MdPreviewStyleConfPart />
      </div>
      <img className="p-1 rounded-r-xl h-6 bg-#D1786A cursor-pointer" src={iconCustomStyles} onClick={onClick} />
    </div>
  )
}

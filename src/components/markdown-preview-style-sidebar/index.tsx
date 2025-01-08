import { PropsWithChildren, useState } from "react"
import iconCustomStyles from "./custom-styles.svg"

export type StyleSideBarProps = PropsWithChildren
export const StyleSideBar = (p: StyleSideBarProps) => {
  const collapsedLeft = "-43vw"
  const expandedLeft = "0"
  const [left, setLeft] = useState(collapsedLeft)
  const expand = () => setLeft(expandedLeft)
  const collapse = () => setLeft(collapsedLeft)
  const onClick = left == expandedLeft ? collapse : expand
  return (
    <div
      className="z-1 flex items-center absolute top-20"
      style={{
        marginLeft: left,
        transition: "margin-left .2s ease-in-out",
      }}
    >
      <div className="border-1 border-solid border-#D1786A h-60vh w-40vw left-0 top-10 rounded-r-2xl bg-white">{p.children}</div>

      <img className="border-1 border-solid border-#D1786A p-2 pb-1.6 h-8 cursor-pointer" src={iconCustomStyles} onClick={onClick} />
    </div>
  )
}

import { Drawer, DrawerProps } from "@mui/material"
import { MdPreviewStyleConfPart } from "../markdown-preview-style-conf"

export type StyleDrawerProps = DrawerProps
export const StyleDrawer = (p: StyleDrawerProps) => {
  return (
    <Drawer anchor="bottom" {...p}>
      <div className="h-60vh">
        <MdPreviewStyleConfPart />
      </div>
    </Drawer>
  )
}

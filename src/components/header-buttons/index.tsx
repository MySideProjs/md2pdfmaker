import ArticleIcon from "@mui/icons-material/Article"
import IconDownload from "@mui/icons-material/Download"
import IconFolderOpen from "@mui/icons-material/FolderOpen"
import IconPalette from "@mui/icons-material/Palette"
import Button from "@mui/material/Button"
import Fab from "@mui/material/Fab"
import { CSSProperties } from "react"
import { useToggle } from "react-use"
import { useIsWide } from "../../hooks"
import { useMarkdownContent, usePreviewMode } from "../../state"
import { reportGA } from "../../utils/ga"
import { StyleDrawer } from "../markdown-preview-style-drawer"
import { useNavigate } from "react-router"

export const HeaderButtons = () => {
  const isWide = useIsWide()
  const { previewMode } = usePreviewMode()
  const [isStyleDrawerOpen, toggleStyleDrawer] = useToggle(false)
  const buttonStyle: CSSProperties = { backgroundColor: "#524C42", marginRight: 10 }
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const nav = useNavigate()
  const onDownload = () => {
    window.print()
    reportGA(`clicked_download_pdf_in_mode_${previewMode}`)
  }
  const onFolderOpen = () => {
    loadFileAndOverwriteMarkdownContent()
    reportGA("import_local_md")
  }

  // const onFeedback = () => {
  //   window.open("https://forms.gle/God6MvZ6imVXE5hs5")
  //   reportGA("open_help_center")
  // }

  const onGotoDocsPage = () => {
    nav("/docs")
  }

  // For mobile
  if (!isWide) {
    return (
      <div className="absolute bottom-6 right-2 flex flex-col">
        <Fab onClick={onDownload}>
          <IconDownload />
        </Fab>
        <div className="m-1" />
        <Fab onClick={onFolderOpen}>
          <IconFolderOpen />
        </Fab>
        <div className="m-1" />
        <Fab onClick={() => toggleStyleDrawer(true)}>
          <IconPalette />
        </Fab>
        <div className="m-1" />
        {/* <Fab onClick={onFeedback}>
          <IconFeedback />
        </Fab> */}
        <StyleDrawer open={isStyleDrawerOpen} onClose={() => toggleStyleDrawer(false)} />
      </div>
    )
  }

  // For laptop
  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <Button style={buttonStyle} variant="contained" startIcon={<IconDownload />} onClick={onDownload}>
          Export
        </Button>

        <Button style={{ ...buttonStyle }} variant="contained" startIcon={<IconFolderOpen />} onClick={onFolderOpen}>
          Import
        </Button>

        <Button style={{ ...buttonStyle }} variant="contained" startIcon={<ArticleIcon />} onClick={onGotoDocsPage}>
          Tutorial
        </Button>

        {/* <IconButton aria-label="feedback" style={{ ...buttonStyle, marginRight: 0 }} onClick={onFeedback}>
          <IconFeedback sx={{ color: "white" }} />
        </IconButton> */}
      </div>
    </div>
  )
}

import IconDownload from "@mui/icons-material/Download"
import IconFolderOpen from "@mui/icons-material/FolderOpen"
import Button from "@mui/material/Button"
import { CSSProperties } from "react"
import { useMarkdownContent } from "../../state"
import { reportGA } from "../../utils/ga"

export const HeaderButtons = () => {
  const buttonStyle: CSSProperties = { backgroundColor: "#524C42", marginRight: 10 }
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()

  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <Button
          style={buttonStyle}
          variant="contained"
          startIcon={<IconDownload />}
          onClick={() => {
            window.print()
            reportGA("clicked_download_pdf")
          }}
        >
          Export
        </Button>

        <Button
          style={{ ...buttonStyle, marginRight: 0 }}
          variant="contained"
          startIcon={<IconFolderOpen />}
          onClick={() => {
            loadFileAndOverwriteMarkdownContent()
            reportGA("import_local_md")
          }}
        >
          Import
        </Button>
      </div>
    </div>
  )
}

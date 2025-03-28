import { Snackbar, Alert, Button } from "@mui/material"
import { MarkdownEditorAndPdfViewer } from "../../components/markdown-editor-and-pdf-viewer"
import { StyleSideBar } from "../../components/markdown-preview-style-sidebar"
import { useIsWide } from "../../hooks"
import { useToggle } from "react-use"

export const Home = () => {
  const isWide = useIsWide()
  const [isSnackbarOn, toggleSnackBar] = useToggle(true)
  return (
    <div>
      <MarkdownEditorAndPdfViewer />
      {isWide && <StyleSideBar />}

      {/* New feat snack bar */}
      <Snackbar open={isSnackbarOn} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="info" className="flex flex-row items-center">
          <div className="flex flex-row items-center gap-4">
            <div>
              We now support slide mode! To create a slide, simply insert a divider
              <code className="bg-gray-3 mx-1 px-1 rounded">---</code>. Give it a try by switching to slide mode in the style configuration sidebar!
            </div>

            <Button variant="text" aria-label="close" onClick={() => toggleSnackBar(false)}>
              DISMISS
            </Button>
          </div>
        </Alert>
      </Snackbar>
    </div>
  )
}

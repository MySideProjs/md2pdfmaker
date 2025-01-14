import ThemeProvider from "@mui/material/styles/ThemeProvider"
import createTheme from "@mui/material/styles/createTheme"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { MarkdownEditorAndPdfViewer } from "./components/markdown-editor-and-pdf-viewer"
import { StyleSideBar } from "./components/markdown-preview-style-sidebar"

const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "Montserrat" },
      },
    },
    MuiInputBase: {
      styleOverrides: { root: { height: 40, width: 160 } },
    },
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          height: "1.4rem",
        },
        root: {
          fontFamily: "Montserrat",
          boxShadow: "none",
          fontSize: "0.8rem",
          lineHeight: "1.8rem",
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <MarkdownEditorAndPdfViewer />
      <StyleSideBar />
    </ThemeProvider>
  )
}

export default App

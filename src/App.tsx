import ThemeProvider from "@mui/material/styles/ThemeProvider"
import createTheme from "@mui/material/styles/createTheme"
import { BrowserRouter, Route, Routes } from "react-router"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { Docs } from "./pages/docs-page"
import { Home } from "./pages/home-page"

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
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

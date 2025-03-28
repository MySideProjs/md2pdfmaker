import { Alert, Button, Snackbar } from "@mui/material"
import { useToggle } from "react-use"
import { useIsWide } from "../../hooks"
import { HeaderButtons } from "../header-buttons"
import logo from "./logo.png"
export const AppHeader = () => {
  const isWide = useIsWide()
  const [isSnackbarOn, toggleSnackBar] = useToggle(true)
  return (
    <header
      className="mb-4 flex flex-row items-start justify-between"
      style={{
        flexDirection: isWide ? "row" : "column",
      }}
    >
      {/* Titles */}
      <div className="flex items-center">
        <img className="h-8 border-gray border-1 border-solid" src={logo} alt="logo" />
        <div className="mr-4" />
        <div>
          <h1 className="font-sans text-xl" style={{ fontFamily: "Montserrat" }}>
            Markdown to PDF
          </h1>
          <div className="mr-2" />
          <span style={{ fontFamily: "ZCOOL XiaoWei" }}>with easy custom styles</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white flex">
        <HeaderButtons />
      </div>

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
    </header>
  )
}

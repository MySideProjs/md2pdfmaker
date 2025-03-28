import { If, Then } from "react-if"
import { useLocation, useNavigate } from "react-router"
import { useIsWide } from "../../hooks"
import { HeaderButtons } from "../header-buttons"
import logo from "./logo.png"
export const AppHeader = () => {
  const isWide = useIsWide()
  const nav = useNavigate()
  const location = useLocation()
  const isAtHomePage = location.pathname === "/"
  return (
    <header
      className="mb-4 flex flex-row items-start justify-between"
      style={{
        flexDirection: isWide ? "row" : "column",
      }}
    >
      {/* Titles */}
      <div className="flex items-center cursor-pointer" onClick={() => nav("/")}>
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
      <If condition={isAtHomePage}>
        <Then>
          <div className="bg-white flex">
            <HeaderButtons />
          </div>
        </Then>
      </If>
    </header>
  )
}

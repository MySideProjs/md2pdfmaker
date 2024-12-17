import { HeaderButtons } from "../header-buttons"
import logo from "./logo.png"
export const AppHeader = () => {
  return (
    <header className="mb-4 flex flex-row items-start justify-between">
      <div className="flex items-center">
        <img className="h-8 border-gray border-1 border-solid" src={logo} alt="logo" />
        <div className="mr-4" />
        <div>
          <h1 className="font-mono text-xl">Markdown to PDF</h1>
          <div className="mr-2" />
          <span className="">with easy custom styles</span>
        </div>
      </div>
      <div className="bg-white flex">
        <HeaderButtons />
      </div>
    </header>
  )
}

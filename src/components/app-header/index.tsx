import { HeaderButtons } from "../header-buttons"

export const AppHeader = () => {
  return (
    <div className="no-print border-solid border-1 border-t-none border-gray shadow-md pt-10 pb-12 max-h-18vh">
      <h1 className="w-full flex items-center justify-center font-mono">MARKDOWN TO PDF</h1>

      <div className="absolute right-10 top-10 bg-white flex">
        <HeaderButtons />
      </div>
    </div>
  )
}

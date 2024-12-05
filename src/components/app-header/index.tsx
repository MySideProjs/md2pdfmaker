import { HeaderButtons } from "../header-buttons"

export const AppHeader = () => {
  return (
    <div className="no-print border-solid border-1 border-t-none border-gray shadow-md pt-6 pb-6 max-h-18vh">
      <div className="flex flex-col items-center">
        <h1 className="w-full flex items-center justify-center font-mono">MARKDOWN ➡️ PDF</h1>
        <p>with easy custom styles</p>
      </div>
      <div className="absolute right-10 top-10 bg-white flex">
        <HeaderButtons />
      </div>
    </div>
  )
}

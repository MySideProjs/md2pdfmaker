import pallette from "./palette.svg"

export const AppHeader = () => {
  return (
    <div className="border-solid border-1 border-t-none border-gray shadow-md pt-8 pb-6 max-h-18vh">
      <div className="flex items-center flex-col">
        <h1 className="w-full flex items-center justify-center">Markdown to pdf with easy custom style</h1>
        <p className="font-semibold">Get what you see</p>
      </div>
      <div className="absolute right-10 top-10 bg-white">
        <button className="p-2">
          <img src={pallette} />
        </button>
      </div>
    </div>
  )
}

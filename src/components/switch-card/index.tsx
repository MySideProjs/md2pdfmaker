export type SwitchCardProps = {
  onSwitchToFile: () => void
  onSwitchToEdit: () => void
}
export const SwitchCard = (p: SwitchCardProps) => {
  const commonCls = "h-60 w-60 flex items-center justify-center border-1 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  return (
    <div className="flex flex-row w-full items-center justify-center mt-50">
      <div className="flex flex-row">
        <div className={`rounded-l-3xl border-r-0.5 ${commonCls}`}>Choose File</div>
        <div className={`rounded-r-3xl border-l-0.5 ${commonCls}`}>Edit now</div>
      </div>
    </div>
  )
}

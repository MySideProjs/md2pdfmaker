import { noop } from "lodash"
import "./App.css"
import { AppHeader } from "./components/app-header"
import { SwitchCard } from "./components/switch-card"

function App() {
  return (
    <>
      <AppHeader />
      <SwitchCard onSwitchToFile={noop} onSwitchToEdit={noop} />
    </>
  )
}

export default App

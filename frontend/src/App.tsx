import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <Outlet/>
    </ThemeProvider>
  )
}

export default App

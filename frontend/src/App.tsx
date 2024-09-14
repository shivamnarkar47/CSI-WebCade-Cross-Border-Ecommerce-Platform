import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { useState } from "react";
function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <Outlet  />
    </ThemeProvider>
  )
}

export default App

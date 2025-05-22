import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import News from './News.jsx'

function App() {
  return(
  <div className="container">
    <Header></Header>
    <News></News>
  </div>
)
}

export default App

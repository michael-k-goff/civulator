import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

let gameData = {
  "resources": [
    ["Wood",1],
    ["Stone",2],
    ["Copper",3],
    ["Iron",4]
  ]
};

function App() {
  const [frameCount, setFrameCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  )
}

export default App

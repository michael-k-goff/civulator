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

let Resource = (resource: any) => {
  return (
    <p>
      {resource[0]} {resource[1]}
    </p>
  )
}

function App() {
  const [frameCount, setFrameCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        {gameData.resources.map(r => 
          Resource(r)
        )}
      </header>
    </div>
  )
}

export default App

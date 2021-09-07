import React, { useState } from 'react'
import './App.css'

interface Resource{
  resource_name: string,
  quantity: number
}

type TypeExample = {
  resource_name: String,
  quantity: number
}

let gameData: {[resource: string]: Resource[]} = {
  "resources": [
    {resource_name: "Wood", quantity:1},
    {resource_name: "Stone", quantity:2},
    {resource_name: "Copper", quantity:3},
    {resource_name: "Iron", quantity:4}
  ]
};

// This component is now superseded by TSResourceDisplay
let ResourceDisplay = (resource: any) => {
  return (
    <p>
      {resource.resource.resource_name} {resource.resource.quantity}
    </p>
  )
}

let TSResourceDisplay = ({ resource }: { resource: Resource }) => {
  return (
    <p>
      {resource.resource_name} {resource.quantity}
    </p>
  )
}

function App() {
  const [frameCount, setFrameCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        {gameData.resources.map(r => {
          return <TSResourceDisplay resource={r} key={r["resource_name"]} />
        }
          
        )}
      </header>
    </div>
  )
}

export default App

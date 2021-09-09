import React, { Component, MouseEvent, useState } from 'react'
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
    {resource_name: "Wood", quantity:0},
    {resource_name: "Stone", quantity:0},
    {resource_name: "Copper", quantity:0},
    {resource_name: "Iron", quantity:0}
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

interface ButtonParams {
  message: string,
  resource: Resource,
  frameCount: any,
  setFrameCount: any
}

export class Button extends Component <ButtonParams> {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    //alert(event.currentTarget.tagName); // alerts BUTTON
  }
  
  render() {
    return <button onClick={(event: MouseEvent)=>{
      //this.handleClick(event);
      event.preventDefault();
      this.props.resource.quantity += 1;
      this.props.setFrameCount(this.props.frameCount+1);
    }}>
      {this.props.message}
    </button>
  }
}

let TSResourceDisplay = ({ resource, frameCount, setFrameCount }: { resource: Resource, frameCount:any, setFrameCount:any }) => {
  return (
    <p>
      {resource.resource_name} {resource.quantity}
      <Button message="Harvest" resource={resource} frameCount={frameCount} setFrameCount={setFrameCount}/>
    </p>
  )
}

function App() {
  const [frameCount, setFrameCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        {gameData.resources.map(r => {
          return <TSResourceDisplay resource={r} frameCount={frameCount} setFrameCount={setFrameCount} key={r["resource_name"]} />
        }
          
        )}
      </header>
    </div>
  )
}

export default App

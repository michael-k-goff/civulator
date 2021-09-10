import React, { PureComponent, Component, MouseEvent, useState } from 'react'
import './App.css'

interface ResourceName {
  resource_name: string,
  auto_name: string
}

let GameDatabase: ResourceName[] = [
  {resource_name: "Wood", auto_name:"Chop Wood"},
  {resource_name: "Stone", auto_name:"Quarry Stone"},
  {resource_name: "Copper", auto_name:"Mine Copper"},
  {resource_name: "Iron", auto_name:"Mine Iron"}
]

interface Resource{
  resource_name: string,
  quantity: number
}

let gameData: {[resource: string]: Resource[]} = {
  "resources": []
};
for (let i=0; i<GameDatabase.length; i++) {
  gameData.resources = gameData.resources.concat({resource_name:GameDatabase[i].resource_name,quantity:0});
}

interface ButtonParams {
  message: string,
  resource: Resource,
  setQuantity: any
}

export class Button extends Component <ButtonParams> {
  render() {
    return <button onClick={(event: MouseEvent)=>{
      event.preventDefault();
      this.props.resource.quantity += 1;
      this.props.setQuantity(this.props.resource.quantity);
    }}>
      {this.props.message}
    </button>
  }
}

let TSResourceDisplay = ({ resource }: { resource: Resource }) => {
  const [quantity, setQuantity] = useState(resource.quantity);
  
  return (
    <p>
      {resource.resource_name} {quantity}
      <Button message="Harvest" resource={resource} setQuantity={setQuantity}/>
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

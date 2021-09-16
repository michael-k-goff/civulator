import React, { PureComponent, Component, MouseEvent, useState, useEffect } from 'react'
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
  quantity: number,
  auto_name: string,
  auto_number: number
}

let gameData: {[resource: string]: Resource[]} = {
  "resources": []
};
for (let i=0; i<GameDatabase.length; i++) {
  gameData.resources = gameData.resources.concat({
      resource_name:GameDatabase[i].resource_name,
      quantity:0,
      auto_name:GameDatabase[i].auto_name,
      auto_number:0
    });
}

interface ButtonParams {
  message: string,
  resource: Resource,
  setQuantity: any
}

interface AutoButtonParams {
  message: string,
  resource: Resource,
  setAutoNumber: any
}

export class Button extends Component <ButtonParams> {
  render(): JSX.Element {
    return <button onClick={(event: MouseEvent)=>{
      event.preventDefault();
      this.props.resource.quantity += 1;
      this.props.setQuantity(this.props.resource.quantity);
    }}>
      {this.props.message}
    </button>
  }
}

export class AutoButton extends Component <AutoButtonParams> {
  render(): JSX.Element {
    return <button onClick={(event: MouseEvent)=>{
      event.preventDefault();
      this.props.resource.auto_number += 1;
      this.props.setAutoNumber(this.props.resource.auto_number);
    }}>
      {this.props.message}
    </button>
  }
}

let TSResourceDisplay = ({ resource }: { resource: Resource }): JSX.Element => {
  const [quantity, setQuantity] = useState(resource.quantity);
  const [auto_number, setAutoNumber] = useState(resource.auto_number);
  
  return (
    <p>
      {resource.resource_name} {resource.quantity}
      <br />
      <Button message="Harvest" resource={resource} setQuantity={setQuantity}/>
      <br />
      {resource.auto_name} {resource.auto_number}
      <br />
      <AutoButton message={resource.auto_name} resource={resource} setAutoNumber={setAutoNumber}/>
    </p>
  )
}

const App = ():JSX.Element => {
  const [frameCount, setFrameCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let total_quantity = 0;
      for (let i=0; i<gameData.resources.length; i++) {
        gameData.resources[i].quantity += gameData.resources[i].auto_number;
        total_quantity += gameData.resources[i].quantity
      }
      setFrameCount((frameCount) => total_quantity); 
    }, 1000);
    return () => clearInterval(interval);
  }, [frameCount, setFrameCount]);

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

import React, { PureComponent, Component, MouseEvent, useState, useEffect } from 'react'
import {Resource, Power, gameData, powerData} from './GameData'
import './App.css'

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

interface PowerPlantParams {
  message: string,
  power: Power
}

const CanDo = (prereqs: {[prereq_resource: string]: number}): boolean => {
  let can_do: boolean = true;
  for (let key in prereqs) {
    for (let i:number=0; i<gameData.resources.length; i++) {
      if (gameData.resources[i].resource_name === key && gameData.resources[i].quantity < prereqs[key]) {
        can_do = false;
      }
    }
  }
  return can_do;
}

const ApplyCost = (prereqs: {[prereq_resource: string]: number}) => {
  for (let key in prereqs) {
    for (let i:number=0; i<gameData.resources.length; i++) {
      if (gameData.resources[i].resource_name == key) {
        gameData.resources[i].quantity -= prereqs[key]
      }
    }
  }
}

export class Button extends Component <ButtonParams> {
  render(): JSX.Element {
    return <button onClick={(event: MouseEvent)=>{
      event.preventDefault();
      if (CanDo(this.props.resource.prereqs)) {
        this.props.resource.quantity += 1;
        ApplyCost(this.props.resource.prereqs);
      }
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
      if (CanDo(this.props.resource.auto_prereqs)) {
        this.props.resource.auto_number += 1;
        ApplyCost(this.props.resource.auto_prereqs);
      }
      this.props.setAutoNumber(this.props.resource.auto_number);
    }}>
      {this.props.message}
    </button>
  }
}

export class PowerPlantButton extends Component <PowerPlantParams> {
  render(): JSX.Element {
    return <button onClick={(event: MouseEvent) => {
      event.preventDefault;
      if (CanDo(this.props.power.prereqs)) {
        this.props.power.quantity += 1;
        ApplyCost(this.props.power.prereqs);
      }
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
      {resource.resource_name} {Math.floor(resource.quantity)}
      <br />
      <Button message="Harvest" resource={resource} setQuantity={setQuantity}/>
      <br />
      {resource.auto_name} {resource.auto_number}
      <br />
      <AutoButton message={resource.auto_name} resource={resource} setAutoNumber={setAutoNumber}/>
    </p>
  )
}

let PowerPlantDisplay = ({plant}: {plant: Power}): JSX.Element => {
  return <p>
    {plant.name} {plant.quantity}
    <br />
    <PowerPlantButton message="Build" power={plant}/>
  </p>
}

const NumAutoBonus = (resource: Resource): number => {
  let a = resource.auto_number;
  let num_power_plants = 0;
  for (let i=0; i<powerData.length; i++) {
    for (let j=0; j<powerData[i].affects.length; j++) {
      if (powerData[i].affects[j] === resource.resource_name) {
        num_power_plants += powerData[i].quantity;
      }
    }
  }
  return a*(1+0.1*num_power_plants);
}

const App = ():JSX.Element => {
  const [frameCount, setFrameCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let total_quantity = 0;
      if (frameCount % 10 === 0) {
        for (let i=0; i<gameData.resources.length; i++) {
          gameData.resources[i].quantity += NumAutoBonus(gameData.resources[i]);
          total_quantity += gameData.resources[i].quantity
        }
      }
      setFrameCount((frameCount) => frameCount+1); 
    }, 100);
    return () => clearInterval(interval);
  }, [frameCount, setFrameCount]);

  return (
    <div className="App">
      <header className="App-header">
        {gameData.resources.map(r => {
          return <TSResourceDisplay resource={r} key={r["resource_name"]} />
        }
          
        )}
        {powerData.map(p => {
          return <PowerPlantDisplay plant={p} key={p.name}/>
        })}
      </header>
    </div>
  )
}

export default App

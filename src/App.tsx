import React, { PureComponent, Component, MouseEvent, useState, useEffect } from 'react'
import './App.css'

interface ResourceName {
  resource_name: string,
  auto_name: string,
  prereqs: {[prereq_resource: string]: number},
  auto_prereqs: {[prereq_resource: string]: number}
}

interface PowerName {
  plant_name: string,
  prereqs: {[prereq_resource: string]: number}
}

let GameDatabase: ResourceName[] = [
  {resource_name: "Wood", auto_name:"Chop Wood", prereqs:{}, auto_prereqs:{"Wood":4}},
  {resource_name: "Stone", auto_name:"Quarry Stone", prereqs:{"Wood":1}, auto_prereqs:{"Wood":4}},
  {resource_name: "Copper", auto_name:"Mine Copper", prereqs:{"Wood":2}, auto_prereqs:{"Wood":4}},
  {resource_name: "Iron", auto_name:"Mine Iron", prereqs:{"Wood":5}, auto_prereqs:{"Wood":4}}
]

let PowerDatabase: PowerName[] = [
  {plant_name: "Stoneworks", prereqs:{"Wood":4}},
  {plant_name: "Forge", prereqs:{"Iron":4}}
]

interface Resource{
  resource_name: string,
  quantity: number,
  auto_name: string,
  auto_number: number,
  prereqs: {[prereq_resource: string]: number},
  auto_prereqs: {[prereq_resource: string]: number}
}

interface Power{
  name: string,
  quantity: number,
  prereqs: {[prereq_resource: string]: number}
}

let gameData: {[resource: string]: Resource[]} = {
  "resources": [],
};
for (let i=0; i<GameDatabase.length; i++) {
  gameData.resources = gameData.resources.concat({
      resource_name:GameDatabase[i].resource_name,
      quantity:0,
      auto_name:GameDatabase[i].auto_name,
      auto_number:0,
      prereqs: GameDatabase[i].prereqs,
      auto_prereqs: GameDatabase[i].auto_prereqs
    });
}
let powerData: Power[] = []
for (let i=0; i<PowerDatabase.length; i++) {
  powerData = powerData.concat({
    name:PowerDatabase[i].plant_name,
    quantity:0,
    prereqs: PowerDatabase[i].prereqs
  })
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
      this.props.power.quantity += 1;
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

let PowerPlantDisplay = ({plant}: {plant: Power}): JSX.Element => {
  return <p>
    {plant.name} {plant.quantity}
    <br />
    <PowerPlantButton message="Build" power={plant}/>
  </p>
}

const App = ():JSX.Element => {
  const [frameCount, setFrameCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let total_quantity = 0;
      if (frameCount % 10 === 0) {
        for (let i=0; i<gameData.resources.length; i++) {
          gameData.resources[i].quantity += gameData.resources[i].auto_number;
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

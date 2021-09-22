export interface ResourceName {
    resource_name: string,
    auto_name: string,
    prereqs: {[prereq_resource: string]: number},
    auto_prereqs: {[prereq_resource: string]: number}
}
  
export interface PowerName {
    plant_name: string,
    prereqs: {[prereq_resource: string]: number},
    affects: string[]
}
  
export let GameDatabase: ResourceName[] = [
    {resource_name: "Wood", auto_name:"Chop", prereqs:{}, auto_prereqs:{"Wood":4}},
    {resource_name: "Stone", auto_name:"Quarry", prereqs:{"Wood":1}, auto_prereqs:{"Wood":4,"Stone":4}},
    {resource_name: "Copper", auto_name:"Mine", prereqs:{"Stone":2}, auto_prereqs:{"Copper":4}},
    {resource_name: "Iron", auto_name:"Mine", prereqs:{"Copper":5}, auto_prereqs:{"Iron":4}}
]
  
export let PowerDatabase: PowerName[] = [
    {plant_name: "Stoneworks", prereqs:{"Wood":4}, affects:["Wood","Stone"]},
    {plant_name: "Forge", prereqs:{"Iron":4}, affects:["Copper","Iron"]}
]

export interface Resource{
    resource_name: string,
    quantity: number,
    auto_name: string,
    auto_number: number,
    prereqs: {[prereq_resource: string]: number},
    auto_prereqs: {[prereq_resource: string]: number},
    visible: boolean
  }
  
export interface Power{
    name: string,
    quantity: number,
    prereqs: {[prereq_resource: string]: number},
    affects: string[],
    visible: boolean
  }
  
export let gameData: {[resource: string]: Resource[]} = {
    "resources": [],
  };
for (let i=0; i<GameDatabase.length; i++) {
    gameData.resources = gameData.resources.concat({
        resource_name:GameDatabase[i].resource_name,
        quantity:0,
        auto_name:GameDatabase[i].auto_name,
        auto_number:0,
        prereqs: GameDatabase[i].prereqs,
        auto_prereqs: GameDatabase[i].auto_prereqs,
        visible: false
      });
}
gameData.resources[0].visible=true
export let powerData: Power[] = []
  for (let i=0; i<PowerDatabase.length; i++) {
    powerData = powerData.concat({
      name:PowerDatabase[i].plant_name,
      quantity:0,
      prereqs: PowerDatabase[i].prereqs,
      affects: PowerDatabase[i].affects,
      visible: false
    })
  }

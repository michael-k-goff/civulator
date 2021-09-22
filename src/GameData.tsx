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
    {resource_name: "Iron", auto_name:"Mine", prereqs:{"Copper":5}, auto_prereqs:{"Iron":4}},
    {resource_name: "Steel", auto_name:"Forge", prereqs:{"Iron":3}, auto_prereqs:{"Steel":4,"Iron":5}},
    {resource_name: "Sulphur",auto_name:"Mine", prereqs:{"Steel":10}, auto_prereqs:{"Sulphur":3,"Steel":5}},
    {resource_name: "Aluminum", auto_name:"Mine", prereqs:{"Sulphur":5}, auto_prereqs:{"Aluminum":3}},
    {resource_name: "Titanium", auto_name:"Mine", prereqs:{"Aluminum":8,"Steel":5}, auto_prereqs:{"Titanium":5}},
    {resource_name: "Rare Earths", auto_name:"Mine",prereqs:{"Titanium":5}, auto_prereqs:{"Rare Earths":5}},
    {resource_name: "Graphene", auto_name:"Make",prereqs:{"Rare Earths":3,"Titanium":3}, auto_prereqs:{"Graphene":3,"Rare Earths":5}},
    {resource_name: "Plasteel", auto_name:"Make",prereqs:{"Graphene":5},auto_prereqs:{"Graphene":3,"Plasteel":4}},
    {resource_name: "Antimatter",auto_name:"Create",prereqs:{"Plasteel":4},auto_prereqs:{"Antimatter":3,"Plasteel":3,"Graphene":3}},
    {resource_name: "Dark Matter",auto_name:"Harvest",prereqs:{"Antimatter":5},auto_prereqs:{"Dark Matter":5,"Antimatter":1}},
    {resource_name: "Tesseract",auto_name:"Build",prereqs:{"Dark Matter":3},auto_prereqs:{"Tesseract":3,"Antimatter":1,"Dark Matter":2}},
    {resource_name: "Unobtainium",auto_name: "Make",prereqs:{"Tesseract":4},auto_prereqs:{"Unobtainium":5}}
]
  
export let PowerDatabase: PowerName[] = [
    {plant_name: "Stoneworks", prereqs:{"Wood":4,"Stone":4}, affects:["Wood","Stone"]},
    {plant_name: "Forge", prereqs:{"Iron":4,"Copper":4}, affects:["Copper","Iron","Steel"]},
    {plant_name: "Windmill",prereqs:{"Sulphur":5}, affects:["Iron","Steel","Sulphur"]},
    {plant_name: "Coal Plant",prereqs:{"Aluminum":3,"Iron":5},affects:["Sulphur","Aluminum"]},
    {plant_name: "Gas Plant",prereqs:{"Aluminum":6},affects:["Aluminum","Titanium"]},
    {plant_name: "Nuclear Plant",prereqs:{"Titanium":5},affects:["Titanium"]},
    {plant_name: "Solar Farm",prereqs:{"Rare Earths":5,"Titanium":3},affects:["Titanium","Aluminum","Rare Earths"]},
    {plant_name: "Fusion Plant",prereqs:{"Graphene":4},affects:["Graphene","Rare Earths"]},
    {plant_name: "Cold Fusion Plant",prereqs:{"Plasteel":5},affects:["Plasteel","Graphene","Rare Earths"]},
    {plant_name: "Dyson Sphere",prereqs:{"Antimatter":4,"Plasteel":4},affects:["Plasteel","Antimatter"]},
    {plant_name: "Dark Energy Plant",prereqs:{"Dark Matter":6},affects:["Antimatter","Dark Matter","Tesseract","Unobtainium"]}
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

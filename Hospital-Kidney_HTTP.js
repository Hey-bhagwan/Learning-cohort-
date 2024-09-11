//Today we have created a hospital-kidney game......
//accesing a express(compulsery to use express library)....
const express = require("express");

//a point to access expresss library function maybe????
const app = express();

//created an array to store data(not using database as we dont know yet)
const user = [{
  name : "Ayush",
  kidneys : [{
    health: true,
  },{
    health: false,
  }]
}];

//imporent for accessing a body
app.use(express.json());

//GET: gives back the total no. of kidneys, healthy ones and unhealthy ones..
app.get("/",function(req,res){
  const kidneys = user[0].kidneys;
  const numberOfKidneys = kidneys.length;
  let healthyKidneys = 0;
  
  //counting a total no. of healthy kidneys...
  for(let i = 0;i<numberOfKidneys;i++){
    if(kidneys[i].health){
      healthyKidneys = healthyKidneys +1;
    }
  }

  //counting a total no. of unhealthy kidneys...
  const unhealthyKidneys = numberOfKidneys - healthyKidneys;

  //giving back total no. of kidneys, healthy ones and unhealthy ones..
  res.json({
    numberOfKidneys,
    healthyKidneys,
    unhealthyKidneys
  })
})

//POST: adding a new kidneys in the array
app.post("/",function(req,res){
  const isHealthy = req.body.isHealthy;
  user[0].kidneys.push({
    health: isHealthy,
  })
  res.json({
    "msg": "Done",
  })
})

//PUT: setting the data of all the kidneys to true
app.put("/",function(req,res){
  for(let i  = 0;i<user[0].kidneys.length;i++){
    user[0].kidneys[i].health = true;
  }
  res.json();
})

//DELETE: removing all the kidneys with false(defective) data
app.delete("/",function(req,res){
  let upgradedKidneys = [];
  for(let i  = 0;i<user[0].kidneys.length;i++){
    if(user[0].kidneys[i].health){
      upgradedKidneys[i] = user[0].kidneys[i];
    }
  }
  user[0].kidneys = upgradedKidneys;
  res.json();
})

//availabe for only 3000 port...
app.listen(3000);
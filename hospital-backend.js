const express = require ("express");
const app = express();

const users = [{
    name:"John",
    kidneys:[{
        healthy: false
    },{
        healthy: true
    }]
}];
app.use(express.json());
app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const noOfKidneys = johnKidneys.length;
    let noOfHealthyKidneys =0;
    for(i=0;i<noOfKidneys;i++){
        if(johnKidneys[i].healthy){
            noOfHealthyKidneys+=1;
        }
    }
    let noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;
    res.json({
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    });
})
app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg :"Done"
    });
})
app.put("/",function(req,res){
    for(i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})
app.delete("/",function(req,res){
    if(isThereAtleastOneUnhealthyKidneys()){
        const newKidneys = [];
        for(i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy:true
                })
            }
        }
    users[0].kidneys = newKidneys;
    res.json({msg: "done!"})
    } else{
        res.status(411).json({
            msg :"You have no bad kidneys"
        })
    }
    
})
function isThereAtleastOneUnhealthyKidneys(){
    let atThereAtleastOneUnhealthyKidneys = false;
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atThereAtleastOneUnhealthyKidneys=true;
        }
    }
    return atThereAtleastOneUnhealthyKidneys;
}
app.listen(3000);
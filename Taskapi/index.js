const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const Model=require('./models/task')
const port=8000
const app=express()


app.use(bodyparser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const db="mongodb+srv://1234:feeditnot@cluster0.ihvrjfh.mongodb.net/taskapi?retryWrites=true&w=majority"

mongoose.connect(db,{usenewurlparser:true,useUnifiedTopology:true})


app.post("/task",(req,res)=>{
    var posttask=new Model({
title:req.body.title,
taskcompleted:req.body.taskcompleted 
    })

    posttask.save((err,data)=>{
        if(err){
           res.status(400).send({"message":"tile or task_completed is missing"})
        }else{
            res.status(201).send(posttask)
        }
    })
})

app.put("/task/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
const data=await Model.findByIdAndUpdate( _id, req.body,{new:true} );

     res.send(data)
 } catch(err){
   
         console.log("err")
         res.status(400).json({"message":"error.message"}) 
 }
 
 })

app.delete("/task/:id",async(req,res)=>{
   try{
  const deletechar=  await  Model.findByIdAndDelete(req.params.id)

res.status(204).send({message:'deleted'})
   }
   catch(error){
       console.log("error")
       res.status(400).send({message: "error.message"})

   }
})  

app.get("/task", (req,res)=>{

    Model.find()
    .then(result=>{
       res.status(200).send(result)  
    })
   .catch(err=>{console.log("error")})  
   })





app.listen(port,console.log(`server is listening on ${port}`))
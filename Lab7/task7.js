const express=require("express")
const app=express()

const students=[
{id:1,name:"Ali",semester:5},
{id:2,name:"Sara",semester:6},
{id:3,name:"Ahmed",semester:4}
]

app.get("/students",(req,res)=>{

let name=req.query.name

if(!name) return res.json(students)

let result=students.filter(s=>s.name.toLowerCase()===name.toLowerCase())

if(result.length>0) res.json(result)
else res.send("No student found")

})

app.listen(3000,()=>console.log("Server running"))
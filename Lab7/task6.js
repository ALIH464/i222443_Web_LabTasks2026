const express=require("express")
const app=express()

const products=[
{id:1,name:"Laptop",price:900},
{id:2,name:"Mouse",price:20},
{id:3,name:"Keyboard",price:50}
]

app.get("/products",(req,res)=>{
res.json(products)
})

app.get("/products/:id",(req,res)=>{
const id=parseInt(req.params.id)

const product=products.find(p=>p.id===id)

if(product) res.json(product)
else res.send("Product not found")
})

app.listen(3000,()=>console.log("Server running"))
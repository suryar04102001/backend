const express=require('express');
const app=express();
const mongoose=require('mongoose');
const mongoURL='mongodb://localhost:27017';
app.use(express.json());
const Product=require('./product.model.js')
const router=express.Router();
console.log('hey hello guys');
const m=async (req,res)=>{
    res.send(
      {
        hello:'dei',
      })}
router.get('/',m)
 

const connectToDB=async ()=>{
  const data=await mongoose.connect(mongoURL);
  if(data)
    console.log('connected to database');
  app.listen(5700,()=>{
    console.log('hello guys on 5700');
})
}
connectToDB()
app.post('/post',async (req,res)=>{
try
{
const pro=await Product.create(req.body);
res.status(200).json(pro);
}
catch(err){
  res.status(501).json({message:err.message});
}
})
app.get('/post/:id/:name',async (req,res)=>{
  try {
    const {id,name}=req.params;
    const data=await Product.findById(id);
    console.log(name);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
app.put('/update/:id',async (req,res)=>{
  const {id}=req.params;
  const data =await Product.findByIdAndUpdate(id,req.body);
  if(!data){
    res.status(400).json(data);
    return;
  }
  const result=await Product.findById(id);
  res.status(200).json(result);
})
app.delete('/delete/:id',async(req,res)=>{
  const {id}=req.params;
  const data= await Product.findByIdAndDelete(id);
  if(!data){ return res.json({message:"Data not found"})}
  res.send(data)
  
})
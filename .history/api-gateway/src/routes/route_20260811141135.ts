import express, { Request, Response } from 'express';
const app = express();

app.get('/api/users/:id',(req:Request,res:Response)=>{
    
const userId = req.params.id;
const user ={
    id:userId,
    name:"",
    password:"",
}
if(!user === null || !user === undefined)
{
    res.status(404).json({
        message:"user not found"
    });
}
});


app.post('/api/users',(req:Request,res:Response)=>{

});
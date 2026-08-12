import env = require("../config/env");


export  const createUser = async () => {
const res = await fetch(`${env.env.Database_url}/users`, {
    method:'POST',
    headers:{
        "content-type":"application/json"
    },
    
});
const data = await res.json();
  if(!data.ok){
    return res.status(400).json({message:"user not found"});
  }else{
    return res.status(200).json({message:"user created successfully"});
  }


};

export const findbyId = async () => {
   const res = await fetch(`${env.env.Database_url}/users`);
   const data = await prisma.user.findById({

    where:{
        id:Number(id);
    }
   });
  if()

};

export const findbyEmail = async () => {

};
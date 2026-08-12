import {createUser} from "../services/service";


export async function registerUser(req: any, res: any) {
    try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});}

         const user = await createUser(email,password);
         if(user){
            return res.status(201).json({message:"User created successfully",user});
         }

        }catch(error){
            return res.status(400).json({message:error.message});
        }

}
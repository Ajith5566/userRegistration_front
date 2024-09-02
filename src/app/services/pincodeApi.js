import axios from "axios";



export const pincodeApi =async(httpRequest,reqBody)=>{
    const reqConfig={
        method:httpRequest,
        url:`https://api.postalpincode.in/pincode/${reqBody}`,
        headers:{
            "Content-Type":"application/json",
        }
    };
  return  await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}
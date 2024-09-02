import axios from "axios";



export const adhaarApi =async(httpRequest,reqBody)=>{
    const reqConfig={
        method:httpRequest,
        url:'https://api.apyhub.com//validate/aadhaar',
        data: reqBody,
        headers:{
            "Content-Type":"application/json",
            'apy-token': 'APY0W2FQ70XCvbn3lWlMlui5OcYudHCXScPpN6MuG6mP8a2RNV2SIpBI5GWJ4c9vnIY'
        }
    };
  return  await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}
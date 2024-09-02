import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"
import {adhaarApi} from'./adhaarApi'
import{pincodeApi} from'./pincodeApi'
import axios from "axios"


//request to register a user
export default async function registerApi(reqBody) {
    return await commonApi('POST', `${BASE_URL}/user/register`, reqBody)
}

//request for login */

export  async function loginApi(reqBody){
    return await commonApi('POST',`${BASE_URL}/user/login`,reqBody)

} 

//adhhar api

export async function aadhaarVerify(reqBody){
    return await adhaarApi('POST',reqBody)
}

//pincode Api

export async function pincodeVerify(reqbody){
    return await pincodeApi('GET',reqbody)
}

//otp sending
/* export async function sentotp(reqBody){
    return await commonApi('POST',`${BASE_URL}/user/send-otp`,reqBody)
} */


export const sentotp= async (reqbody) => {
    try {
       return await axios.post('http://localhost:3001/user/send-otp',reqbody);
       //console.log(reqbody);
       
        console.log(response.data);
    } catch (error) {
        console.error("Error sending OTP request:", error);
    }
};

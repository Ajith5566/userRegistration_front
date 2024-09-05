import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"
import {adhaarApi} from'./adhaarApi'
import{pincodeApi} from'./pincodeApi'
import {pancardApi } from './panApi'
import {bankApi} from'./bankAPi'
import {gstApi} from './gstApi';
import axios from "axios"


//request to register a user
export default async function registerApi(reqBody) {
    return await commonApi('POST',`${BASE_URL}/user/register`, reqBody)
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

//phone otp sending
export const phoneotp=async(reqbody)=>{
    return await commonApi('POST',`${BASE_URL}/user/phone-otp`,reqbody)
}



//otp verification
export const updateAccout=async(reqbody)=>{
    //console.log(reqbody);
    return await commonApi('PUT',`${BASE_URL}/user/updation`,reqbody)
    
    
}

//phone otp verification

export const updateAccout1=async(reqbody)=>{
   return await commonApi('PUT',`${BASE_URL}/user/phoneUpdation`,reqbody);
}

//pancard verification
export async function panverify(reqBody) {
    console.log('PAN verification request body:', reqBody);
    return await pancardApi('POST',reqBody); // Wrapping reqBody in an object
}

//bank account vrification

export async function bankverify(reqbody){
    console.log('bank verification requst body',reqbody);
    return await bankApi('POST')
    
}
//gst verification
export async function gstverify(reqbody){
    console.log("bank verification",reqbody);
    return await gstApi('POST')
    
}
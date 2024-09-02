"use client"
import React, { useState } from 'react' 
import { aadhaarVerify, pincodeVerify } from '../services/allApi';
import styles from '../dashboard/verification.module.css'
function Dashboard() {
  
  //useState for store aadhaa
  const [userData, setUserData] = useState({
    aadhaar:""  
  });
  console.log(userData);
  /* usestate to store pincode */
  const [pincode, setPincodeData] = useState({
     zipcode:""  
  });
  /* to store place names */
  console.log(pincode);
  const [names, setNames] = useState([]);

  /* to store district */
  const[district,setDistrict]=useState([]);
  /* to store state */
  const [state,setState]=useState([]);
  /* to store country */
  const [country,setCountry]=useState([]);

  //function to verify aadhaar
 const handleVerify=async(e:any)=>{
  e.preventDefault();

  const {aadhaar}=userData;
  /* console.log(userData); */
  
  if(!aadhaar){
    alert('fil form completly')
  }
  else{
    const result= await aadhaarVerify(userData);
    console.log(result);
    
  }
 }
 
 //function to fetch details using pincode
 const handlepincode=async(e:any)=>{
  e.preventDefault();
  const {zipcode} =pincode;
  console.log(pincode);
  
  if(!zipcode){
    alert('fil form completly')
  }
  else{
    const result= await pincodeVerify(pincode.zipcode);
    console.log(result);
    //checking status
    if(result.data[0].Status=='Success'){
      //fetching place names
      const names:any = [];
    result.data[0].PostOffice.forEach((office:any) => {
    names.push(office.Name,',');
    console.log(names); 
      });
   setNames(names);  


   //fetching district name
   const district:any=[];
    result.data[0].PostOffice.forEach((office:any) => {
      district.push(office.District,',');
      console.log(district);
    }); 
    setDistrict(district);

    //fetching state name
    const state:any=[];
    result.data[0].PostOffice.forEach((office:any) => {
      state.push(office.Circle,',');
      console.log(state);
    }); 
    setState(state);

    //fetching country name
    const country:any=[];
    result.data[0].PostOffice.forEach((office:any) => {
      country.push(office.Country,',');
      console.log(country);
    }); 
    setCountry(country);

    /* const response= await fetch('https://api.postalpincode.in/pincode/685605');
      response.json().then((country)=>{
        console.log(country);
    }); */
    }
    else{
      alert('error');
    }
    
  }
 }


  return (
    <>
      <section id={styles.register_sec}>
        <div id={styles.register_div}>
          <input type="text" placeholder='enter adhaar number' className={styles.input} onChange={(e) =>setUserData({ ...userData, aadhaar: e.target.value }) }/>
          <button type='button'className={styles.button_style}  onClick={handleVerify}>verify</button>
          <input type="text" placeholder='enter pincode'  className={styles.input} onChange={(e) =>setPincodeData({ ...pincode, zipcode: e.target.value }) }/>
          <button type='button'className={styles.button_style}  onClick={handlepincode}>Fetch data</button>
        </div>
        <div>
          <p>Place:{names}</p>
          <p>District:{district[0]}</p>
          <p>State:{state[0]}</p>
          <p>Country:{country[0]}</p>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
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
   console.log(pincode);

  const [errors, setErrors] = useState<any>({
    aadhaar: "",
    zipocde:""
  });

  /* error validation function */
  const validate = () => {
    let valid = true;
    const newErrors = {
      aadhaar:"",
      zipcode:""
    }
    if (!userData.aadhaar) {
      newErrors.aadhaar = "aadhaar number is required";
      valid = false;
    } else if (!/^\d{12}$/.test(userData.aadhaar)) {
      newErrors.aadhaar = "aadhaar number must be 12 digits";
      valid = false;
   };
   if (!pincode.zipcode) {
    newErrors.zipcode = "pincode number is required";
    valid = false;
  } else if (!/^\d{6}$/.test(pincode.zipcode)) {
    newErrors.zipcode = "Pincode number must be 6 digits";
    valid = false;
  }
  setErrors(newErrors);
    return valid;
}



  /* to store place names */
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
  

  if(validate()){
    const result= await aadhaarVerify(userData);
    if(result.status==200)
    {
      alert(result.data.data);
    }
    
  }
 }
 
 //function to fetch details using pincode
 const handlepincode=async(e:any)=>{
  e.preventDefault();
  const {zipcode} =pincode;
  console.log(pincode);
  
  
  if(validate()){
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
          <div className={styles.box}>
            {/* adhaar */}
            <input type="text" placeholder='enter adhaar number' className={styles.input} onChange={(e) =>setUserData({ ...userData, aadhaar: e.target.value }) }/>
            {errors.aadhaar && <span style={{color:'#AA0000'}} className={styles.error}>{errors.aadhaar}</span>}
          </div>
          <button type='button'className={styles.button_style}  onClick={handleVerify}>verify</button>
          {/* pincode */}
         <div className={styles.box}>
            <input type="text" placeholder='enter pincode'  className={styles.input} onChange={(e) =>setPincodeData({ ...pincode, zipcode: e.target.value }) }/>
            {errors.zipcode && <span style={{color:'#AA0000'}} className={styles.error}>{errors.zipcode}</span>}
          </div>
          <button type='button'className={styles.button_style}  onClick={handlepincode}>Fetch data</button>
        </div>
        <div id={styles.location}>
          <p><span>Place:</span>{names}</p>
          <p><span>District:</span>{district[0]}</p>
          <p><span>State:</span>{state[0]}</p>
          <p><span>Country:</span>{country[0]}</p>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
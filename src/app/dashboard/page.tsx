"use client"
import React, { useState } from 'react' 
import { aadhaarVerify, bankverify, gstverify, panverify, pincodeVerify } from '../services/allApi';
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
   /* to store pan */
   const [pan,setPan]=useState({
    pan_number:""
   });
   console.log(pan);
   //to srtore bank details
   const [bank,setBank]=useState({
    bank_number:"",
    ifsc:""
   })
   console.log(bank);
   //gst number
   const [gst,setGst]=useState({
    gst_number:""
   })
   

  const [errors, setErrors] = useState<any>({
    aadhaar: "",
    
  });
  const[error2,setError2]=useState<any>({
    zipocde:""
  })

  /* error validation function */
  const validate = () => {
    let valid = true;
    const newErrors = {
      aadhaar:"",
    }
    if (!userData.aadhaar) {
      newErrors.aadhaar = "aadhaar number is required";
      valid = false;
    } else if (!/^\d{12}$/.test(userData.aadhaar)) {
      newErrors.aadhaar = "aadhaar number must be 12 digits";
      valid = false;
   };
   
  setErrors(newErrors);
    return valid;
 }
  const validate1=()=>{
    let valid = true;
    const newErrors = {
      zipcode:""
    }
    if (!pincode.zipcode) {
      newErrors.zipcode = "pincode number is required";
      valid = false;
    } else if (!/^\d{6}$/.test(pincode.zipcode)) {
      newErrors.zipcode = "Pincode number must be 6 digits";
      valid = false;
    }
    setError2(newErrors);
      return valid

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
  
  
  if(validate1()){
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
      alert('enter a valid pincode');
    }
    
  }
 }
//function to verify pan number
const handlepan = async (e: any) => {
  e.preventDefault();
  
  // Ensure the pan_number is in uppercase and is a string
  let pan_number = pan.pan_number?.toUpperCase(); // Convert to uppercase

  if (typeof pan_number !== 'string' || pan_number.trim() === '') {
    console.error('Invalid PAN number format');
    // Handle invalid PAN number format (e.g., show an error message)
    return;
  }

  try {
    // Pass the uppercase PAN number to the panverify function
    const result = await panverify(pan_number);
    console.log('PAN Verification Result:', result.data);
    
    // Handle the result (e.g., show a success message, update UI, etc.)
    if (result.status === 200) {
      alert('PAN verification successful!');
      // Update the UI or state as needed
    } else {
      alert('PAN verification failed.');
    }

  } catch (error: any) {
    console.error('PAN Verification Failed:', error.message);
    alert('An error occurred during PAN verification. Please try again later.');
    // Handle the error (e.g., show an error message, etc.)
  }
};
//bank
const handlebank =async(e:any)=>{
  e.preventDefault();
  const {bank_number,ifsc}=bank;
  console.log(bank);
  

 /*  const result = await bankverify();
  console.log(result); */
  
}

//gst
const handlegst =async(e:any)=>{
  e.preventDefault();

  const result=await gstverify();
  console.log(result);
  
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
          <button type='button'className={styles.button_style}  onClick={handleVerify}>validate</button>

          {/* pincode */}
         <div className={styles.box}>
            <input type="text" placeholder='enter pincode'  className={styles.input} onChange={(e) =>setPincodeData({ ...pincode, zipcode: e.target.value }) }/>
            {error2.zipcode && <span style={{color:'#AA0000'}} className={styles.error}>{error2.zipcode}</span>}
          </div>
          <button type='button'className={styles.button_style}  onClick={handlepincode}>Fetch data</button>

          {/* pan verification */}
          <div className={styles.box}>
            <input type="text" placeholder='enter pan '  className={styles.input} onChange={(e) =>setPan({ ...pan, pan_number: e.target.value }) }/>        
          </div>
          <button type='button'className={styles.button_style}  onClick={handlepan}>validate</button>

          {/* bank details */}
          <div className={styles.box}>
            <input type="text" placeholder='enter bank number '  className={styles.input} onChange={(e) =>setBank({ ...bank, bank_number: e.target.value }) }/> 
            <input type="text" placeholder='enter bank ifsc code'  className={styles.input} onChange={(e) =>setBank({ ...bank, ifsc: e.target.value }) }/>        
          </div>
          <button type='button'className={styles.button_style}  onClick={handlebank}>validate</button>

            {/* gst */}
          <div className={styles.box}>
              <input type="text" placeholder='enter gst number'  className={styles.input} onChange={(e) =>setGst({ ...gst, gst_number: e.target.value }) }/>        
          </div>
            <button type='button'className={styles.button_style}  onClick={handlegst}>validate</button>
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
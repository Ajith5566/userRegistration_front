"use client"
import React, { useState } from 'react'
import styles from './register.module.css'
import Link from 'next/link'
import registerApi from '../services/allApi'
import { useRouter } from 'next/navigation'
function Registration() {
  /* navigation */
  const router = useRouter()
  //state to store data ,take data from the input boxes
  const [userData, setUserData] = useState({
    username: "",
    phone_number:"",
    email: "",
    dob:"",
    password: "",
    verification:"false",
    phone_verification:"false",
    
  });
  /* to store error */
  console.log(userData);
  const [errors, setErrors] = useState({
    username: "",
    phone_number: "",
    email: "",
    dob: "",
    password: ""
  });

  

  const validate = () => {
    let valid = true;
    const newErrors = {
      username: "",
      phone_number: "",
      email: "",
      dob: "",
      password: ""
    };

    if (!userData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }
    if (!userData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(userData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
      valid = false;
    }
    if (!userData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!userData.dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    }
    if (!userData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };



  //function to register a user
  const handleRegister=async(e:any)=>{
    /* to prevent data loss */
    e.preventDefault();
    const { username,phone_number,email,dob,password } = userData;
      if (validate()) {
        // If form is valid, make the API call
        const result = await registerApi(userData);
        console.log(result);
        if(result.status==200){
          alert('registration successfull');
          setUserData({
            username: "",
            phone_number:"",
            email: "",
            dob:"",
            password: "",
            verification:"",
            phone_verification:""          
          });
          router.push('/otpverification');
        }
        else{
          alert(result.response.data);
          
        }
      }


  }
  
  return (
    <>
      <section id={styles.form_secton}>
        <div id={styles.form_div}>
          <h2>Register Now</h2>
          <form action="" id={styles.form_tag}>
            <div className={styles.iput_div}>
              <input type="text" placeholder='name' name="" value={userData.username} id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, username: e.target.value }) } />
              {errors.username && <span style={{color:'#AA0000'}} className={styles.error}>{errors.username}</span>}
            </div>
           
            <div className={styles.iput_div}> 
              <input type="text" placeholder='phone_number' value={userData.phone_number} name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, phone_number: e.target.value }) } />
              {errors.phone_number && <span style={{color:'#AA0000'}} className={styles.error}>{errors.phone_number}</span>}
            </div>

            <div className={styles.iput_div}> 
              <input type="text" placeholder='email' name="" value={userData.email} id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, email: e.target.value }) }  />
              {errors.email && <span style={{color:'#AA0000'}} className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.iput_div}>
              <label className={styles.label}>D.O.B:
                <input type="date"name=""id="" style={{width:'80%',marginTop:'0px'}} value={userData.dob}  className={styles.input} onChange={(e) =>setUserData({ ...userData, dob: e.target.value }) } />
              </label>
              {errors.dob && <span style={{color:'#AA0000'}} className={styles.error}>{errors.dob}</span>}
            </div>

            <div className={styles.iput_div}> 
              <input type="text" placeholder='password' value={userData.password} name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, password: e.target.value }) }  />
              {errors.password && <span style={{color:'#AA0000'}} className={styles.error}>{errors.password}</span>}
            </div>
            <button onClick={handleRegister} type='button' id={styles.button}>Register</button>
            <Link style={{ marginTop: '5px', fontSize: '15px',color:'#FFFFFF' }} href={'login'}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  )
}

export default Registration
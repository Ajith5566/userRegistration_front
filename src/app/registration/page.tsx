"use client"
import React, { useState } from 'react'
import styles from './register.module.css'
import Link from 'next/link'
import registerApi from '../services/allApi'
function Registration() {
  //state to store data ,take data from the input boxes
  const [userData, setUserData] = useState({
    username: "",
    phone_number:"",
    email: "",
    dob:"",
    password: ""
    
  });
  console.log(userData);

  //function to register a user
  const handleRegister=async(e:any)=>{
    /* to prevent data loss */
    e.preventDefault();
    const { username,phone_number,email,dob,password } = userData;
    
    if(!username || !phone_number || !email || !dob || !password)
    {
      alert('please fill the form completly');
    }
    else{
      //api call
      const response = await registerApi(userData);
      console.log(response);
      /* alert('proceded'); */
    }


  }
  
  return (
    <>
      <section id={styles.form_secton}>
        <div id={styles.form_div}>
          <h2>Register Now</h2>
          <form action="" id={styles.form_tag}>
            <input type="text" placeholder='name' name="" value={userData.username} id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, username: e.target.value }) } />
            <input type="text" placeholder='phone_number' value={userData.phone_number} name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, phone_number: e.target.value }) } />
            <input type="text" placeholder='email' name="" value={userData.email} id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, email: e.target.value }) }  />
            <label className={styles.label}>D.O.B:
              <input type="date"name=""id="" style={{width:'80%',marginTop:'0px'}} value={userData.dob}  className={styles.input} onChange={(e) =>setUserData({ ...userData, dob: e.target.value }) } />
            </label>

            <input type="text" placeholder='password' value={userData.password} name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, password: e.target.value }) }  />
            <button onClick={handleRegister} type='button' id={styles.button}>Register</button>
            <Link style={{ marginTop: '5px', fontSize: '15px',color:'#FFFFFF' }} href={'login'}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  )
}

export default Registration
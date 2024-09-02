"use client"
import React, { useState } from 'react'
import styles from './login.module.css'
import Link from 'next/link'
import { loginApi } from '../services/allApi';
import { useRouter } from 'next/navigation';

function Login() {

  const router=useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: ""   
  });

  console.log(userData);
  const handlelogin=async(e:any)=>{
    e.preventDefault();
    const {email,password} =userData;
    if(!email || !password){
      alert('fil form completly')
    }
    else{
      /* api call */
      const result= await loginApi(userData);
      console.log(result);
      if(result.status==200){
        alert('registration successfull');
        setUserData({
          email: "",
          password: "" 
        });
        router.push('/dashboard');
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
                <h2>Login to your account</h2>
                <form action="" id={styles.form_tag}>
                    <input type="text" placeholder='email' name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, email: e.target.value }) }/>
                    <input type="text" placeholder='password'  name="" id="" className={styles.input} onChange={(e) =>setUserData({ ...userData, password: e.target.value }) } />
                    <button onClick={handlelogin} id={styles.button}>Login</button>
                    <Link style={{marginTop:'5px',fontSize:'15px',color:'white'}} href={'registration'}>Register Now</Link>
                </form>
           </div>
        </section>
    </>
  )
}

export default Login
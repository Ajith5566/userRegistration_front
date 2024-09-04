"use client"
import React, { useState } from 'react';
import { sentotp, updateAccout } from '../services/allApi';
import styles from'../otpverification/otp.module.css'
import { useRouter } from 'next/navigation';


function Otp() {
 
  const router = useRouter()
  

  const [email, setEmail] = useState({ Email: "" });
  console.log(email);

  const [otp,setOtp]=useState({
    OTP:""
  });
 console.log(otp);
 const [otpstore,setotpStore]=useState("");
  
 const navigate =useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
        const resposnse = await sentotp({ Email: email.Email }); 
        setotpStore(resposnse)
       console.log(resposnse);
         
  };


  const handleVerify = async (e) => {
    e.preventDefault();
    const {OTP} =otp;
    console.log(otp.OTP);
    
    let sendotp=otpstore.data.otp;
    console.log(sendotp);
    
    const {Email} =email;
    console.log(email);
    
    
    if(sendotp!== otp.OTP){
      alert('otp is not valid')
    }
    else{
      const result=await updateAccout({Email:email.Email});
      console.log(result);
      if(result.status==200){
        alert('user verified successfully');
        router.push('/login')
      }
      else if(result.status==406){
        alert('user already verified');
        router.push('/login')
      }
      else if(result.status==404)
      {
        alert('user not found')
        
      }
      
    }
    
  }


  return (
    <>
      <section id={styles.sec}>
       <div id={styles.sec_div}>
          <form onSubmit={handleRegister} className={styles.form}>
            <input className={styles.input}
              type="text"
              placeholder='email'
              value={email.Email}
              onChange={(e) => setEmail({ ...email, Email: e.target.value })}
            />
            <button className={styles.sendcodebutton} type="submit">Send Code</button>
          </form>
          {/* otp entering */}
          <form onSubmit={handleVerify} className={styles.form}>
            <input className={styles.input}
              type="text"
              placeholder='enter otp'
              value={otp.OTP}
              onChange={(e) => setOtp({ ...otp, OTP: e.target.value })}
            />
            <button className={styles.sendcodebutton} type="submit">verify otp</button>
          </form>
       </div>
      </section>

    </>
  );
}

export default Otp;



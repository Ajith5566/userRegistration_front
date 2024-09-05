"use client"
import React, { useState } from 'react';
import { phoneotp, sentotp, updateAccout, updateAccout1 } from '../services/allApi';
import styles from'../otpverification/otp.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Otp() {
 
  const router = useRouter()
  //for input disbling
  const [isVerified, setIsVerified] = useState(false);
  const [emailverified,setEmailverified]=useState(false);
  //to store mail id from user
  const [email, setEmail] = useState({ Email: "" });
  console.log(email);

  //to store phone number fro user
  const [phone, setPhone]=useState({phone_number:""});
   console.log(phone);
   //to store email otp from user
  const [otp,setOtp]=useState({
    OTP:""
  });
 console.log(otp);
 //to store phone otp from user
 const [pOtp,setpOtp]=useState({
  phone_opt:""
 });
 console.log(pOtp);
 
// store email response
 const [otpstore,setotpStore]=useState("");
 //store phon otp
 const [pOtpStore,setpOtpStore]=useState("");
//router for navigation
 const navigate =useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
        const resposnse = await sentotp({ Email: email.Email }); 
        setotpStore(resposnse)
       console.log(resposnse);
         
  };

  const handlePhone=async(e)=>{
    e.preventDefault();
    const response=await phoneotp({phone_number:phone.phone_number});
    setpOtpStore(response);
    console.log(response);
    
  }

//verify email id
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
        setEmail({
          Email: ""
        });
        setOtp({
           OTP:""
        });
        setEmailverified(true);
      }
      else if(result.status==406){
        alert('user already verified');
        setEmail({
          Email: ""
        });
        setOtp({
           OTP:""
        });
        setEmailverified(true);
      }
      else if(result.status==404)
      {
        alert('user not found')
        
      }
      
    }
    
  }
//verify phone number
const handlePverify=async(e)=>{
  e.preventDefault();
  const {phone_opt}=pOtp;
  console.log(pOtp.phone_opt);

  let sendotp=pOtpStore.data.otp;
    console.log(sendotp);
    if(sendotp!= pOtp.phone_opt){
      alert('otp is not valid')
    }
    else{
      const result=await updateAccout1({phone_number:phone.phone_number});
      console.log(result);
      if(result.status==200){
        alert('user verified successfully');
        setPhone({
          phone_number:""
        })
        setpOtp({
          phone_opt:""
        })

        setIsVerified(true); // Disable the input field
      }
      else if(result.status==406){
        alert('user already verified');
        setPhone({
          phone_number:""
        })
        
        setpOtp({
          phone_opt:""
        })
        setIsVerified(true); // Disable the input field
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
              disabled={emailverified}
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
              disabled={emailverified}
              onChange={(e) => setOtp({ ...otp, OTP: e.target.value })}
            />
            <button className={styles.sendcodebutton} type="submit">verify otp</button>
          </form>
          {/* otp to phone */}
          <form onSubmit={handlePhone}  className={styles.form}>
            <input className={styles.input}
              type="text"
              placeholder='phonenumber'
              value={phone.phone_number}
              disabled={isVerified}
              onChange={(e) => setPhone({ ...phone, phone_number: e.target.value })}
            />
            <button className={styles.sendcodebutton} type="submit">Send Code</button>
          </form>
          {/* verify phone */}
          <form onSubmit={handlePverify}  className={styles.form}>
            <input className={styles.input}
              type="text"
              placeholder='enter phone number otp'
              value={pOtp.phone_opt}
              disabled={isVerified}
              onChange={(e) => setpOtp({ ...pOtp, phone_opt: e.target.value })}
            />
            <button className={styles.sendcodebutton} type="submit">verify otp</button>
          </form>
          <Link style={{ marginTop: '10px', fontSize: '15px',color:'#FFFFFF' }} href={'login'}>Login Now</Link>
       </div>
      
      </section>

    </>
  );
}

export default Otp;



"use client"
import React, { useState } from 'react';
import { sentotp } from '../services/allApi';



function Otp() {
  const [email, setEmail] = useState({ Email: "" });
 
  console.log(email);
  

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await sentotp({ Email: email.Email });
      console.log(result);
      
      
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder='email'
          value={email.Email}
          onChange={(e) => setEmail({ ...email, Email: e.target.value })}
        />
        <button id="send-code-button" type="submit">Send Code</button>
      </form>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default Otp;



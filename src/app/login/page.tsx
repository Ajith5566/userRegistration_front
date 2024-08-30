import React from 'react'
import styles from './login.module.css'
import Link from 'next/link'

function Login() {
  return (
    <>
        <section id={styles.form_secton}>
           <div id={styles.form_div}>
                <h2>Login to your account</h2>
                <form action="" id={styles.form_tag}>
                    <input type="text" placeholder='email' name="" id="" className={styles.input}/>
                    <input type="text" placeholder='password'  name="" id="" className={styles.input} />
                    <button id={styles.button}>Login</button>
                    <Link style={{marginTop:'5px',fontSize:'15px',color:'white'}} href={'registration'}>Register Now</Link>
                </form>
           </div>
        </section>
    </>
  )
}

export default Login
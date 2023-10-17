import React from 'react'
import styles from "./contactUs.module.css"
import { Button, TextField } from '@mui/material'
import {LoadingButton} from "@mui/lab"
import { db } from "../../db"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify";
import Head from 'next/head'
const ContactUs = () => {
  const [name, setName] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>("")
  const [nameError, setNameError] = React.useState<{ [key: string]: string | null | boolean }>({ error: false, message: "" });
  const [emailError, setEmailError] = React.useState<{ [key: string]: string | null | boolean }>({ error: false, message: "" })
  const [messageError, setMessageError] = React.useState<{ [key: string]: string | null | boolean }>({ error: false, message: "" })
  const [loading, setLoading] = React.useState<boolean>(false)
  const validateForm = ()=>{
    let valid =false
    if (name.length < 3) {
      setNameError({ error: true, message: "Too short name" })
      valid = false
   } else {
      setNameError({ error: false, message: null })
      valid = true
   }
   if (!new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/).test(email)) {
      setEmailError({ error: true, message: "Invalid Email" })
      valid = false
   } else {
      setEmailError({ error: false, message: null })
      valid = true
   }
   if (message.length < 10) {
       setMessageError({ error: true, message: "Too short message" })
       valid = false
   } else {
        setMessageError({ error: false, message: null })
        valid = true
   }
   return valid;
  }

  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) {
      const ContactsDB = collection(db, "contacts")
      setLoading(true)
      addDoc(ContactsDB, { name: name, email: email, message: message }).then((done) => {
        setLoading(false)
        setName("")
        setEmail("")
        setMessage("")
        toast.success("Message sent successfully")
      })
    }
  }
  return (
    <div>
      <Head>
        <meta charSet='UTF-8' />
        <meta name="author" content="Invitation.io"></meta>
        <meta property="og:title" content="Contact Us - Invitation.io" key="title" />
        <meta name="description" content="Contact Us"></meta>
        <meta name="robots" content="index, follow"></meta>
        <title>Contact Us - Invitation.io</title>
      </Head>
      <div className={styles.heading}><h1>Contact Us</h1></div>
      <div className={styles.contactDiv}>
        <p>Did you know that dolphins sleep with one eye open? Your message won&apos;t go unnoticed either!</p>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <TextField required error={nameError.error === true ? true : false} helperText={nameError.message} label="Name" value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}></TextField>
          <TextField required error={emailError.error === true ? true : false} helperText={emailError.message} label="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value.trim().toLowerCase()) }}></TextField>
          <TextField required error={messageError.error === true ? true : false} helperText={messageError.message} label="Message" value={message} multiline rows={4} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMessage(event.target.value) }}></TextField>
          <LoadingButton loading={loading} type='submit' variant='outlined'>Contact Now</LoadingButton>
        </form>
        <p>Alternatively you can also contact us on:<a style={{color:"#486BBC"}} href="mailto:info.luxecards@gmail.com">info.luxecards@gmail.com</a></p>
      </div>
    </div>
  )
}

export default ContactUs

import {
  ContactContainer,
  ContactForm,
  FormInput,
  FormArea,
  SubmitForm,
} from "./Contact.styles";
import React, {useState} from "react"
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

const Contact = ({ lang }) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  })

  const sendEmail = (e) => {
    e.preventDefault()

    if(user.name ===''| user.email ===''| user.message ===''){
      toast.error("Preencha todos os campos!")
      return
    }

    const templateParams = {
      from_name: user.name,
      message: user.message,
      email: user.email
    }

    emailjs.send('service_2ym8t6p', 'template_ngmaux4', templateParams, 'p-NhBYy89o5fjyjqm')
    .then((res) => {
      toast.success(lang ? 'Mensagem enviada!' : "Message sent!")
      setUser({
        name: "",
        email: "",
        message: "",
      })
    }, (err) => {
      err && toast.error(lang ? "Aconteceu um erro. Tente mais tarde." : "An error has occurred. Try again later.")
    })
  }

  return (
    <ContactContainer>
      <ContactForm onSubmit={sendEmail} data-aos={"zoom-in"} data-aos-duration={"1500"}>
        <FormInput
          className='input'
          type='text'
          placeholder={lang ? "Nome" : "Name"}
          onChange={(e) => setUser((prev) => ({...prev, name: e.target.value }))}
          value={user.name} 
        />
        <FormInput
          className='input'
          type='text'
          placeholder='E-mail'
          onChange={(e) => setUser((prev) => ({...prev, email: e.target.value }))}
          value={user.email} 
        />
        <FormArea
          className='textarea'
          placeholder={lang ? "Digite sua mensagem..." : "Type your message..."}
          onChange={(e) => setUser((prev) => ({ ...prev, message: e.target.value }))}
          value={user.message} 
        />
        <SubmitForm className='submit-btn' type='submit' >
          {lang ? "Enviar" : "Send"}
        </SubmitForm>
      </ContactForm>
    </ContactContainer>
  )
}

export default Contact
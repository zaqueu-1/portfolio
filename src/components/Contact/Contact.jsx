
import {
  ContactContainer,
  ContactTitle,
  ContactForm,
  FormInput,
  FormArea,
  SubmitForm,
} from "./Contact.styles";
import { RiContactsLine } from "react-icons/ri"
import React, {useState} from "react"
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

const Contact = ({ lang }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()

    if(name===''| email===''| message===''){
      toast.error("Preencha todos os campos!")
      return
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email
    }

    emailjs.send('service_2ym8t6p', 'template_ngmaux4', templateParams, 'p-NhBYy89o5fjyjqm')
    .then((res) => {
      toast.success('Mensagem enviada!')
      setName('')
      setEmail('')
      setMessage('')
    }, (err) => {
      //console.log('Erro: ', err)
    })
  }

  return (
    <ContactContainer>
      <ContactTitle data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <RiContactsLine style={{ fontSize: "1.8rem" }}/>
          {lang 
            ? "Contato" 
            : "Get in touch"}
      </ContactTitle>
      <ContactForm onSubmit={sendEmail} data-aos={"zoom-in"} data-aos-duration={"1500"}>
        <FormInput
          className='input'
          type='text'
          placeholder={lang ? "Nome" : "Name"}
          onChange={(e) => setName(e.target.value)}
          value={name} 
        />
        <FormInput
          className='input'
          type='text'
          placeholder='E-mail'
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
        />
        <FormArea
          className='textarea'
          placeholder={lang ? "Digite sua mensagem..." : "Type your message..."}
          onChange={(e) => setMessage(e.target.value)}
          value={message} 
        />
        <SubmitForm className='submit-btn' type='submit' >
          {lang ? "Enviar" : "Send"}
        </SubmitForm>
      </ContactForm>
    </ContactContainer>
  )
}

export default Contact
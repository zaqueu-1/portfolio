
import {
  ContactContainer,
  ContactTitle,
  SocialContainer,
  ContactWrapper,
  ContactSpan,
  ExternalLink,
  ContactForm,
  FormInput,
  FormArea,
  SubmitForm,
} from "./Contact.styles";
import { FaLinkedinIn } from "react-icons/fa"
import { FiGithub } from "react-icons/fi"
import { BsInstagram } from 'react-icons/bs'
import { RiContactsLine, RiDiscordFill } from "react-icons/ri"
import ReactTooltip from "react-tooltip"
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
      console.log('Erro: ', err)
    })
  }

  return (
    <ContactContainer>
      <ReactTooltip />
      <div data-aos={"zoom-in"} style={{display:'flex', flexDirection:'column', alignItems:'center'}} data-aos-duration={"1200"}>
        <ContactTitle>
          <RiContactsLine style={{ fontSize: "1.8rem" }}/>
            {lang 
              ? "Contato" 
              : "Get in touch"}
        </ContactTitle>
      </div>
      <div data-aos={"zoom-in"} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}} data-aos-duration={"1500"}>
        <ContactForm onSubmit={sendEmail}>
          <FormInput
            className='input'
            type='text'
            placeholder='Digite seu nome'
            onChange={(e) => setName(e.target.value)}
            value={name} 
          />
          <FormInput
            className='input'
            type='text'
            placeholder='Digite seu email'
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
          />
          <FormArea
            className='textarea'
            placeholder='Digite sua mensagem...'
            onChange={(e) => setMessage(e.target.value)}
            value={message} 
          />
          <SubmitForm className='submit-btn' type='submit' >Enviar</SubmitForm>
        </ContactForm>
        <SocialContainer>
          <ContactWrapper>
            <ExternalLink
              data-tip="Github"
              href="https://github.com/zaqueu-1"
              target="_blank">
          <FiGithub />
            <ContactSpan>
              {'GitHub'}
            </ContactSpan>
            </ExternalLink>
            <ExternalLink
              data-tip="LinkedIn"
              href="https://linkedin.com/in/zaqueu1"
              target="_blank">
          <FaLinkedinIn />
            <ContactSpan>
              {'LinkedIn'}
            </ContactSpan>
            </ExternalLink>
            <ExternalLink
              data-tip="Discord"
              href="https://discordapp.com/users/856969236684603422"
              target="_blank">
          <RiDiscordFill />
            <ContactSpan>
                {'Discord'}
            </ContactSpan>
            </ExternalLink>
            <ExternalLink
              data-tip="Instagram"
              href="https://instagram.com/zaqueu.tech"
              target="_blank">
          <BsInstagram />
            <ContactSpan>
                {'Instagram'}
            </ContactSpan>
            </ExternalLink>
          </ContactWrapper> 
        </SocialContainer>
      </div>
    </ContactContainer>
  )
}

export default Contact
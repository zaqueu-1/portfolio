import React from "react"

const Avatar = () => {
  return (
      <img class="avatar" 
        style={{borderRadius: '8%'}} 
        src={ require("../../img/avatarzin.jpg")} 
        alt="Eduardo Zaqueu" 
        width='100%' 
        height='100%'
      />
  )
}

export default Avatar
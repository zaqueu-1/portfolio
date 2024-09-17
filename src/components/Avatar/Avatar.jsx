import React from "react"

const Avatar = () => {
  return (
      <img class="avatar" 
        style={{borderRadius: '8%'}} 
        src={ require("../../img/avatarzin.jpg")} 
        alt="Eduardo Zaqueu" 
        width='85%' 
        height='85%'
      />
  )
}

export default Avatar
import React from "react";

const Avatar = () => {
  return (
      <img class="avatar" 
        style={{borderRadius: '50%', animation:'float 3s infinite' }} 
        src={ require("../../img/avatarzin.png")} 
        alt="Eduardo Zaqueu" 
        width='70%' 
        height='70%'
      />

  );
};

export default Avatar;
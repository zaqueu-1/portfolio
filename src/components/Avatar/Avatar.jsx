import React from "react";

const Avatar = () => {
  return (
    <img class="avatar" style={{borderRadius: '5%', filter: 'drop-shadow(-6px 6px 0px #757666)' }} src={ require("../../img/avatarzin.png")} alt="Eduardo Zaqueu" width='80%' height='80%'/>
  );
};

export default Avatar;
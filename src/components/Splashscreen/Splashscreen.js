import React from 'react';
import './../../App.scss';
import './splashscreen.scss';
import logoGitCat from './../../assets/github-logo.png'

const Splashscreen = (context) => {
  window.setTimeout( () => {
        context.history.push({pathname: '/repositories'})},3000)

  return (
         <div className="Splashscreen">
            <img src={logoGitCat} width={360} className="Logo-GitCat" alt="logoGitCat" />
            <h1>Welcome to Github App!</h1>
         </div>)
    
}
export default Splashscreen;
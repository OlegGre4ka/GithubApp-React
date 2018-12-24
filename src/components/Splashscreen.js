import React from 'react';
import '../App.scss';
import './splashscreen.scss';
import logoGitCat from '../assets/github-logo.png'
class Splashscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { splashscreen: true };
  }
  componentDidMount() {
    console.log("componentDidMount()");
    setTimeout(() => {
      this.setState({ splashscreen: false });
    }, 3000);
  }
  render() {
    return (
    this.state.splashscreen && (
     <div className="Splashscreen">
        <img src={logoGitCat} width={360} className="Logo-GitCat" alt="logoGitCat" />
        <h1>Welcome to Github App!</h1>
     </div>)
    );
  }
}

export default Splashscreen;
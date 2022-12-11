import React from 'react'; 
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';
import Particles from 'react-particles-js';
import Portfolio from './components/Portfolios/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';



/* ---------------------- Floating particles background --------------------- */
const particlesParameters = {                           
  particles: {
    number: {
      value: 110,
      density: {
        enable: true,
        value_area: 700
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  }
}


/* --------------------- Start to app - class compnents --------------------- */
class App extends React.Component {                     
  constructor(){
    super();
    this.state = {                                            // ---- State ----
      portfolios: [],
      route: 'signin',                                         // landing page is signin page
    }
  }
  
  /* --------------- Get login credentials from MongoDB database -------------- */
  GetLoginDataDB = () => {
    fetch("http://localhost:9000/cardData")
      .then(rawData => rawData.json())                            // parses the json data to JS object
      .then(data => this.setState({portfolios: data}))
      .catch(error => console.log("Error occured", error));
  }

  onRouteChange = (routeValue) => {
    this.setState({route: routeValue})
  }

  /* ----------------------- Once the component is initialized and rendered ---------------------- */
  componentWillMount(){
    this.GetLoginDataDB();
  }

  /* ----------------------------- Render the View ---------------------------- */
  render() {
    return (
        <div className="tc">
          <Particles className='particles' params={particlesParameters} />
          {this.state.route === 'signin'
            ? <>
                <Form onRouteChange={this.onRouteChange}/>
                <Logo />
              </>
            : <>
                { this.state.route === 'guest' ?
                  <>
                    <Navigation onRouteChange={this.onRouteChange}/>
                    <Logo />
                    {/* changes made by asif */}
                    <div className='container'>
                      <div className="row portfolio-container">
                        {this.state.portfolios.map((item,index) => <Portfolio key={index} person={item} />)}
                      </div>
                    </div>
                  </>
                  : <>
                    { this.state.route === 'contact' ?
                      <>
                        <Navigation onRouteChange={this.onRouteChange}/>
                        <Logo />
                        <div className="row portfolio-container">
                            <Contact/>
                        </div>
                      </>
                    : <>
                        <Navigation onRouteChange={this.onRouteChange}/>
                        <Logo />
                        <div className="row portfolio-container">
                            <About/>
                        </div>
                      </>
                    }
                  </>
                }
              </>
          }
        </div>
    );
  }
}

export default App;

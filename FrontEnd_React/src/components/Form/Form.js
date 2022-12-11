import { Component } from 'react';
import './Form.css';

class form extends Component {

    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            email: "",
            password: "",
            // Data from parent
            RouteChange: this.props.onRouteChange
        }
    }

    componentDidMount(){
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");

        signUpButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });
    }

    /* -------------------------------------------------------------------------- */
    /*             SignUp - Method sends the form-data to the database            */
    /* -------------------------------------------------------------------------- */
    sendFormData = (event) => {
        event.preventDefault();                                     // prevent the default action of submit occuring in form
        const {fullName, email, password} = this.state;
        fetch("http://localhost:9000/registerUser", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                alert(`${data.error}`);
            }
            else{
                alert(`${fullName}, you have been successfully signed up!`);
                // eslint-disable-next-line no-undef
                this.state.RouteChange('home');
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*             SignIn - Method sends the form-data to the database            */
    /* -------------------------------------------------------------------------- */

    checkSignInData = (event) => {
        event.preventDefault();                                     // prevent the default action of submit occuring in form
        const { email, password} = this.state;

        fetch("http://localhost:9000/logInUser", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                alert(`${data.error}`);
            }
            else{
                alert("Logged in successfully!");
                // eslint-disable-next-line no-undef
                this.state.RouteChange('home');
            }
        });
    }

    render(){
        const {RouteChange} = this.state;
        return (
            <div className='main_container'>
            <div className="container-m" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={this.sendFormData}>
                        <h1>Create Account</h1>
                        
                        <input type="text" placeholder="Name" onChange={event => this.setState({fullName: event.target.value})}/>
                        <br/>
                        <input type="email" placeholder="Email" onChange={event => this.setState({email: event.target.value})}/>
                        <br/>
                        <input type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>
                        <br/>
                        <button type="submit" 
                            // onClick={() => RouteChange('home')}
                            >
                        Sign Up
                        </button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={this.checkSignInData}>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" onChange={event => this.setState({email: event.target.value})} />
                        <br/>
                        <input type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})} />
                        <br/>
                        <button 
                            type="submit" 
                            // onClick={() => RouteChange('home')}
                            >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>If you already have an account:</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hey there!</h1>
                            <p>Don't have an account? No probs: </p>
                            <button className="ghost" id="signUp">Sign Up</button>
                            <br/><br/>
                            <hr/>
                            <br/>
                            <p>Skip the sign-in if you'd just like to try out the app.</p>
                            <button onClick={() => RouteChange('guest')} className="ghost">Guest</button>
                            
                            <hr/>
                            <div className='cstm-btn d-flex'>
                                <button className="mt-4 ghost" onClick={() => RouteChange('about')}>About</button>
                                <button className="mt-4 ghost" onClick={() => RouteChange('contact')}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default form;
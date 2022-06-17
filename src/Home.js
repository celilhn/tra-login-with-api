import React,{Component} from 'react';
import {Navigation} from './Navigation';



export class Home extends Component{

         constructor(props) {
         super(props);
         this.state = {value: '', resultMessage: '', email:'', password:'', hiddenn: true, aauthorize: false, jwt: ''};
    
         this.handleEmailChange = this.handleEmailChange.bind(this);
         this.handlePasswordChange = this.handlePasswordChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
       }
    
       handleEmailChange(event) {
        this.setState({email: event.target.value});
       }
    
       handlePasswordChange(event) {
        this.setState({password: event.target.value});
       }

       handleSubmit(event) {
        var authenticationHeaders = new Headers();
        authenticationHeaders.append("Content-Type", "application/json");
        authenticationHeaders.append("Accept", "application/json");

        var raw = JSON.stringify({
            "email": (this.state.email).toString(),
            "password": (this.state.password).toString()
        });

        var authenticationRequestOptions = {
            mode: 'no-cors',
            method: 'POST',
            redirect: 'follow'
        };

        var loginHeaders = new Headers();
        loginHeaders.append("Authorization", this.state.jwt);

        var loginRequestOptions = {
            mode: 'no-cors',
            method: 'POST',
            headers: loginHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:44324/api/User/Authentication?email=" + this.state.email +"&password=" + this.state.password , authenticationRequestOptions)
        .then(response => response.json())
        .then(data => console.log(data.value))
        .then(data => this.setState({jwt: data}))
        .then(data => console.log(JSON.stringify(data)))
        .then(
            fetch("https://localhost:44324/api/User/Login?email=" + this.state.email +"&password=" + this.state.password, loginRequestOptions)
            .then(result => console.log(result))
            .then(data => this.setState({aauthorize: true}))
            .catch(error => this.setState({hiddenn: false, resultMessage: "!INCORRECT ENTRY"}))
            )
            .catch(error => this.setState({hiddenn: false, resultMessage: "!INCORRECT ENTRY"}));

         event.preventDefault();
       }

    render(){
        const hiddenn = this.state.hiddenn
        let html;
        if(hiddenn){
            html = <p className="alert alert-info" hidden>{this.state.resultMessage}</p>
        }
        else{
            html = <p className="alert alert-" >{this.state.resultMessage}</p>
        }
        return(
            <div className="card">
                 <h4 className="card-header"> Login </h4>
                 <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                         {html}
                         <div className="form-group">
                             <label htmlFor="name">Email</label>
                             <input type="text" name="email" id="email" placeholder="Enter email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
                         </div>
                         <div className="form-group">
                             <label htmlFor="email">Password</label>
                             <input type="text" name="password" id="password" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control"/>
                         </div>
                         <button variant="primary"  type="submit" className="btn btn-danger btn-block">
                            Login
                         </button>
                    </form>
                </div>
            </div>
        )
    }
}
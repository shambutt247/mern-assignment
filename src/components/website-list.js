import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class WebList extends Component {

    constructor(props) {
        super(props);

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todos: null,
            webUrl:'',
            webDetails:[]
        }
    }

    componentDidMount() {

        axios.get('http://localhost:4000/web-links/')
        .then(response => {
            console.log(response.data );
            this.setState({ webDetails: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    onChangeUrl(e) {
        this.setState({
            webUrl: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var webss=this.state.webUrl;
        const webUrl = {
            webUrl:this.state.webUrl
        };
        if(localStorage.getItem(this.state.webUrl) === null ){
            axios.post('http://localhost:4000/websiteData/GetURL', webUrl)
            .then(res => {
                let x=res.data;
                if(x!==null){
                    this.setState({ todos: x});
                    localStorage.setItem(webss, JSON.stringify(x));
                }
                
            });
        }else{
            var retrievedWeb= localStorage.getItem(webss);
            let g=JSON.parse(retrievedWeb);
            let p=parseInt(g["counter"]);
            console.log(p);
            p=p+1;
            g["counter"]=String(p);
            localStorage.setItem(webss, JSON.stringify(g));
            this.setState({ todos: g});
        }
        

            this.setState({
                webUrl:''
            })
        
    }

    render() {
        return (
            <div>
                <h3>Web List</h3>
                <div>
                <div className="form-group">
                        <label>Enter a Valid Website: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.webUrl}
                                onChange={this.onChangeUrl}
                                />
                    </div>
                    <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <input type="submit" value="Retrieve Data" className="btn btn-primary" />
                    </div>
                    </form>
                    {this.state.todos!==null ? (

                        <div>
                            <br/>
                        <h5>Website : {this.state.todos["web_link"] }</h5>
                        <br/>
                        <h5>CSS Link : {this.state.todos["web_css_link"] }</h5>
                        <br/>
                        <h5> Javascript : {this.state.todos["web_js_link"] } </h5>
                        <br/>
                        <h4>Counter : {this.state.todos["counter"] }</h4>
                        
                            </div>
                    ):(
                        <div>
                            </div>
                    )}
                

                </div>
            </div>
        )
    }
}
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
        const webUrl = {
            webUrl:this.state.webUrl
        };
        axios.post('http://localhost:4000/websiteData/GetURL', webUrl)
            .then(res => {

                this.setState({ todos: res.data });
            });

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
                        {this.state.todos}
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
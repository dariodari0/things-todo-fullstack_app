import React, {Component} from 'react';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';

const API_URL = '/api/todos';

class ToDoList extends Component {
    constructor (props){
        super(props);
        this.state = {
            thingsToDo: []
        }
        this.addThingToDo = this.addThingToDo.bind(this);
    }

componentWillMount(){
    fetch(API_URL)
    .then(data => data.json())
    .then(thingsToDo => this.setState({thingsToDo}));
}

loadThingsToDo(){
    fetch(API_URL)
    .then(resp => {
     if(!resp.ok){
         if(resp.status >= 400 && resp.status < 500) {
             return resp.json().then(data => {
                 let err = {errMess: data.message};
                 throw err;
             })
         } else {
             let err = "Please try later, server is not responding now. Sorry."
             throw err;
         }
     }
     return resp.json();
    })
    .then(thingsToDo => this.setState({thingsToDo}));
}
addThingToDo(thing){
    fetch(API_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({name: thing})
    })
    .then(resp => {
     if(!resp.ok){
         if(resp.status >= 400 && resp.status < 500) {
             return resp.json().then(data => {
                 let err = {errMess: data.message};
                 throw err;
             })
         } else {
             let err = "Please try later, server is not responding now. Sorry."
             throw err;
         }
     }
     return resp.json();
    })
    .then(newThingToDo => {
        this.setState({thingsToDo: [...this.state.thingsToDo, newThingToDo]});
    });
}
    render(){
        const thingsToDo = this.state.thingsToDo.map((thing) => (
            <ToDoItem
                key= {thing._id}
                {...thing}
            />
        ));
        return (
            <div>
                <header className="header">
                    <h1 className="title"><span>things</span> TO-DO</h1>
                    <h2 className="subtitle">An useful app for remember any task to do.</h2>
                </header>
                <ToDoInput
                   addThingToDo={this.addThingToDo}
                />
                <ul>
                  {thingsToDo}
                </ul>
            </div>
        )
    }
}

export default ToDoList;
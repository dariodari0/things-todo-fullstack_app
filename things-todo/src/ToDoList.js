import React, {Component} from 'react';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';

const API_URL = '/api/todos/';

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
deleteThingToDo(id){
    const delete_Req_URL = API_URL + id;
    fetch(delete_Req_URL, {
        method: 'DELETE',
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
    .then(() => {
        const thingsToDo = this.state.thingsToDo.filter(thing => thing._id !== id)
        this.setState({thingsToDo: thingsToDo});
    });
}

toggleThingTodo(thing){
    const update_Req_URL = API_URL + thing._id;
    fetch(update_Req_URL, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({completed: !thing.completed})
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
    .then(updatedThing => {
        const thingsToDo = this.state.thingsToDo.map(thing => 
        (thing._id === updatedThing._id)
        ? {...thing, completed: !thing.completed}
        : thing
        )
        this.setState({thingsToDo: thingsToDo});    
    });
}
    render(){
        const thingsToDo = this.state.thingsToDo.map((thing) => (
            <ToDoItem
                key= {thing._id}
                {...thing}
                onDelete={this.deleteThingToDo.bind(this, thing._id)}
                onToggle={this.toggleThingTodo.bind(this, thing)}
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
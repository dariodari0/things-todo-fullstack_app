import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';
import * as requestCalls from './api';


class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thingsToDo: []
        }
        this.addThingToDo = this.addThingToDo.bind(this);
    }

    componentWillMount() {
        this.loadThingsToDo();
    }

    async loadThingsToDo() {
        let thingsToDo = await requestCalls.getThingsToDo();
        this.setState({
            thingsToDo
        });
    }

    async addThingToDo(thing) {
        let newThingToDo = await requestCalls.createNewThingToDo(thing);
        this.setState({
            thingsToDo: [...this.state.thingsToDo, newThingToDo]
        });
    }
    async deleteThingToDo(id) {
        await requestCalls.removeThingToDo(id);
        const thingsToDo = this.state.thingsToDo.filter(thing => thing._id !== id)
        this.setState({
            thingsToDo: thingsToDo
        });
    }

    async toggleThingTodo(thing) {
        let updatedThing = await requestCalls.updateThingToDo(thing);
        const thingsToDo = this.state.thingsToDo.map(thing =>
            (thing._id === updatedThing._id) ?
            { ...thing,
                completed: !thing.completed
            } :
            thing
        )
        this.setState({
            thingsToDo: thingsToDo
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
                <header>
                    <h1><span>things</span> TO-DO</h1>
                    <h2>An useful app for remember any task to do.</h2>
                </header>
                <ToDoInput
                   addThingToDo={this.addThingToDo}
                />
                <ul className="list">
                  {thingsToDo}
                </ul>
            </div>
        )
    }
}

export default ToDoList;
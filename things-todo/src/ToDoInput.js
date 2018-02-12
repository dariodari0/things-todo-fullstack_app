import React, { Component } from 'react';

class ToDoInput extends Component {
    constructor(props){
        super(props);
        this.state = {inputValue: 'sometext'};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                />
                <button>Add</button>
            </div>
        )
    }
}

export default ToDoInput;
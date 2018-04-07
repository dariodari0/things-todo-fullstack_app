import React, { Component } from 'react';

class ToDoInput extends Component {
    constructor(props){
        super(props);
        this.state = {
        inputValue: '',
        placeholder: 'Enter your thing to do...'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            inputValue: e.target.value
        });
    }
    handleSubmit(){
        this.props.addThingToDo(this.state.inputValue);
        this.setState({
            inputValue: '',
            placeholder: 'What is your next thing to do...?'
        });
    }

    render() {
        return (
            <div className="form">
                <input 
                    id="todoInput"
                    type="text" 
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" && this.state.inputValue) {
                        this.handleSubmit()
                        }
                    }}
                    placeholder={this.state.placeholder}
                />
                <button 
                    onClick={this.handleSubmit}
                    disabled={!this.state.inputValue}
                >
                Add
                </button>
            </div>
        )
    }
}

export default ToDoInput;
//import React from 'react';
import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props)
        this.state = {value: '', userName: "Default", oldUserName: "Default" }
    }
    render() { 
        const newMessage = (event) => {
            if (event.charCode === 13) {
                this.setState({value: '' })
                if (this.state.userName !== this.state.oldUserName) {
                    this.setState({ oldUserName: this.state.userName})
                    this.props.sendUserName( this.state.userName, this.state.oldUserName);
                
             } 
             this.props.sendMessage(this.state.value, this.state.userName)
            }
        }

        //fucntion to implement notfications   
        const newUser = (event) => {
            if (event.charCode === 13) {
                this.setState({ oldUserName: this.state.userName, userName: event.target.value})

                this.props.sendUserName( this.state.userName, this.state.oldUserName);
                
            }   
        } 

    return (
        <footer className="chatbar">
            <input className="chatbar-username" 
                placeholder="Your Name (Optional)" 
                defaultValue={this.props.user.name}
                onKeyPress={newUser}
                onChange={e => this.setState({userName: e.target.value})} />
            <input 
                className="chatbar-message" 
                type="text" 
                value={this.state.value} 
                placeholder="Type a message and hit ENTER" 
                onKeyPress={newMessage}
                onChange={e => this.setState({value: e.target.value})}/>
        </footer>
        );
    }
}

export default ChatBar;
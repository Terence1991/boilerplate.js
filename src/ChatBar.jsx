//import React from 'react';
import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
    super(props)
    this.state = {value: ''}


}
    render() {

        const newMessage = (event) => {
            if (event.charCode === 13) {
                this.setState({value: '' })
                this.props.sendMessage(this.state.value)
            }
            
        }

        return (
    <footer className="chatbar">
  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} />
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
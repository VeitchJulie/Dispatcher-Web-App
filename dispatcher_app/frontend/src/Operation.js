import React from 'react';
import './styles/Operation.css'
import {setSend} from './actions/operation'
import {connect} from 'react-redux'

class Operation extends React.Component{
    
    state = {
        teamId: this.props.teamId,
    }

    handleClose(){
        this.props.dispatch(setSend({sendTeam: false}))
    }

    render(){
        return (
        <div className='main'> 
            <header className='header'> 
                {this.state.teamId}
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </header>
            <div> 
                
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        teamState: state.teamState
    }
}
  
  export default connect(mapStateToProps)(Operation)
  
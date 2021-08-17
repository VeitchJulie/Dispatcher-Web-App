import React from 'react'
import axios from 'axios'
import './styles/Data.css'
import {connect} from 'react-redux'
import {setLocation} from './actions/location'
import {setSend} from './actions/operation'

// import {downloadTeam} from './actions/teams'

class Data extends React.Component {
    state = {
        teams: [],
        search: '',
        buttonClicked: false,
    }

    componentDidMount() {
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })
    }

    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    handleShowClick(team){
        if(this.state.buttonClicked === false & this.props.location.id === ''){
            this.props.dispatch(setLocation({id: team.top_id, lat: team.lat, long: team.long, state: team.state}))
            this.setState({buttonClicked: true})

        }else if(this.state.buttonClicked === true & this.props.location.id === team.top_id){
            this.props.dispatch(setLocation({id: '', lat: '', long: '', state: ''}))
            this.setState({buttonClicked: false})
        }else{
            this.props.dispatch(setLocation({id: team.top_id, lat: team.lat, long: team.long, state: team.state}))
        }
    }

    handleSendClick(team){
        this.props.dispatch(setLocation({id: team.top_id, lat: team.lat, long: team.long, state: team.state}))
        this.props.dispatch(setSend({sendTeam: true, teamId: team.top_id}))
    }

    render(){
        return(
            <div className='data-table-box'> 
                <form className='search-team-form'>
                    <input name='label-name' type='text' className='search-team' placeholder="Enter team's ID" value={this.state.search} onChange={(e) => this.handleSearch(e)}/>
                    <label htmlFor='label-name' className='label'> Search </label>
                </form>
                <div className = "data-table">
                    {this.state.teams.filter((team) => {
                        if(this.state.search === ''){
                            return team
                        }else if(team.top_id.toLowerCase().includes(this.state.search.toLowerCase())){
                            return team
                        }else{
                            return null
                        }
                    }).map((team) => {
                        let colour = ''
                        team.state === 'Free' ? colour='#81B29A' : colour='#E07A5F'
                        return(
                            <div key={team.id} style={{"backgroundColor": colour}} className='box'> 
                                {/* <button type="button" className = 'table-row' key={team.id} 
                                    onClick={() => this.handleClick(team)}
                                    > {team.top_id} </button> */}
                                <div className='table-row' key={team.id}> {team.top_id} <br/> 
                                    <div className='show-on-map'> 
                                        <button type='button' className='show-button' onClick={() => this.handleShowClick(team)}> show on map </button> 
                                        <button type='button' className='send-button' onClick={() => this.handleSendClick(team)}> send </button> 
                                    </div>
                                </div>
                                {/* <div className = 'more-inf' key={team.id + 1}> 
                                    <button type='button' onClick={() => this.handleClick(team)}> show on map </button>
                                </div> */}
                            </div>
                        )}
                    )}
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        operation: state.teamState
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Data)
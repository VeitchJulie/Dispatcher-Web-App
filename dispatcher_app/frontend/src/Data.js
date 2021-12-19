import React from 'react'
import axios from 'axios'
import './styles/Data.css'
import {connect} from 'react-redux'
import {setCurrentTeam, sendTeam} from './actions/team'

class Data extends React.Component {
    state = {
        teams: [],
        search: '',
        buttonClicked: false,
    }


    componentDidMount() {
        setInterval(() => {
            axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })}, 2000)  
    }

    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    handleShowClick(team){
        if(this.state.buttonClicked === false){
            this.props.dispatch(setCurrentTeam({id: team.id}))
            this.setState({buttonClicked: true})
        }else if(this.state.buttonClicked === true & team.id === this.props.team.id){
            this.props.dispatch(setCurrentTeam({id: ''}))
            this.setState({buttonClicked: false})
        }else{
            this.props.dispatch(setCurrentTeam({id: team.id}))
        }
    }

    handleSendClick(team){
        this.props.dispatch(sendTeam({id: team.id}))
    }

    updateTeams = (id, state) =>{
        let found = this.state.teams.findIndex((fTeam, index) => fTeam.id === id)
        let teams = [...this.state.teams]
        let sTeam = {
            ...teams[found],
            state: state
        }
        teams[found] = sTeam
        this.setState({teams: teams})
    }

    handleEndClick = (team) => {

        const object = {
            "id": team.id,
            "token": team.token,
            "state": "Free",
            "lat": team.lat,
            "long": team.long,
            "endLat": 0,
            "endLong": 0,
        }

        axios.put(`http://localhost:8000/teams/${team.id}/`, object)       
        this.updateTeams(team.id, 'Free')
    }

    render(){
        return(
            <div className='data-table-box'> 
                <form className='search-team-form'>
                    <input name='label-name' type='text' className='search-team' placeholder="Enter team's ID" value={this.state.search} onChange={(e) => this.handleSearch(e)}/>
                    <label htmlFor='label-name' className='label'> Search Team </label>
                </form>
                <div className = "data-table">
                    {this.state.teams.filter((team) => {
                        if(this.state.search === ''){
                            return team
                        }else if(team.id.toLowerCase().includes(this.state.search.toLowerCase())){
                            return team
                        }else{
                            return null
                        }
                    }).map((team) => {
                        let colour = ''
                        team.state === 'Free' ? colour='#E3E7E8' : colour='#EB8E68'
                        return(
                            <div key={team.id} className='box'> 
                                <div className='table-row' key={team.id}>
                                    <div className='status' style={{"backgroundColor": colour}}>  </div> 
                                    <div className='id'> {team.id}  </div>  <br/> 
                                    <div className='show-on-map'> 
                                        <button type='button' className='show-button' onClick={() => this.handleShowClick(team)}> show </button> 
                                        <button type='button' className='send-button' onClick={() => this.handleSendClick(team)}> send </button> 
                                        <button type='button' className='end-button' onClick={() => this.handleEndClick(team)}> end </button> 
                                    </div>
                                </div>
                            </div>
                        )}
                    )}
                    <div className="dummyBox"> </div>
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        team: state.team
    }
}

export default connect(mapStateToProps)(Data)
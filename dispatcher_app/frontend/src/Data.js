import React from 'react'
import axios from 'axios'

class Data extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            teams: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })
    }

    render(){
        return(
        <div> 
            <h1> Ambulance teams ID: </h1>
            {this.state.teams.map((team) => {
                return <p key={team.id}> {team.top_id} </p>
            })}
        </div>
        )}
}

export default Data
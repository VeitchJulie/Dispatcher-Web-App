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
            <h3> Ambulance teams ID </h3>
        <table> 
            {this.state.teams.map((team) => {
                return(
                    <tbody key={team.id}> 
                        <tr key={team.id}> 
                            <td key={team.id}> {team.id} </td>
                            <td key={team.id + 1}> {team.top_id} </td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
        </div>
        )}
}

export default Data
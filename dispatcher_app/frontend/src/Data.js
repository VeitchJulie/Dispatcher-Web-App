import React from 'react'
import axios from 'axios'
import './Data.css'

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
            <table className = "data-table">
                <caption> <b> Teams </b> </caption>
                <tbody> 
                {this.state.teams.map((team) => {
                    return(
                        team.state === 'Free' &&
                        <tr key={team.id}> 
                            <td key={team.id}> {team.top_id} </td>
                        </tr>
                    )}
                )}
                </tbody>
            </table>
        )}
}

export default Data
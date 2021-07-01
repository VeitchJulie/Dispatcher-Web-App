import React from 'react'
import axios from 'axios'
import './Data.css'
// import Map from './Map'

class Data extends React.Component {
    constructor(props){
        super(props)
        this.Map = React.createRef()
        this.state = {
            teams: [],
            search: '',
        }
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

    // handleClick(team){
    //     this.Map.current.setState({
    //         lat: team.lat,
    //         long: team.long
    //     })
    // }

    render(){
        return(
            <div className='data-table-box'> 
                <div className='search-team-form-text'> Search Team </div>
                <form className='search-team-form'>
                    <input type='text' className='search-team' placeholder="enter team's ID" value={this.state.search} onChange={(e) => this.handleSearch(e)}/>
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
                        team.state === 'Free' ? colour='rgb(148, 199, 148)' : colour='rgb(233, 167, 167)'
                        return(
                            <div key={team.id} style={{"backgroundColor": colour}}> 
                                <div className = 'table-row' key={team.id} 
                                    // onClick={this.handleClick(team)}
                                    > {team.top_id} </div>
                                <div className = 'more-inf' key={team.id + 1}> Status: {team.state}, Lat: {team.lat}, Long: {team.long} </div>
                            </div>
                        )}
                    )}
                </div>
            </div>
        )}
}

export default Data
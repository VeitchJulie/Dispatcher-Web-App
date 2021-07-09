// import React from 'react'
// import axios from 'axios'
// import './styles/Data.css'
// // import Map from './Map'
// // import {Provider} from 'react-redux'
// import configureStore from './store/configureStore'
// import {setLocation} from './actions/location'

// class Data extends React.Component {
//     constructor(props){
//         super(props)
//         this.Map = React.createRef()
//         this.state = {
//             teams: [],
//             search: '',
//         }
//     }

//     componentDidMount() {
//         axios.get('http://localhost:8000/teams/?format=json').then((response) => {
//             this.setState({teams: response.data})
//         })
//     }

//     handleSearch(event){
//         this.setState({
//             search: event.target.value
//         })
//     }

//     handleClick(team){
//         const store = configureStore()
//         store.dispatch(setLocation({id: team.top_id, lat: team.lat, long: team.long}))
//         console.log(store.getState())
//     }

//     render(){
//         return(
//             <div className='data-table-box'> 
//                 <div className='search-team-form-text'> Search Team </div>
//                 <form className='search-team-form'>
//                     <input type='text' className='search-team' placeholder="enter team's ID" value={this.state.search} onChange={(e) => this.handleSearch(e)}/>
//                 </form>
//                 <div className = "data-table">
//                     {this.state.teams.filter((team) => {
//                         if(this.state.search === ''){
//                             return team
//                         }else if(team.top_id.toLowerCase().includes(this.state.search.toLowerCase())){
//                             return team
//                         }else{
//                             return null
//                         }
//                     }).map((team) => {
//                         let colour = ''
//                         team.state === 'Free' ? colour='rgb(148, 199, 148)' : colour='rgb(233, 167, 167)'
//                         return(
//                             <div key={team.id} style={{"backgroundColor": colour}} className='box'> 
//                                 <button type="button" className = 'table-row' key={team.id} 
//                                     onClick={() => this.handleClick(team)}
//                                     > {team.top_id} </button>
//                                 <div className = 'more-inf' key={team.id + 1}> Status: {team.state}, Lat: {team.lat}, Long: {team.long} </div>
//                             </div>
//                         )}
//                     )}
//                 </div>
//             </div>
//         )}
// }

// export default Data

import React from 'react'
import axios from 'axios'
import './styles/Data.css'
import {connect} from 'react-redux'
import {setLocation} from './actions/location'
// import {downloadTeam} from './actions/teams'

class Data extends React.Component {
    state = {
        teams: [],
        search: '',
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

    handleClick(team){
        this.props.dispatch(setLocation({id: team.top_id, lat: team.lat, long: team.long}))
        //this.props.dispatch(setLocation({id: team.top_id, lat: 52.200, long: 21.00}))
    }

    render(){
        return(
            <div className='data-table-box'> 
                {/* <div className='search-team-form-text'> Search Team </div> */}
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
                                   <div className='show-on-map'> <button type='button' className='show-button' onClick={() => this.handleClick(team)}> show on map </button> </div>
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
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Data)
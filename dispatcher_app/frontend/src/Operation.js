import React from 'react';
import './styles/Operation.css'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'
import axios from 'axios'
import { cancelTeam, hideRouting, showRouting } from './actions/team';
// import { initializeApp} from 'firebase-admin/app';

class Operation extends React.Component{
    
    state = {
        search: '',
        searchResults: [],
        display: "block",
        team: this.getTeam(this.props.team.id),
        searchedLocation: undefined,
        zoom: 11,
        position: [52.229, 20.970],
        showQuestionare: false,
    }

    // componentDidMount(){
    //     this.setState({
    //         position: [this.state.team.lat, this.state.team.long]
    //     })
    // }

    
    // app = initializeApp()

    handleClose(){
        this.props.dispatch(cancelTeam({id: ''}))
        this.setState({showQuestionare: false})
        // this.props.dispatch(hideRouting({id: this.state.team.id}))
    }

    handleSearch = (result) => {
        this.setState({
            display: "none",
            search: result.label,
            searchedLocation: [result.y, result.x],
            zoom: 13,
            position: [result.y, result.x],
        })
    }

    getTeam(id){
        axios.get(`http://localhost:8000/teams/${id}/`).then((response) => {
            this.setState({team: response.data})
        })
    }

    handleGo =  () => {
        this.setState({showQuestionare: true})
        // const object = {
        //     "id": this.state.team.id,
        //     // "top_id": this.state.team.top_id,
        //     "token": this.state.team.token,
        //     "state": "Busy",
        //     "lat": this.state.team.lat,
        //     "long": this.state.team.long,
        //     "endLat": this.state.searchedLocation[0],
        //     "endLong": this.state.searchedLocation[1],
        // }
        // axios.put(`http://localhost:8000/teams/${object.id}/`, object).then(() => {
        //     this.setState({team: object})
        // })
        // this.setState({showQuestionare: true})
    }


    handleRoute = () => {
        this.props.dispatch(showRouting({id: this.state.team.id}))
    }

    handleSendTeam = () => {
        let name = document.getElementsByClassName('nameInput')[0].value
        let phone = document.getElementsByClassName('phoneInput')[0].value
        let extraInformation = document.getElementsByClassName('extraInput')[0].value

        const request = {
            "team" : this.state.team.id,
            "state": "TOACCEPT",
            "lat" : this.state.searchedLocation[0],
            "lng": this.state.searchedLocation[1],
            "name": name,
            "phone": phone,
            "extraInformation": extraInformation,
        }

        // const object = {
        //     "id": this.state.team.id,
        //     "token": this.state.team.token,
        //     "state": "Free",
        //     "lat": this.state.team.lat,
        //     "long": this.state.team.long,
        //     "endLat": this.state.searchedLocation[0],
        //     "endLong": this.state.searchedLocation[1],
        // }
        // axios.put(`http://localhost:8000/teams/${object.id}/`, object).then(() => {
        //     this.setState({team: object})
        // })
        axios.post(`http://localhost:8000/cases/`, request)

        // axios.post(`http://localhost:8000/cases/`, object)
        this.handleClose()
    }
    
    async searchLocation(event){

        this.setState({
            search: event.target.value,
            display: "block"
        })
        const prov = new OpenStreetMapProvider({
            params: {
                'accept-language': 'pl,en',
                countrycodes: 'pl'
            },
        })
        const results = await prov.search({ query: event.target.value })
        this.setState({
            searchResults: results
        })
        if(event.target.value === ''){
            this.setState({searchedLocation: undefined})
            this.props.dispatch(hideRouting({id: this.state.team.id}))
        }
    }

    render(){
        return (
        <div className='main'> 
            <div className='header'> 
            {this.state.team !== undefined && 
                <div className='team-id'> {this.state.team.id} </div> 
                // <div className='team-status'> Status: {this.state.team.state} </div>
            }
            <div className='search-box'> 
                    <form className='search-box-form'> 
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                        <div className='inputs'> 
                            <input name='searchLocation' placeholder='enter address' type='search' className='search-input' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                            <button type='button' className='route-button' onClick={()=> this.handleRoute()}> </button>
                            <button className='go-button' type='button' value='go' onClick={() => this.handleGo()}> </button>
                            {this.state.showQuestionare === true && 
                                <div className='questionare'> 
                                    <button className='close-button' onClick={() => this.handleClose()}> X </button>
                                    <form> 
                                        <label> Name and Surname </label> <br />
                                        <input type='text' className='nameInput' defaultValue="James Bond"/> <br />
                                        <label> Phone number </label> <br />
                                        <input type='tel' className='phoneInput' defaultValue="678564987"/> <br />
                                        <label> Extra information </label> <br />
                                        <input type = 'text' className='extraInput' defaultValue="2nd floor"/>
                                        <br />
                                        <input type='button' value='Send Team' onClick={()=> this.handleSendTeam()}/>
                                    </form>
                                </div>
                            }
                        </div>
                    </form>
                    {this.state.search.length > 3 && 
                    <div className='search-results' style={{"display": this.state.display}}> 
                        {this.state.searchResults.map((result, key) => 
                            <button key={key} className='search-chosen' onClick={() => this.handleSearch(result)}> {result.label} </button>
                        )}
                    </div>
                    }
                </div>
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </div>
            <div className='operation-body'> 
                <div className='map'>
                    <Map 
                    key = {this.state.searchedLocation}
                    visibleMarkers={false}
                    position = {this.state.position}
                    zoom = {this.state.zoom}
                    searchedLocation = {this.state.searchedLocation}
                    />
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        team: state.team,
        teamState: state.teamState
    }
}
  
export default connect(mapStateToProps)(Operation)
  
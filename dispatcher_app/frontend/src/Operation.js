import React from 'react';
import './styles/Operation.css'
import {setSend} from './actions/operation'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'
// var openrouteservice = require("openrouteservice-js");


class Operation extends React.Component{
    
    state = {
        search: '',
        searchResults: [],
        display: "block",
    }

    handleClose(){
        this.props.dispatch(setSend({sendTeam: false}))
    }

    handleSearch(result){
        this.props.dispatch(setSend({sendTeam: true, teamId: this.state.teamId, searchLat: result.y , searchLong: result.x}))
        this.setState({display: "none"})
    }

    async searchLocation(event){
        this.setState({display: "block"})
        this.setState({
            search: event.target.value
        })
        const prov = new OpenStreetMapProvider()
        const results = await prov.search({ query: event.target.value })
        this.setState({
            searchResults: results
        })
    }

    render(){
        return (
        <div className='main'> 
            <header className='header'> 
                <div className='team-id'> ID: {this.props.location.id} </div>
                <div className='team-status'> Status: {this.props.location.state} </div>
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </header>
            <div className='operation-body'> 
                <div className='search-box'> 
                    <form className='search-box-form'> 
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                        <div className='inputs'> 
                            <input name='searchLocation' placeholder='enter address' type='text' className='search-input' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                            {/* <input className='go-button' type='button' value='go' onClick={() => this.handleGo()}/> */}
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
                <div className='map'>
                    <Map 
                    visibleMarkers={false}
                    position = {[this.props.location.lat, this.props.location.long]}
                    zoom = {13}
                    />
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        teamState: state.teamState
    }
}
  
  export default connect(mapStateToProps)(Operation)
  
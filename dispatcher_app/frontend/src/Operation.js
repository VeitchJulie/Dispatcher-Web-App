import React from 'react';
import './styles/Operation.css'
import {setSend} from './actions/operation'
import {setLocation} from './actions/location'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'

class Operation extends React.Component{
    
    state = {
        teamId: this.props.teamId,
        search: '',
        searchResults: [],
        chosenPosition: [52.229, 20.970],
    }

    handleClose(){
        this.props.dispatch(setSend({sendTeam: false}))
    }

    handleSearch(result){
        this.props.dispatch(setLocation({id: this.state.teamId, lat: result.y , long: result.x}))
        this.setState({
            chosenPosition: [result.y, result.x],
        })
    }

    async searchLocation(event){
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
                <div className='team-id'> {this.state.teamId} </div>
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </header>
                <div className='search-box'> 
                    <form className='search-box-form'> 
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                        <input name='searchLocation' placeholder='enter address' type='text' className='search-input' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                    </form>
                    {this.state.search.length > 4 && 
                    <div className='search-results'> 
                        {this.state.searchResults.map((result, key) => 
                            <button key={key} className='search-chosen' onClick={() => this.handleSearch(result)}> {result.label} </button>
                        )}
                    </div>
                    }
                </div>
                <div className='map'>
                    <Map 
                    showMarkers={false}
                    position = {this.state.chosenPosition}
                    />
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
  
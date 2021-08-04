import React from 'react';
import './styles/Operation.css'
import {setSend} from './actions/operation'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'

class Operation extends React.Component{
    
    state = {
        teamId: this.props.teamId,
        search: '',
        searchResults: [],
    }

    handleClose(){
        this.props.dispatch(setSend({sendTeam: false}))
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
        // console.log(this.state.searchResults)
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
                        {this.state.searchResults.map((result) => 
                            <button className='search-chosen'> {result.label} </button>
                        )}
                    </div>
                    }
                </div>
                <div className='map'>
                    <Map showMarkers={false}/>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        teamState: state.teamState
    }
}
  
  export default connect(mapStateToProps)(Operation)
  
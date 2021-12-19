import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom'
import './styles/Past.css'

class Past extends React.Component{
    state = {
        cases: []
    }

    componentDidMount(){
        axios.get('http://localhost:8000/cases/?format=json').then((response) => {
            this.setState({cases: response.data})
        })
    }

    render(){
        return(
            <div className = "Past">
                <header className="App-header">
                    <div>
                        <div className='App-name'> Dispatcher App </div>   
                    </div>
                    <div className="home">
                        <Link to="/"> <button className="back-button" /> </Link>
                    </div>
                </header>
                <table class="past-table">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> State </th>
                            <th> Date </th>
                            <th> Team </th>
                            <th> Phone </th>
                            <th> Extra Information </th>
                        </tr>
                    </thead>
                    <tbody className="pastTableBody">
                    {this.state.cases.map((teamCase, index) => {
                        let time = teamCase.date.substring(11,16)
                        let date = teamCase.date.substring(0,10)
                        return(
                            <tr key = {index}> 
                                <td> {teamCase.name}  </td>
                                <td> {teamCase.state}  </td>
                                <td className="caseDate"> {date + "\t" + time} </td>
                                <td> {teamCase.team}  </td>
                                <td> {teamCase.phone}  </td>
                                <td> {teamCase.extraInformation}  </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Past
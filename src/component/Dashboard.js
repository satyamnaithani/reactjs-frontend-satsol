import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index'

class Dashboard extends Component {
    render() {
        return (
            <div>
                dashboard
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default  connect (mapStateToProps,actionCreators)(Dashboard)

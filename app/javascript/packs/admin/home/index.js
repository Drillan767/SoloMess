import React from 'react';
import Header from "../component/header";

export default class HomeIndex extends React.Component {
    render() {
        return (
            <div>
                <Header settings={this.props.settings} title="Dashboard" />
                <h1>Bonjouuur</h1>
            </div>

        )
    }
}
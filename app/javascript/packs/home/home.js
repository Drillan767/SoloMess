import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

export default class homeIndex extends React.Component {

    render() {
        return(
            <div>
                <Header/>
                <h1>Hello the value currently contains {this.props.value}</h1>
                <Footer/>
            </div>

        )
    }
}
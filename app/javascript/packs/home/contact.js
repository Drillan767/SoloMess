import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';

export default class Contact extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <h1>A beautiful contact form just right there.</h1>
                <Footer/>
            </div>

        )
    }
}
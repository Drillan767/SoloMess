import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import utils from '../lib/functionsLibrary'

export default class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {portfolio: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(portfolio) {
            self.setState({portfolio: portfolio});
        });
    }
    render() {
        let portfolio = this.state.portfolio;

        return (
            portfolio !== null &&
            <div>
                <h1>{portfolio.title}</h1>
                <p>Tags: {portfolio.tags}</p>
                <p>{portfolio.content}</p>
                {
                    portfolio.illustrations.map(function(illustration, i) {
                        return (
                            <img src={illustration.url} alt="" key={i} height="100" width="100"/>
                        )
                    })
                }
                <br clear="all"/>
                <p>Created on {utils.toRealDate(portfolio.creation_time)}</p>
                <p>
                    <a href={portfolio.website} target="_blank">Check the website</a>
                </p>
            </div>

        )
    }
}
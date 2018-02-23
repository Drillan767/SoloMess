import React from 'react';
import Header from "../layout/header";
import Footer from "../layout/footer";
import utils from '../lib/functionsLibrary';

export default class Portfolios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {portfolios: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(portfolio) {
            self.setState({portfolios: portfolio});
        });
    }

    render() {
        let portfolios = this.state.portfolios;

        return (
            <div className="container">
                <div className="row">
                    {
                        portfolios !== null &&
                        portfolios.map(function(portfolio, i) {
                            return (
                                <div className="col-sm" key={i}>
                                    <h3>{portfolio.title}</h3>
                                    <p>Tags : {portfolio.tags}</p>
                                    <img src={portfolio.thumbnail.url} alt="" width="50" height="50"/>
                                    <p>
                                        <a href={window.location.origin + '/project/' + portfolio.slug}>See more</a>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
import React from 'react';
import utils from '../lib/functionsLibrary';

export default class Breadcrumb extends React.Component {
    render() {
        let location = this.props.location;
        let shown = this.props.shown;

        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className={"breadcrumb-item " + (location == null ? 'active' : '')} aria-current={location == null ? 'page' : 'false'}>
                        {location === undefined ? 'Home' : <a href="/">Home</a>}
                    </li>
                    {
                        location !== null &&
                        <li className={"breadcrumb-item " + (shown == null && 'active')} aria-current={shown == null ? 'page' : 'false'}>
                            {
                                shown == null ? utils.capitalize(location) :
                                    <a href={"/" + location}>{utils.capitalize(location)}</a>
                            }
                        </li>
                    }
                    {
                        shown !== undefined &&
                        <li className="breadcrumb-item active" aria-current="page">
                            {shown}
                        </li>
                    }
                </ol>
            </nav>
        )
    }
}
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as brands from '@fortawesome/fontawesome-free-brands';

let socialNetwork = {
    'facebook': brands.faFacebook,
    'twitter': brands.faTwitter,
    'viadeo': brands.faViadeo,
    'github': brands.faGithub,
    'linkedin': brands.faLinkedin,
};

export default class headerLinks extends React.Component {

    render() {

        let settings = this.props.settings;

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return (
            <ul className="navbar-nav my-2 my-lg-0">
                {
                    settings !== null &&
                    settings.social_networks.map(function(param, i){
                        return (
                            <li className="nav-item" key={i}>
                                <a href={param.url} target="_blank" className="nav-link">
                                    <FontAwesomeIcon icon={socialNetwork[param.name]} />
                                    {capitalize(param.name)}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as brands from '@fortawesome/fontawesome-free-brands';


/*
*  On peut accéder à l'élément de son choix en faisant par exemple
*  brand[socialNetwork['facebook'], ce qui donnera brand.faFacebook
*/

let settings = this.props.settings;

let socialNetwork = {
    'facebook': faFacebook,
    'twitter': faTwitter,
    'viadeo': faViadeo,
    'github': faGithub,
    'linkedin': faLinkedin,
};

export default class headerLinks extends React.Component {

    render() {

        return (
            <ul className="navbar-nav my-2 my-lg-0">
                {
                    settings !== null &&
                    settings.social_networks.map(function(param, i){
                        return (
                            <li className="nav-item" key={i}>
                                <a href={param.url}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                    {param.name}
                                </a>

                            </li>
                        )

                    })

                }
            </ul>
        )
    }
}
import React from 'react';
import {adminElementsForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import Reboot from 'material-ui/Reboot';

export default class BackApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
    }

    render() {
        let actionName = utils.extractAdminActionName();
        let Element = adminElementsForActionName[actionName];

        return (
            <div>
                <Reboot />
                <Element settings={this.state.settings} />
            </div>
        )
    }
}
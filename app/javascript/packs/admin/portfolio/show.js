import React from 'react';
import utils from '../../lib/functionsLibrary'
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import {withStyles} from 'material-ui/styles';
import {green, orange} from 'material-ui/colors';
import Button from 'material-ui/Button';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import Edit from 'material-ui-icons/ModeEdit';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        margin: 'auto'
    },
    public: {
        backgroundColor: green[400],
        color: '#fff',
        marginLeft: '40px'
    },
    draft: {
        backgroundColor: orange[400],
        color: '#fff',
        marginLeft: '40px'
    },
    tag: {
        marginRight: '7px'
    },
    illustration: {
        display: 'flex',
        justifyContent: 'center'
    },
    actions: {
        margin: '30px 0 10px 0',
        display: 'flex',
        justifyContent: 'space-around'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },

});


class PortfolioShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: null,
            settings: null,
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(project) {
            self.setState({project: project})
        });
        utils.getSettings(function(settings) {
            self.setState({settings: settings})
        })
    }

    render() {
        const { styles } = this.props;

        return (
            <h1>Bjour</h1>
        )
    }
}

export default withStyles(styles)(PortfolioShow);


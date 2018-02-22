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
        const { project } = this.state;
        const { classes } = this.props;

        return (
            project !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                <Typography variant="title" component="h1">{project.title}</Typography>
                <Typography variant="subheading">
                    Créé le {utils.toRealDate(project.created_at, true)} | Mis à jour le {utils.toRealDate(project.updated_at, true)}
                    {
                        project.public ? <Chip className={classes.public} label="Public"/> : <Chip className={classes.draft} label="Draft"/>
                    }
                </Typography>

                <div>
                    {
                        project.tags.split(',').map(function(tag, i) {
                            return (
                                <Chip className={classes.tag} label={tag} key={i}/>
                            )
                        })
                    }
                </div>
                <Typography dangerouslySetInnerHTML={{__html: project.content}} />
                <div className={classes.illustration}>
                    <img src={project.thumbnail.url} alt={utils.basename(project.thumbnail.url)}/>
                </div>
                <div className={classes.actions}>
                    <Button variant="raised" href="/admin/portfolio">
                        <Left className={classes.leftIcon}/>
                        Back
                    </Button>
                    <Button variant="raised" color="primary" href={window.location.pathname + '/edit'}>
                        <Edit className={classes.leftIcon}/>
                        Edit
                    </Button>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(PortfolioShow);


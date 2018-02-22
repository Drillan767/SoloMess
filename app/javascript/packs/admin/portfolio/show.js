import React from 'react';
import utils from '../../lib/functionsLibrary'
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import GridList, { GridListTile } from 'material-ui/GridList';
import {green, orange} from 'material-ui/colors';
import Button from 'material-ui/Button';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import Edit from 'material-ui-icons/ModeEdit';
import Dialog from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import moment from 'moment';

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
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    paper: {
        marginTop: '20px',
        padding: '10px'
    },
    bold: {
        fontWeight: 'bold'
    },
    marginTop: {
        marginTop: '20px'
    }
});

class PortfolioShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: null,
            settings: null,
            dialogImg: false,
            img: null,
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

    openDialog(img) {
        this.setState({
            dialogImg: true,
            img: img
        })
    }

    closeDialog() {
        this.setState({
            dialogImg: false,
            img: null
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
                    Created on {utils.toRealDate(project.created_at, true)} | Updated on {utils.toRealDate(project.updated_at, true)}
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
                {
                    project.illustrations.length > 0 &&
                    <Paper className={classes.paper}>
                        <GridList className={classes.gridList} cols={2.5}>
                            {
                                project.illustrations.map(function(img, i) {
                                    return (
                                        <GridListTile key={i}>
                                            <img
                                                src={img}
                                                alt={utils.basename(img)}
                                                onClick={() => this.openDialog(img)}
                                            />
                                        </GridListTile>
                                    )
                                }, this)
                            }
                        </GridList>
                        <Dialog
                            open={this.state.dialogImg}
                            keepMounted
                            onClose={this.closeDialog.bind(this)}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <img src={this.state.img} alt={this.state.img ? utils.basename(this.state.img) : ''}/>
                        </Dialog>
                    </Paper>
                }
                <div className={classes.marginTop}>
                    <Typography variant="body2" gutterBottom>
                        <span className={classes.bold}>Project's date :</span> {moment(project.creation_time).format('MM/YYYY')}
                    </Typography>
                    <Typography>
                        <span className={classes.bold}>Project's url : </span>
                        <a href={project.website} target="_blank">{project.website}</a>
                    </Typography>
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
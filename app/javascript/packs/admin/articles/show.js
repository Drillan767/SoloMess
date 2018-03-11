import React from 'react';
import utils from '../../lib/functionsLibrary'
import { Typography, Chip, withStyles, Button, Grid} from 'material-ui';
import {green, orange} from 'material-ui/colors';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import Edit from 'material-ui-icons/ModeEdit';
import { Link } from 'react-router-dom';

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

class ArticleShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { classes, history, location, match, settings, staticContext } = this.props;
        if (this.state.article !== nextState.article) {
            return true;
        }

        if (
            classes !== nextProps.classes ||
            history !== nextProps.history ||
            location !== nextProps.location ||
            match !== nextProps.match ||
            settings !== nextProps.settings ||
            staticContext !== nextProps.staticContext
        ) {
            return true;
        }

        return false
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(article) {
            self.setState({article: article.find(a => a.slug === self.props.match.params.slug)});
        });
    }

    render() {
        const { article } = this.state;
        const { classes } = this.props;
        return (
            article !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                <Typography variant="title" component="h1">{article.title}</Typography>
                <Typography variant="subheading">
                    Créé le {utils.toRealDate(article.created_at, true)} | Mis à jour le {utils.toRealDate(article.updated_at, true)}
                    {
                        article.public ? <Chip className={classes.public} label="Public"/> : <Chip className={classes.draft} label="Draft"/>
                    }
                </Typography>

                <div>
                    {
                        article.tags.split(',').map(function(tag, i) {
                            return (
                                <Chip className={classes.tag} label={tag} key={i}/>
                            )
                        })
                    }
                </div>
                <Typography dangerouslySetInnerHTML={{__html: article.content}} />
                <div className={classes.illustration}>
                    <img src={article.image.url} alt={utils.basename(article.image.url)}/>
                </div>
                <div className={classes.actions}>
                    <Button variant="raised" component={Link} to='/admin/articles'>
                        <Left className={classes.leftIcon}/>
                        Back
                    </Button>
                    <Button variant="raised" color="primary" component={Link} to={window.location.pathname + '/edit'}>
                        <Edit className={classes.leftIcon}/>
                        Edit
                    </Button>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(ArticleShow);
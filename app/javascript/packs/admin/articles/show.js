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

class ArticleShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(article) {
            self.setState({article: article});
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
                    <Button variant="raised" href="/admin/articles">
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

export default withStyles(styles)(ArticleShow);
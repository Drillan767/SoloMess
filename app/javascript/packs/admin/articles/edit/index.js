import React from 'react';
import utils from '../../../lib/functionsLibrary';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Title from './title';
import Tags from './tags'
import Image from './image';
import Quill from './quill';
import Actions from './actions';
import _ from 'lodash'

const styles = {
    root: {
        margin: 'auto'
    },
    file: {
        margin: '5px auto 30px auto'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
    },
    buttons: {
        margin: '0 7px'
    },
    textarea: {
        display: 'none'
    },
    dialog: {
        maxWidth: '90vw'
    }
};

class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            settings: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { classes, history, location, match, settings } = this.props;
        if(classes !== nextProps.classes || history !== nextProps.history || location !== nextProps.location ||
            match !== nextProps.match || settings !== nextProps.settings || this.state.article !== nextState.article) {

            return true
        }

        else {
            return false;
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(articles) {            
            self.setState({
                article: articles.find(a => a.slug === self.props.match.params.slug)
            })
        });
    }

    render() {
        const { classes, settings } =this.props;
        const { article } = this.state;
        return (
            article !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form
                        encType="multipart/form-data"
                        action={window.location.href.replace('/edit', '')}
                        acceptCharset="UTF-8"
                        method="POST"
                    >
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>

                        <Title 
                            className={classes.root} 
                            value={article.title}
                        />
                        <Tags 
                            className={classes.root} 
                            value={article.tags}
                        />
                        <Image 
                            className={classes.file}
                            dialog={classes.dialog}
                            value={article.image.url} 
                        />
                        <Quill 
                            className={classes.textarea} 
                            value={article.content} 
                        />
                        <Actions div={classes.actions} buttons={classes.buttons} />

                    </form>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(ArticleEdit)
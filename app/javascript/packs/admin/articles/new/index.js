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
    }
};

class ArticleNew extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.settings !== nextProps.settings;
    }

    render() {
        const { classes } =this.props;

        return (
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form encType="multipart/form-data" action="/admin/articles" acceptCharset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>

                        <Title className={classes.root} />
                        <Tags className={classes.root} />
                        <Image className={classes.file} />
                        <Quill className={classes.textarea}/>
                        <Actions div={classes.actions} buttons={classes.buttons} />

                    </form>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(ArticleNew)
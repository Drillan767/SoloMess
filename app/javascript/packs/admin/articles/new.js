import React from 'react';
import utils from '../../lib/functionsLibrary';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Input, { InputAdornment } from 'material-ui/Input';
import { FormHelperText } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';
import AttachFile from 'material-ui-icons/AttachFile';
import IconButton from 'material-ui/IconButton';
import ReactQuill from 'react-quill';

const styles = themes => ({
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
});

ReactQuill.modules = {
    toolbar: {
        container: [
            [{size: []}, { 'font': [] }],
            [{'align': []}, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code', 'link'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['clean'],
        ],
        handlers: {
            'image': this.imageHandler
        }
    },
};

class ArticleNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            text: '',
        };
    }

    handleUpload(e) {
        this.setState({value: utils.keepFileName(e.target.value)});
    }

    imageHandler = (image, callback) => {
        let range = this.quillRef.getEditor().getSelection();
        let value = prompt('What is the image URL');
        if(value) {
            this.quillRef.getEditor().insertEmbed(range.index, 'image', value, "user");
        }
    };

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const { classes } =this.props;

        return (
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form encType="multipart/form-data" action="/admin/articles" acceptCharset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                id="article_title"
                                label="Title"
                                name="article[title]"
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                label="Tags"
                                id="article_tags"
                                name="article[tags]"
                                fullWidth
                                helperText="Separate each tag with a comma"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.file}>
                            <Input
                                readOnly
                                value={this.state.value}
                                fullWidth
                                placeholder="File"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <Tooltip title="Upload a file">
                                                <label htmlFor="file_upload">
                                                    <AttachFile/>
                                                </label>
                                            </Tooltip>
                                            <input
                                                id="file_upload"
                                                name="article[image]"
                                                type="file"
                                                onChange={this.handleUpload.bind(this)}
                                                style={{display: 'none'}}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="weight-helper-text">Supported format: jpg png jpeg</FormHelperText>
                        </Grid>

                        <textarea
                            id="content"
                            name="article[content]"
                            className={classes.textarea}
                            value={this.state.text}
                        />

                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleChange.bind(this)}
                            modules={ReactQuill.modules}
                            formats={ReactQuill.formats}
                            ref={(el) => this.quillRef = el}
                        />
                        <div className={classes.actions}>
                            <Tooltip title="Save without publish">
                                <Button
                                    variant="raised"
                                    className={classes.buttons}
                                    name="save"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Tooltip>
                            <Tooltip title="Save and publish">
                                <Button
                                    variant="raised"
                                    color="primary"
                                    className={classes.buttons}
                                    name="publish"
                                    type="submit"
                                >
                                    Publish
                                </Button>
                            </Tooltip>
                        </div>

                    </form>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(ArticleNew)
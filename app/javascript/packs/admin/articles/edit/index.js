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
    }
};

class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            settings: null,
            // pas sûr d'avoir besoin du reste
            title: '',
            text: ''
        }

        this.handleChangeFor = this.handleChangeFor.bind(this);
    }

    handleChangeFor(field, value) {
        console.log(value);
        const article = _.cloneDeep(this.state.article)
        article[field] = value
        this.setState({ article: article });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.settings !== nextProps.settings;
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(articles) {            
            self.setState({
                article: articles.find(a => a.slug === self.props.match.params.slug)
            })
        });
        utils.getSettings(function (settings) {
            self.setState({settings: settings})
        });
    }

    render() {
        const { classes } =this.props;
        const { article } = this.state;
        return (
            article !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form encType="multipart/form-data" action="/admin/articles" acceptCharset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>

                        <Title 
                            className={classes.root} 
                            value={article.title}
                            handleChange={this.handleChangeFor}
                        />
                        <Tags 
                            className={classes.root} 
                            article={article} 
                        />
                        <Image 
                            className={classes.file} 
                            value={article.image} 
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

/*
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
import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';

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

ReactQuill.modules = {
    toolbar: {
        container: [
            [{size: []}, { 'font': [] }],
            [{'align': []}, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code', 'link'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['clean'],
        ]
    },
};

class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            settings: null,
            open: false,
            filename: '',
            image: '',
            text: '',
        };
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href.replace('/edit', '.json'), function(article) {
            self.setState({
                article: article,
                filename: utils.basename(article.image.url),
                file: article.image.url,
                text: article.content
            });
        });
        utils.getSettings(function (settings) {
            self.setState({settings: settings})
        });
    }

    handleUpload() {
        let reader = new FileReader();
        let file = document.getElementById("file_upload").files[0];
        let url = reader.readAsDataURL(file);
        reader.onloadend = function(){
            this.setState({
                file: [reader.result],
                filename: file.name
            });
        }.bind(this);
    }

    handleQuill(value) {
        this.setState({text: value})
    }

    displayImage(e) {
        if(e.target.type === 'text') {
            this.setState({open: true});
            document.activeElement.blur();
        }
    }

    hideImage() {
        this.setState({open: false});
    }

    handleChangeFor = (propertyName) => (event) => {
        const article = this.state.article;
        article[propertyName] = event.target.value;
        this.setState({ article: article });
    };

    render() {
        const { classes } =this.props;
        const { article, settings } = this.state;

        return (
            article !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                {
                    settings !== null && settings.alert !== null &&
                    <Typography component="p">{settings.alert}</Typography>
                }
                <Paper elevation={4}>
                    <form
                        encType="multipart/form-data"
                        action={window.location.href.replace('/edit', '')}
                        acceptCharset="UTF-8"
                        method="POST"
                    >
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                id="article_title"
                                label="Title"
                                name="article[title]"
                                value={article.title}
                                onChange={this.handleChangeFor('title')}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                label="Tags"
                                id="article_tags"
                                name="article[tags]"
                                value={article.tags}
                                onChange={this.handleChangeFor('tags')}
                                fullWidth
                                helperText="Separate each tag with a comma"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.file}>
                            <Input
                                readOnly
                                value={this.state.filename}
                                fullWidth
                                id="filename"
                                onFocus={this.displayImage.bind(this)}
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
                            <Dialog
                                open={this.state.open}
                                keepMounted
                                onClose={this.hideImage.bind(this)}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <img src={this.state.file} alt=""/>
                            </Dialog>
                        </Grid>

                        <textarea
                            id="content"
                            readOnly
                            name="article[content]"
                            className={classes.textarea}
                            value={this.state.text}
                        />

                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleQuill.bind(this)}
                            modules={ReactQuill.modules}
                            formats={ReactQuill.formats}
                            ref={(el) => this.quillRef = el}
                        />
                        <div className={classes.actions}>
                            <Tooltip title="Update and unpublish">
                                <Button
                                    variant="raised"
                                    className={classes.buttons}
                                    name="save"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Tooltip>
                            <Tooltip title="Update and publish">
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

export default withStyles(styles)(ArticleEdit)
*/
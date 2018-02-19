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
import Dialog from 'material-ui/Dialog'
import { DatePicker } from 'material-ui-pickers'
import MultiUpload from './component/multiUpload';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

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
    hide: {
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

class PortfolioNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            text: '',
            file: '',
            filename: '',
            m_file: [],
            m_filename: [],
            open: false,
            selectedDate: new Date(),
        };
    }

    displayImage(e) {
        if(e.target.type === 'text') {
            this.setState({open: true});
            document.activeElement.blur();
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    };

    hideImage() {
        this.setState({open: false});
    }

    handleUpload() {
        let reader = new FileReader();
        let file = document.getElementById("file_upload").files[0];
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            this.setState({
                file: [reader.result],
                filename: file.name
            });
        }.bind(this);
    }

    handleMultiUpload() {

        let files = document.getElementById('multiple_files_upload');
        let files_result = [];
        let files_name = [];

        for(let i = 0; i < files.files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.files[i]);
            reader.onloadend = function() {
                // console.log(reader.result);
                files_result.push(reader.result);
                files_name.push(files.files[i].name);
            }
        }

        this.setState({
            m_file: files_result,
            m_filename: files_name,
        });
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const { classes } =this.props;
        const { selectedDate, m_filename, m_file } = this.state;

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
                                value={this.state.filename}
                                onFocus={this.displayImage.bind(this)}
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
                                                className={classes.hide}
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

                        <Grid item xs={12} sm={8} className={classes.root}>
                            <Paper>
                                <GridList cellHeight="auto" spacing={1} className={classes.gridList}>
                                    {m_file.map(tile => (
                                        <GridListTile key={tile.img}>
                                            <img src={tile.img} alt={tile.title} />
                                            <GridListTileBar
                                                title={tile.title}
                                                titlePosition="top"
                                                actionIcon={
                                                    <IconButton className={classes.icon}>
                                                        <StarBorderIcon />
                                                    </IconButton>
                                                }
                                                actionPosition="left"
                                                className={classes.titleBar}
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                                <Button>
                                    <label htmlFor="multiple_files_upload">
                                        Select files
                                    </label>
                                </Button>

                                <input
                                    type="file"
                                    multiple="multiple"
                                    className={classes.hide}
                                    id="multiple_files_upload"
                                    onChange={this.handleMultiUpload.bind(this)}
                                />
                            </Paper>
                        </Grid>


                        <Grid item xs={12} sm={8} className={classes.root}>
                            <DatePicker
                                fullWidth
                                label="Project's creation time"
                                format="D/M/YYYY"
                                autoOk={true}
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                        </Grid>

                        <textarea
                            id="content"
                            name="article[content]"
                            className={classes.hide}
                            value={this.state.text}
                        />

                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleChange.bind(this)}
                            modules={ReactQuill.modules}
                            formats={ReactQuill.formats}
                            ref={(el) => this.quillRef = el}
                        />

                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                label="Project's url"
                                name="article[tags]"
                                placeholder="Insert your project's url (Github, website...)"
                                fullWidth
                                helperText="Separate each tag with a comma"
                            />
                        </Grid>

                        <div className={classes.actions}>
                            <Tooltip title="Save without publishing">
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

export default withStyles(styles)(PortfolioNew)
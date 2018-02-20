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
import StarBorderIcon from 'material-ui-icons/StarBorder'
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
    },
    gridList: {
        height: 450,
        overflowY: 'auto',
    },
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
        let self = this;

        for(let i = 0; i < files.files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.files[i]);
            reader.onloadend = function() {
                files_result.push({
                    "name": files.files[i].name,
                    "img": reader.result
                });
                self.setState({
                    m_file: files_result,
                });
            }
        }
    }

    handleSingleDelete(id) {
        this.setState({
            m_file: this.state.m_file.filter(e => e.id !== id)
        })
    }

    handleAllDelete() {
        this.setState({
            m_file: []
        })
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const { classes } =this.props;
        const { selectedDate, m_file } = this.state;
        let files = [];
        let self = this;

        return (
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form encType="multipart/form-data" action="/admin/portfolios" acceptCharset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                id="portfolio_title"
                                label="Title"
                                name="portfolio[title]"
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.root}>
                            <TextField
                                label="Tags"
                                id="portfolio_tags"
                                name="portfolio[tags]"
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
                                                type="file"
                                                name="portfolio[thumbnail]"
                                                onChange={this.handleUpload.bind(this)}
                                                className={classes.hide}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {
                                m_file.length > 0 &&
                                m_file.map(function(file, i) {
                                    return (
                                        <input
                                            key={i}
                                            type="hidden"
                                            value={file.img}
                                            name="portfolio[illustrations][]"
                                        />
                                    )
                                })
                            }

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

                        <Grid item xs={12} sm={10} className={classes.root}>
                            <Paper>
                                {
                                    m_file.length > 0 &&
                                    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                                        {m_file.map(function(tile, i) {
                                            return (
                                                <GridListTile key={i}>
                                                    <img src={tile.img} alt={tile.title} />
                                                    <GridListTileBar
                                                        title={tile.name}
                                                        titlePosition="top"
                                                        actionIcon={
                                                            <IconButton
                                                                className={classes.icon}
                                                                onClick={() => console.log(self.state.file)}
                                                            >
                                                                <StarBorderIcon />
                                                            </IconButton>
                                                        }
                                                        actionPosition="left"
                                                        className={classes.titleBar}
                                                    />
                                                </GridListTile>
                                            )
                                        })}
                                    </GridList>
                                }

                                <Button>
                                    <label htmlFor="multiple_files_upload">
                                        Select files
                                    </label>
                                </Button>

                                {
                                    m_file.length > 0 &&
                                    <Button
                                        onClick={this.handleAllDelete.bind(this)}
                                    >
                                        Remove all
                                    </Button>
                                }

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
                                name="portfolio[creation_time]"
                                autoOk={true}
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                        </Grid>

                        <textarea
                            id="content"
                            name="portfolio[content]"
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
                                name="portfolio[website]"
                                placeholder="Insert your project's url (Github, website...)"
                                fullWidth
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


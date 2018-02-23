import React from 'react';
import utils from '../../lib/functionsLibrary';
import { withStyles } from 'material-ui/styles';
import {
    Grid, Paper, Dialog, TextField, Button,
    Input, InputAdornment, FormHelperText,
    Tooltip, IconButton, GridList, GridListTile,
    GridListTileBar
} from 'material-ui';
import { Close, AttachFile } from 'material-ui-icons';
import ReactQuill from 'react-quill';
import { DatePicker } from 'material-ui-pickers'
import $ from 'jquery';

const styles = {
    root: {
        margin: 'auto',
        paddingTop: '10px'
    },
    marginTop: {
        marginTop: '20px'
    },
    grid: {
        margin: 'auto'
    },
    file: {
        margin: '0 auto 20px auto',
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
    right: {
        float: 'right'
    },
    gridList: {
        height: 450,
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
};

class PortfolioEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: null,
            value: '',
            textarea: '',
            file: '',
            filename: '',
            m_file: [],
            m_filename: [],
            dialog: false,
            selectedDate: ''
        };

        this.tobase64 = this.tobase64.bind(this);
    }

    tobase64(files) {
        if(files !== null ){
            let response = [];
            let self = this;
            files.map(function(url, i) {
                $.ajax({
                    method: 'POST',
                    dataType: 'text',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF());
                    },
                    url: '/admin/portfolio/encode_file',
                    data: {url: url},
                    success: function(data) {
                        let format = url.split('.').pop();
                        response.push({
                            "id": i,
                            "name": utils.basename(url),
                            "img": 'data:image/'+ format + ';base64,' + data
                        });
                        self.setState({
                            m_file: response,
                        })
                    },
                })
            });

        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href.replace('/edit', '.json'), function(project) {
            self.setState({
                project: project,
                selectedDate: project.creation_time,
                file: project.thumbnail.url,
                filename: utils.basename(project.thumbnail.url),
                textarea: project.content,
            });
            self.tobase64(project.illustrations);
        });
        utils.getSettings(function (settings) {
            self.setState({settings: settings})
        });

    }

    handleChangeFor = (propertyName) => (event) => {
        const project = this.state.project;
        project[propertyName] = event.target.value;
        this.setState({ project: project });
    };

    /* Handling and displaying the thumbnail preview */

    displayImage(e) {
        if(e.target.type === 'text') {
            this.setState({dialog: true});
            document.activeElement.blur();
        }
    }

    hideImage() {
        this.setState({dialog: false});
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

    /* Handling multi upload, multi delete and single delete */

    handleMultiUpload() {

        let files = document.getElementById('multiple_files_upload');
        let files_result = this.state.m_file;
        let self = this;

        for(let i = 0; i < files.files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.files[i]);
            reader.onloadend = function() {
                files_result.push({
                    "id": i,
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
        this.setState(prevState => ({m_file: prevState.m_file.filter(e => e.id !== id)}));
    }

    handleAllDelete() {
        this.setState({
            m_file: []
        })
    }

    /* Handling date */

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    };

    /* Handling Quill */

    handleQuill(value) {
        this.setState({textarea: value})
    }

    render() {
        const { classes } =this.props;
        const { project, settings, m_file } = this.state;
        console.log(m_file);
        console.log(m_file.length);

        return (
            project !== null &&
            <Grid item xs={12} sm={6} className={classes.root}>
                <Paper elevation={4}>
                    <form
                        encType="multipart/form-data"
                        action="/admin/portfolios"
                        acceptCharset="UTF-8"
                        method="post"
                    >
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>

                        {/* Title */}
                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <TextField
                                id="portfolio_title"
                                label="Title"
                                name="portfolio[title]"
                                value={project.title}
                                onChange={this.handleChangeFor('title')}
                                fullWidth
                                className={classes.marginTop}
                            />
                        </Grid>

                        {/*Tags*/}
                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <TextField
                                label="Tags"
                                id="portfolio_tags"
                                name="portfolio[tags]"
                                value={project.tags}
                                onChange={this.handleChangeFor('tags')}
                                fullWidth
                                helperText="Separate each tag with a comma"
                            />
                        </Grid>

                        {/*Thumbnail*/}
                        <Grid item xs={12} sm={8} className={classes.file}>
                            <Input
                                readOnly
                                value={utils.basename(this.state.filename)}
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

                            <FormHelperText id="weight-helper-text">Supported format: jpg png jpeg</FormHelperText>
                            <Dialog
                                open={this.state.dialog}
                                keepMounted
                                onClose={this.hideImage.bind(this)}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <img src={this.state.file} alt=""/>
                            </Dialog>
                        </Grid>

                        {/*Multi Upload*/}
                        <Grid item xs={12} sm={10} className={classes.file}>
                            <Paper>
                                {m_file.length > 0 &&
                                <GridList
                                    cellHeight={200}
                                    spacing={1}
                                    className={classes.gridList}
                                >
                                    {m_file.map(function (tile, i) {
                                        return (
                                            <GridListTile
                                                key={tile.img}
                                                cols={i % 3 === 0 ? 2 : 1}
                                                rows={1}
                                            >
                                                <img src={tile.img} alt={tile.name}/>
                                                <GridListTileBar
                                                    title={tile.name}
                                                    titlePosition="top"
                                                    actionIcon={
                                                        <IconButton
                                                            className={classes.icon}
                                                            onClick={() => this.handleSingleDelete(tile.id)}
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    }
                                                    actionPosition="right"
                                                    className={classes.titleBar}
                                                />
                                            </GridListTile>
                                        )
                                    }, this)}
                                </GridList>
                                }
                                <div>
                                    <Button>
                                        <label htmlFor="multiple_files_upload">
                                            Select files
                                        </label>
                                    </Button>

                                    {
                                        m_file.length > 0 &&
                                        <Button
                                            onClick={this.handleAllDelete.bind(this)}
                                            className={classes.right}
                                        >
                                            Remove all
                                        </Button>
                                    }
                                </div>
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

                                <input
                                    type="file"
                                    multiple="multiple"
                                    className={classes.hide}
                                    id="multiple_files_upload"
                                    onChange={this.handleMultiUpload.bind(this)}
                                />
                            </Paper>
                        </Grid>

                        {/*Date picker*/}
                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <DatePicker
                                fullWidth
                                label="Project's creation time"
                                format="M/YYYY"
                                name="portfolio[creation_time]"
                                autoOk={true}
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                // onChange={this.handleChangeFor('creation_time')}
                            />
                        </Grid>

                        <textarea
                            id="content"
                            readOnly
                            name="portfolio[content]"
                            className={classes.hide}
                            value={this.state.textarea}

                        />

                        {/*Textarea*/}
                        <ReactQuill
                            value={this.state.textarea}
                            onChange={this.handleQuill.bind(this)}
                            className={classes.marginTop}
                            modules={ReactQuill.modules}
                            formats={ReactQuill.formats}
                            ref={(el) => this.quillRef = el}
                        />

                        {/*Project's url*/}
                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <TextField
                                label="Project's url"
                                name="portfolio[website]"
                                placeholder="Insert your project's url (Github, website...)"
                                value={project.website}
                                onChange={this.handleChangeFor('website')}
                                fullWidth
                                className={classes.marginTop}
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

export default withStyles(styles)(PortfolioEdit)
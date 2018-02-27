import React from 'react';
import utils from '../../lib/functionsLibrary';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormHelperText } from 'material-ui/Form';
import Dialog from 'material-ui/Dialog';
import AttachFile from 'material-ui-icons/AttachFile';
import Tooltip from 'material-ui/Tooltip';
import { ChromePicker } from 'react-color';

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
    hide: {
        display: 'none !important'
    }
};

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            file: '',
            filename: '',
            dialog: false,
            bg_color: '',
            txt_color: ''
        };
    }

    componentDidMount() {
        let self = this;
        utils.getSettings(function(settings){
            self.setState({
                settings: settings,
                bg_color: settings.theme_color,
                txt_color: settings.titles_color,
            })
        })
    }

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

    /* Handling color changes */

    handleColorChange = (color) => {
        this.setState({bg_color: color.hex})
    }

    render() {

        const { classes } = this.props;
        const { settings } = this.state;

        return (
            <Grid item xs={12} sm={6} className={classes.root}>
                <form
                    encType="multipart/form-data"
                    action="/admin/settings"
                    acceptCharset="UTF-8"
                    method="post"
                >
                    <input name="utf8" type="hidden" value="✓" />
                    <input type="hidden" name="authenticity_token" value={utils.getCSRF()}/>

                    <Paper elevation={4}>
                        <Typography align="center" variant="display1">Main</Typography>

                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <TextField
                                id="helperText"
                                label="Website's name"
                                fullWidth
                                className={classes.textField}
                                helperText="Will be displayed in every page's title and on the navbar"
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} sm={8} className={classes.grid}>
                            <Input
                                readOnly
                                value={this.state.filename}
                                onFocus={this.displayImage.bind(this)}
                                fullWidth
                                placeholder="Website's logo"
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

                            <FormHelperText id="weight-helper-text">
                                Will be displayed on the navbar - Supported format: jpg png jpeg
                            </FormHelperText>
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
                        
                        <ChromePicker 
                            color={this.state.color}
                            onChangeComplete={this.handleColorChange.bind(this)}
                        />
                        
                    </Paper>
                </form>
            </Grid>
        )
    }
}

export default withStyles(styles)(Settings)

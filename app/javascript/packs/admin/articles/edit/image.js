import React from 'react';
import { Grid, Tooltip, Input, IconButton, Dialog, FormHelperText, InputAdornment} from 'material-ui';
import { AttachFile } from 'material-ui-icons';
import utils from '../../../lib/functionsLibrary';

export default class ArticleNewImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: null,
            filename: '',
        }
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

    handleUpload() {
        let reader = new FileReader();
        let file = document.getElementById("file_upload").files[0];
        reader.onloadend = function(){
            this.setState({
                file: [reader.result],
                filename: file.name
            });
        }.bind(this);

        reader.readAsDataURL(file);
    }

    componentDidMount() {
        this.setState({
            filename: utils.basename(this.props.value),
            file: this.props.value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.file !== nextState.file ||
            this.state.filename !== nextState.filename ||
            this.state.open !== nextState.open) {
            return true
        }

        if(this.props.className !== nextProps.className ||
           this.props.dialog !== nextProps.dialog ||
           this.props.value !== nextProps.value ) {

            return true
        }

        return false;
    }

    render() {

        const { className, value, dialog } = this.props;
        console.log(this.props);

        return (
            <Grid item xs={12} sm={8} className={className}>
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
                    maxWidth={false}
                    onClose={this.hideImage.bind(this)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <img src={this.state.file} alt=""/>
                </Dialog>
            </Grid>
        )
    }
}
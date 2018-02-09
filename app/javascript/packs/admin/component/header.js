import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export default class Header extends React.Component {

    render() {

        return (
            <AppBar position="static" color="default">
                <Toolbar align="center">
                    <Typography variant="title" color="inherit" >
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
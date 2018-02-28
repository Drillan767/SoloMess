import React from 'react';
import Toolbar from './toolbar';
import Hidden1 from './hidden1';
import Hidden2 from './hidden2';
import { withStyles } from 'material-ui/styles';

export default class MainBar extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.mobileOpen !== nextProps.mobileOpen) {
            return true;
        }

        if(this.props.title !== nextProps.title) {
            return true;
        }

        return false;
    }

    render() {
        const { mobileOpen, title } = this.props;
        return [
            <Toolbar 
                key={0} 
                title={title} 
                handleDrawerToggle={this.props.handleDrawerToggle}
            />,
            <Hidden1 
                key={1} 
                mobileOpen={mobileOpen}
                handleDrawerToggle={this.props.handleDrawerToggle}
            />,
            <Hidden2 key={2} mobileOpen={mobileOpen} />
        ]
    }
}
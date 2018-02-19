import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        // width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
});

const tiles = [
    {
        img: 'http://lorempixel.com/g/400/200',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: 'http://lorempixel.com/g/400/200',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: 'http://lorempixel.com/g/400/200',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: 'http://lorempixel.com/g/400/200',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: 'http://lorempixel.com/g/400/200',
        title: 'Image',
        author: 'author',
        featured: true,
    },
];

class MultiUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
        this.setState({files: tiles})
    }

    render() {
        const { classes } =  this.props;
        const { files } = this.state;

        return (
            <div className={classes.root}>
                <Paper>
                    <GridList cellHeight="auto" spacing={1} className={classes.gridList}>
                        {files.map(tile => (
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
                </Paper>
            </div>
        );
    }


}

MultiUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiUpload);
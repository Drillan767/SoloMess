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
        width: 500,
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
        img: '../../uploads/portfolio/1/Capture_du_2017-07-28_22-57-04.png',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: '../../uploads/portfolio/1/Capture_du_2017-11-22_09-35-07.png',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: '../../uploads/portfolio/1/Capture_du_2017-11-22_14-02-03.png',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: '../../uploads/portfolio/1/Capture_du_2017-11-24_14-02-42.png',
        title: 'Image',
        author: 'author',
        featured: true,
    },
    {
        img: '../../uploads/portfolio/1/Capture_du_2017-12-20_11-13-00.png',
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
                    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                        {files.map(tile => (
                            <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
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
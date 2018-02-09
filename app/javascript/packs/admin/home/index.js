import React from 'react';
import utils from '../../lib/functionsLibrary';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export default class HomeIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user:null, settings: null}
    }

    componentDidMount() {
        /*let self = this;
        utils.loader(window.location.href + '.json', function(settings) {
            self.setState({settings: settings});
        });*/
    }

    render() {
        return (
            <div>
                <div>
                    <Paper elevation={4} style={{height: '400px', padding: '3%'}}>
                        <Card style={{width: '30%', margin: '20px'}} raised={true}>
                            <CardContent>
                                <Typography>Word of the Day</Typography>

                                <Typography >adjective</Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Typography variant="headline" component="h3">
                            This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                            Paper can be used to build surface or other elements for your application.
                        </Typography>
                    </Paper>
                </div>
            </div>

        )
    }
}
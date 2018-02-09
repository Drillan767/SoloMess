import React from 'react';
import utils from "../../lib/functionsLibrary";
import {
    Button,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Switch,
    Typography,
    TextField,
} from 'material-ui'

export default class New extends React.Component {

    state = {
        stay_logged: false,
    };

    render() {
        return (
            <div>
                <Grid item xs={12} sm={6} className="login-grid">
                    <Paper elevation={4} className="login-paper">
                        <Typography variant="headline" component="h1">
                            Log in
                        </Typography>
                        <form className="new_user" id="new_user" action="/users/sign_in" acceptCharset="UTF-8" method="post">
                            <input name="utf8" type="hidden" value="&#x2713;" />
                            <input type="hidden" name="authenticity_token" value={utils.getCSRF()} />
                            <div>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    autoFocus={true}
                                    name="user[email]"
                                    type="email"
                                    id="user_email"
                                    required={true}
                                />
                            </div>

                            <div>
                                <TextField
                                    id="user_password"
                                    label="Password"
                                    type="password"
                                    variant="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    name="user[password]"
                                />
                            </div>

                            <div>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.stay_logged}
                                            onChange={(event, checked) => this.setState({ stay_logged: checked })}
                                            value="1"
                                            name="user[remember_me]"
                                        />
                                    }
                                    label="Remember me"
                                />
                            </div>

                            <Button variant="raised" color="primary" type="submit">
                                login
                            </Button>

                            <div className="login-links">
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemText
                                            primary={<a href="/users/password/new">Forgot your password?</a>}
                                            align="center"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={<a href="/users/sign_up">Sign up</a>}
                                            align="center"
                                        />
                                    </ListItem>
                                </List>
                            </div>

                        </form>
                    </Paper>
                </Grid>
            </div>
        )
    }
}
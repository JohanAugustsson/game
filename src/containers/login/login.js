import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createNewUser, login} from '../../store/actions/authAction'
import Paper from "@material-ui/core/Paper";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/buttons";
import Grid from "@material-ui/core/Grid";
import "./login.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import {validateForm} from "../../core/formhelper";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                fields: {
                    email: '',
                    password: '',
                    firstName: '',
                },
                error: {
                    name: '',
                    email: '',
                    password: '',
                    firstName: '',
                },
                valid: false
            },
        }
    }

    updateInput = (e, stateKey) => {
        this.setState({[stateKey]: e.target.value});
    };

    createUser = () => {
        const {dispatch} = this.props;
        const {email, password, firstName, lastName} = this.state;
        const data = {
            email,
            password,
            firstName,
            lastName,
        };
        console.log('skapa användare!!');
        dispatch(createNewUser(data));
    };

//Todo: Varför tvingas man att sätta form.valid = tempForm.valid för state ska uppdateras.
// Borde räcka att skicka tempForm till setState. Har det med async state att göra?
    handleChange = (e, key) => {
        const {form} = this.state;
        form.fields[key] = e.target.value;
        this.validateFormAndUpdateState(form, key);
    };

    validateFormAndUpdateState(form, key) {
        let tempForm = validateForm(form, key || null);
        form.fields = tempForm.fields;
        form.error = tempForm.error;
        form.valid = tempForm.valid;
        this.setState({form});
    }

    handleLogin = () => {
        const {dispatch} = this.props;
        const {form} = this.state;
        if (form.valid) {
            dispatch(login(form.fields.email, form.fields.password));
        }
    };

    render() {
        const {password, form} = this.state;

        return (
            <Grid className={"test"}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"headline"} align={"center"}>WiR Gaming</Typography>
                    </Grid>

                    <Grid item xs={4}>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Paper className={"paper-padding"}>
                            <Input
                                label='Email'
                                formkey='email'
                                value={form.fields.email}
                                onChange={this.handleChange}
                                error={form.error.email}
                            />
                            <Input type={password}
                                   label='Password'
                                   formkey='password'
                                   value={form.fields.password}
                                   onChange={this.handleChange}
                                   error={form.error.password}
                            />
                            <Button onClick={this.handleLogin}>Login</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.data && state.auth.data.user ? !!state.auth.data.user.uid : false
    }
};

export default connect(mapStateToProps)(Login)

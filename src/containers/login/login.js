import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createNewUser, login} from '../../store/actions/authAction'
import Paper from "@material-ui/core/Paper";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/buttons";
import Grid from "@material-ui/core/Grid";
import "./login.css"
import Typography from "@material-ui/core/es/Typography/Typography";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                email: '',
                password: '',
                firstName: '',
            },
            error: {
                name: '',
                email: '',
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

    handleChange = (e, key) => {
        const {formField} = this.state;
        formField[key] = e.target.value;
        this.setState({formField});
    };


    handleLogin = () => {
        const {dispatch} = this.props;
        const {formField} = this.state;
        console.log('loggar in');
        dispatch(login(formField.email, formField.password));
    };

    render() {
        const {password, formField, error} = this.state;

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
                                value={formField.email}
                                onChange={this.handleChange}
                                error={error.email}
                            />
                            <Input type={password}
                                   label='Password'
                                   formkey='password'
                                   value={formField.password}
                                   onChange={this.handleChange}
                                   error={error.password}
                            />
                            <Button onClick={this.handleLogin}>Login</Button>

                            {/* <div className={'form'}>
                    Email: <input value={email} onChange={(e) => this.updateInput(e, 'email')}/>
                    Lösenord: <input value={password} onChange={(e) => this.updateInput(e, 'password')}/>
                    Förnamn: <input value={firstName} onChange={(e) => this.updateInput(e, 'firstName')}/>
                    Efternamn: <input value={lastName} onChange={(e) => this.updateInput(e, 'lastName')}/>
                    <Button variant={'primary'} onClick={this.createUser}> Skapa användare </Button>
                </div>*/}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Login)

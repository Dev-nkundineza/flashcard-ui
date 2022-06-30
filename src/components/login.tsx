import React,{ useState} from "react";
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";

import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION, SIGNUP_MUTATION }from './query';
import { AUTH_TOKEN } from '../constants';
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';


  const useStyles = makeStyles((theme) => ({
   
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
      color: "#4169e1",
      width: "100%"
    },
    submitButton: {
      marginTop: theme.spacing(4),
      backgroundColor: "#4169e1",
      color: "white"
    },
  }));
  
  const LoginComponent = ()=> {
    
    

    const navigate = useNavigate();
    const [formState, setFormState] = useState({
      login: true,
      email: '',
      password: '',
      name: '',
      isLoading: false
    });

    const [login] = useMutation(LOGIN_MUTATION, {
      variables: {
        email: formState.email,
        password: formState.password
      },
      onCompleted: ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token);
         toast.success('successfully Login', {
          position: 'top-center',
          autoClose: 2000,
        });
        navigate('/dashboard');
      },

      onError: (error)=>{
        toast.error('invalid email or password', {
          position: 'top-center',
          autoClose: 2000,
        });
        setFormState({
          ...formState,
          email: '',
          name: '',
          password: '',
          isLoading: false,
        });
      },
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password
      },
      onCompleted: ({ signup }) => {
        toast.success('successfully registered', {
          position: 'top-center',
          autoClose: 2000,
        });

        setFormState({
          ...formState,
          email: '',
          name: '',
          password: '',
          isLoading: false,
          login: true
        });
        navigate('/signin');
      },
      onError: (error)=>{
        toast.error('user already exist', {
          position: 'top-center',
          autoClose: 2000,
        });
        setFormState({
          ...formState,
          email: '',
          name: '',
          password: '',
          isLoading: false,
        });
      },
    });

    const { heading, submitButton } = useStyles();
  
    interface FormElements extends HTMLFormControlsCollection {
      usernameInput: HTMLInputElement
    }
    interface UsernameFormElement extends HTMLFormElement {
      readonly elements: FormElements
    }

    function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
      event.preventDefault()
      setFormState({
        ...formState,
        isLoading: true
      });
      formState.login ? login().then((data)=>{
        console.log(data)
      }).catch(e=> console.log(e)) :
      signup();
    }

    return (
      <Container maxWidth="xs" fixed>
        <Typography className={heading} variant="h4">
        {formState.login ? 'Login form' : 'Register form'}
        </Typography>
        <form onSubmit={ handleSubmit}>
        {!formState.login && (
          <TextField
            value={formState.name}
            variant="outlined"
            margin="normal"
            label="First Name"
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })}
            fullWidth
            required
          />
        )}
          <TextField
            value={formState.email}
            variant="outlined"
            margin="normal"
            label="Email"
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })}
            fullWidth
            required
          />
          <TextField
            value={formState.password}
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value
              })}
            fullWidth
            required
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={formState.isLoading}
            // onClick={ ()=>login() }
            className={submitButton}
          >
            {formState.login ? 'login' : 'create account'}
          </LoadingButton>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login
              })}
            className={submitButton}
          >
            {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
          </Button>
        </form>       
      </Container>
    );
  }
  
  export default LoginComponent;
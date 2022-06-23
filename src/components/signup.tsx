import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
  
  interface IFormInput {
    email: string;
    firstName: string;
    password: string;
  }


const schema = yup.object().shape({
    email: yup.string().required().email(),
    firstName: yup.string().required().min(2).max(25),
    password: yup.string().required().min(8).max(120),
  });

  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      color: "#4169e1",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      backgroundColor: "#4169e1",
      color: "white"
    },
  }));
  
  const Signup: React.FC = ()=> {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormInput>({
        resolver: yupResolver(schema),
      });
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();
    const onSubmit = (data: IFormInput) => {
        setJson(JSON.stringify(data));
      };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Register Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
          {...register("email")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email?.message}
            fullWidth
            required
          />
          <TextField
          {...register("firstName")}
            variant="outlined"
            margin="normal"
            label="First Name"
            helperText={errors.firstName?.message}
            error={!!errors.firstName?.message}
            fullWidth
            required
          />
          <TextField
          {...register("password")}
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password?.message}
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={submitButton}
          >
            Sign Up
          </Button>
          {json && (
            <>
              <Typography variant="body1">
                Below is the user input in JSON format
              </Typography>
              <Typography variant="body2">{json}</Typography>
            </>
          )}
        </form>
      </Container>
    );
  }
  
  export default Signup;
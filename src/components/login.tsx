import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
  
  
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
  
  const LoginComponent: React.FC = ()=> {
    const { heading, submitButton } = useStyles();
  
    return (
      <Container maxWidth="xs" fixed>
        <Typography className={heading} variant="h4">
           Sign In to continue
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={submitButton}
          >
            Sign in
          </Button>
        </form>       
      </Container>
    );
  }
  
  export default LoginComponent;
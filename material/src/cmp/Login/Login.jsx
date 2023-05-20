import {
    Grid,
    Stack,
    Button,
    Container,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel
} from "@mui/material";
import {
  useDispatch,
  useSelector
} from "react-redux";
import Cookies from "universal-cookie";

import {
  loginRequest
} from "./Login.action";

import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  LoadingButton
} from "@mui/lab";
import {
  useState,
  useEffect,
  useRef
} from "react";

import * as yup from "yup";

import MediaQuery from "react-responsive";

const Login = ()=>{
  const [type,setType] = useState("password");
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const {LoginReducer} = useSelector(response=>response);
  const navigate = useNavigate();
  const [remember,setRemember] = useState(false);
  const checkForLogin = useRef();
  checkForLogin.current = ()=>{
    if(LoginReducer.userNotFound)
    {
      return setError((oldData)=>{
        return {
          ...oldData,
          username: {
            state: true,
            message: "Username does not exist"
          },
          password: {
            state: false,
            message: ""
          }
        }
      });
    }

    if(LoginReducer.incorrectPassword)
    {
      return setError((oldData)=>{
        return {
          ...oldData,
          username: {
            state: false,
            message: ""
          },
          password: {
            state: true,
            message: "Incorrect password"
          }
        }
      });
    }

    if(LoginReducer.isLogged)
    {
      cookie.set("authToken",LoginReducer.data.token,{maxAge: 86400});
      return navigate("/admin-panel");
    }
  }

  const rememberMe = useRef();
  rememberMe.current = ()=>{
    let checkUser = localStorage.getItem("user");
    if(checkUser)
    {
      let user = JSON.parse(checkUser);
      return (
        setInput(user),
        setRemember(true),
        setDisabled(false)
      )
    }
  }
  useEffect(()=>{
    checkForLogin.current();
    rememberMe.current();
  },[LoginReducer]);
  const [disabled,setDisabled] = useState(true);
  const [input,setInput] = useState({
    username: "",
    password: ""
  });
  const [error,setError] = useState({
    username: {
      state: false,
      message: ""
    },
    password: {
      state: false,
      message: ""
    }
  });

  const handleInput = (e)=>{
    const input = e.target;
    const key = input.name;
    const value = input.value;
    return setInput((oldData)=>{
      return {
        ...oldData,
        [key]: value
      }
    });
  }
  const schema = yup.object().shape({
    username: yup.string().required().email(),
    password: yup.string().required()
  });

  const validateInput = async (e)=>{
    const key = e.target.name;
    try {
      await schema.validateAt(key,input);
      return setError((oldData)=>{
        return {
          ...oldData,
          [key]: {
            state: false,
            message: ""
          }
        }
      });
    }
    catch(err)
    {
      let message = err.errors[0];
      return setError((oldData)=>{
        return {
          ...oldData,
          [key]: {
            state: true,
            message: message
          }
        }
      });
    }
  }

  const validateSubmit = async ()=>{
    const isValid = await schema.isValid(input);
    return setDisabled(!isValid);
  }

  const login = (e)=>{
    e.preventDefault();
    if(remember)
    {
      let string = JSON.stringify(input);
      localStorage.setItem("user",string);
    }
    dispatch(loginRequest(input));
  }
  const design = (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <MediaQuery minWidth={1224}>
              <img src="images/auth.svg" alt="auth" width="100%" />
            </MediaQuery>
            <MediaQuery maxWidth={1224}>
              <img src="images/mobile-auth.png" alt="auth" width="100%" />
            </MediaQuery>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="py-4">Login</h1>
            <form onSubmit={login}>
              <Stack direction="column" spacing={3}>
                <TextField
                  error={error.username.state}
                  helperText={error.username.message}
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={input.username}
                  onChange={handleInput}
                  onKeyDown={validateSubmit}
                  onInput={validateInput}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                  error={error.password.state}
                  helperText={error.password.message}
                  label="Password"
                  variant="outlined"
                  type={type}
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  onKeyDown={validateSubmit}
                  onInput={validateInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={()=>type === "password" ? setType("text") : setType("password")}>
                        <span className="material-icons-outlined">
                          {
                            type === "password" ? "visibility" : "visibility_off"
                          }
                        </span>
                      </IconButton>
                    </InputAdornment>
                  }
                />
                </FormControl>
                <Stack direction="row" justifyContent="end">
                  <Button component={Link} to="/forgot-password">Forgot password ?</Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={()=>setRemember(!remember)} checked={remember} />} label="Remember me" />
                  </FormGroup>
                  <LoadingButton loading={LoginReducer.isLoading} disabled={disabled} type="submit" variant="contained" color="secondary" sx={{px: 3,py: 1}}>Login</LoadingButton>
                </Stack>
                <Link to="/">Create and account</Link>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
  return design;
}
export default Login;

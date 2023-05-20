import {
    Grid,
    Stack,
    Container,
    TextField
} from "@mui/material";

import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  requestForgot,
  changePassword
} from "./Forgot.action";
import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import {
  LoadingButton
} from "@mui/lab";
const Forgot = ()=>{
  const navigate = useNavigate();

  const [input,setInput] = useState({
    email: "",
    code: "",
    password: ""
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
  const [error,setError] = useState({
    username: {
      state: false,
      message: ""
    },
    code: {
      state: false,
      message: ""
    }
  });
  const dispatch = useDispatch();
  const {ForgotReducer} = useSelector(response=>response);
  const checkUser = useRef();
  checkUser.current = ()=>{
    if(ForgotReducer.success)
    {
      return setVerifyForm(true);
    }
    if(ForgotReducer.userNotFound)
    {
      return setError((oldData)=>{
        return {
          ...oldData,
          username: {
            state: true,
            message: "User does not exist"
          }
        }
      });
    }
  }

  const checkForNewPassword = useRef();
  checkForNewPassword.current = ()=>{
    if(ForgotReducer.passwordChanged)
    {
      return navigate("/login");
    }
    if(ForgotReducer.invalidCode)
    {
      return setError((oldData)=>{
        return {
          ...oldData,
          code: {
            state: true,
            message: "Invalid verification code"
          }
        }
      });
    }
  }


  useEffect(()=>{
    checkUser.current();
    checkForNewPassword.current()
  },[ForgotReducer]);
  const [verifyForm,setVerifyForm] = useState(false);
  const design = (
    <>
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <h1>One</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h1>Forgot Password</h1>
          {
            !verifyForm ? <form onSubmit={(e)=>dispatch(requestForgot(e))}>
              <Stack direction="column">
              <TextField
                error={error.username.state}
                helperText={error.username.message}
                name="email"
                label="Email id"
                variant="outlined"
                sx={{mb: 3}}
                onChange={handleInput}
                value={input.email}
              />
              <div>
                <LoadingButton loading={ForgotReducer.isLoading} type="submit" variant="contained" color="primary" sx={{ py: "12px"}}>Forgot</LoadingButton>
              </div>
              </Stack>
            </form> :
            <form onSubmit={(e)=>dispatch(changePassword(e,input))}>
              <Stack direction="column">
              <TextField
                error={error.code.state}
                helperText={error.code.message}
                name="code"
                label="Verification code"
                variant="outlined"
                sx={{mb: 3}}
                type="number"
                onChange={handleInput}
                value={input.code}
              />
              <TextField
                name="password"
                label="New password"
                variant="outlined"
                sx={{mb: 3}}
                type="password"
                onChange={handleInput}
                value={input.password}
              />
              <div>
                <LoadingButton loading={ForgotReducer.isLoading} type="submit" variant="contained" color="primary" sx={{ py: "12px"}}>Submit</LoadingButton>
              </div>
              </Stack>
            </form>
          }
        </Grid>
      </Grid>
    </Container>
    </>
  );
  return design;
}

export default Forgot;

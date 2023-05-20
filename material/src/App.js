import * as React from "react";
import storage from "./storage";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'material-icons/iconfont/material-icons.css';

import {
  ThemeProvider,
  createTheme,
  Paper,
  CircularProgress
} from "@mui/material";

import {
  deepPurple,
  teal,
  pink,
  deepOrange,
  lightBlue,
  cyan
} from '@mui/material/colors';

import "@fontsource/poppins/500.css";
import {
  useState
} from "react";
import "./App.css";

const Signup = React.lazy(()=>import("./cmp/Signup/Signup"));
const Login = React.lazy(()=>import("./cmp/Login/Login"));
const Forgot = React.lazy(()=>import("./cmp/Forgot/Forgot"));
const Admin = React.lazy(()=>import("./cmp/Admin/Admin"));
const Calendar = React.lazy(()=>import("./cmp/Admin/Calendar/Calendar"));
const Notes = React.lazy(()=>import("./cmp/Admin/Notes/Notes"));
const Modern = React.lazy(()=>import("./cmp/Admin/Dashboard/Modern/Modern"));
const Notfound = React.lazy(()=>import("./cmp/Notfound/Notfound"));
const AuthGuard = React.lazy(()=>import("./guard/AuthGuard"));

const App = ()=>{
  const [mode,setMode] = useState("light");

  storage.subscribe(()=>{
    const { AdminReducer } = storage.getState();
    AdminReducer.dark ? setMode("dark") : setMode("light");
  });

  const Loader = ()=>{
    const l = (
      <>
        <CircularProgress color="info" className="loader" />
      </>
    );
    return l;
  }

  const Theme = createTheme({
    palette: {
      mode: mode,
      primary: deepPurple,
      secondary: teal,
      error: pink,
      warning: deepOrange,
      success: cyan,
      info: lightBlue
    },
    typography: {
      fontFamily: "Poppins"
    }
  });

  const design = (
    <>
      <Provider store={storage}>
        <ThemeProvider theme={Theme}>
          <Paper style={{minHeight:"100vh"}}>
            <Router>
              <Routes>
                <Route path="/" element={
                  <React.Suspense fallback={<Loader />}>
                    <Signup />
                  </React.Suspense>
                } />
                <Route path="login" element={
                  <React.Suspense fallback={<Loader />}>
                    <Login />
                  </React.Suspense>
                } />
                <Route path="forgot-password" element={
                  <React.Suspense fallback={<Loader />}>
                    <Forgot />
                  </React.Suspense>
                } />
                <Route element={
                  <React.Suspense fallback={<Loader />}>
                    <AuthGuard />
                  </React.Suspense>
                }>
                  <Route path="admin-panel" element={
                    <React.Suspense fallback={<Loader />}>
                      <Admin />
                    </React.Suspense>
                  }>
                    <Route path="dashboard/modern" element={
                      <React.Suspense fallback={<Loader />}>
                        <Modern />
                      </React.Suspense>
                    } />
                    <Route path="calendar" element={
                      <React.Suspense fallback={<Loader />}>
                        <Calendar />
                      </React.Suspense>
                    } />
                    <Route path="notes" element={
                      <React.Suspense fallback={<Loader />}>
                        <Notes />
                      </React.Suspense>
                    } />
                    <Route path="*" element={
                      <React.Suspense fallback={<Loader />}>
                        <Notfound />
                      </React.Suspense>
                    } />
                  </Route>
                </Route>
                <Route path="*" element={
                  <React.Suspense fallback={<Loader />}>
                    <Notfound />
                  </React.Suspense>
                } />
              </Routes>
            </Router>
          </Paper>
        </ThemeProvider>
      </Provider>
    </>
  );
  return design;
}

export default App;

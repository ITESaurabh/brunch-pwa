import { Backdrop, Button, Card, CardContent, createTheme, CssBaseline, Divider, IconButton, Snackbar, ThemeProvider, Typography } from "@mui/material";
import { Suspense, useEffect, useState, useContext } from "react";
import { useRoutes } from "react-router-dom";
import Splash from "./components/Splash";
import { getTheme } from "./utils/CookieUtil";
import routes from "./utils/routes";
import CloseIcon from '@mui/icons-material/Close';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Grow from '@mui/material/Grow';
import { store } from "./utils/store";
import Cookies from "js-cookie";
import './App.css';
import ws_connect from "./utils/wsUtil";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#5F266D',
    },
    secondary: {
      main: '#B76C6C',
    },
    background: {
      ...(mode === 'dark' ? {
        default: '#131313',
        paper: '#272727',
      } :
        {
          default: '#f2f2f2',
          paper: '#fff',
        }
      ),
    },
    text: {
      ...(mode === 'dark' ? {
        primary: '#ffffff',
      } :
        {
          primary: '#000000',
        }
      ),

    },
  },
  props: {
    MuiAppBar: {
      color: 'default',
    },
  },
  shape: {
    borderRadius: 12,
  },
});
export let permission = Notification.requestPermission();

function App() {
  const { state, dispatch } = useContext(store);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)
  const currTheme = getTheme()
  let themePref = currTheme ? 'light' : 'dark'
  let element = useRoutes(routes);
  const darkModeTheme = createTheme(getDesignTokens(themePref));


  useEffect(() => {
    if (currTheme === undefined) {
      dispatch({ type: 'SET_THEME', payload: true })
    } else {
      dispatch({ type: 'SET_THEME', payload: currTheme })
    }
  }, [currTheme, dispatch])

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setIsUpdateAvailable(false);
    window.location.reload(true);
  };

  // const time = useRef(Date.now()); //can be let, depending of your logic

  useEffect(() => {
    serviceWorkerRegistration.register({
      onSuccess(registration) {
        console.debug('serviceWorkerRegistration success')
      },
      onUpdate: (registration) => {
        setIsUpdateAvailable(true);
        console.log("reggg", registration);
        setWaitingWorker(registration.waiting);
      }
    })

    permission.then((res) => {
      console.log(res);
      if (res === "denied") {
        dispatch({ type: 'SET_UPDATE_STATE', payload: false })
      } else {
        dispatch({ type: 'SET_UPDATE_STATE', payload: true })
      }
      console.log(res)
    })
      .catch((err) => console.log(err))
    if (!Cookies.get("latest_stable")) {
      ws_connect(dispatch);
    } else {
      dispatch({ type: 'SET_ALL_TO_STATE' });
    }

  }, [dispatch, state.latest_stable])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsUpdateAvailable(false);
  };

  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <Suspense fallback={<Splash />}>
        {element}
      </Suspense>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isUpdateAvailable}
        onClose={handleClose}
        TransitionComponent={Grow}
        sx={{ bottom: { xs: 65, md: 15 } }}
        message="Update Available!"
        action={
          <>
            <Button color="primary" size="medium" onClick={reloadPage}>
              Refresh Now
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={() => setIsUpdateAvailable(false)}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
        key={342}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.isUnsupported}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              my={1}
            >
              Unsupported Browser or OS
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              color="secondary"
              align="center"
            >
              This application is for ChromeOS with Brunch framework only!
            </Typography>
            <Typography
              variant="h6"
            >
              Brunch users may have to enable the brunch "pwa" option in order to use it.
            </Typography>
            <Typography
              align="center"
              mt={1}
            >
            <Button size="large" variant="contained" href="https://github.com/sebanc/brunch" target="_blank">Learn more</Button>
            </Typography>
          </CardContent>
        </Card>

      </Backdrop>
    </ThemeProvider>
  );
}

export default App;

import { Button, createTheme, CssBaseline, IconButton, Snackbar, ThemeProvider, useMediaQuery } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Splash from "./components/Splash";
import { getTheme } from "./utils/CookieUtil";
import routes from "./utils/routes";
import CloseIcon from '@mui/icons-material/Close';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Grow from '@mui/material/Grow';

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

function App() {
  let isWantDark = useMediaQuery('(prefers-color-scheme: dark)');
  const the = getTheme()
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)

  let themePref = (the === undefined) ? (isWantDark ? 'dark' : 'light') : 'light'
  let element = useRoutes(routes);
  const darkModeTheme = createTheme(getDesignTokens(themePref));

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
  }, [])

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
    </ThemeProvider>
  );
}

export default App;

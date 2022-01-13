import { Box } from "@mui/material";
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

function LoaderProgress(props) {

    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[800],
                }}
                size={65}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => theme.palette.primary.contrastText,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={65}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

const Splash = () => {
    return (
        <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
            <LoaderProgress />
        </div>
    );
};

export default Splash;
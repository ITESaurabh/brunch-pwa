import { Alert, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, Link, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import SEO from '../components/SEO';
import { useContext, useEffect, useState } from 'react';
import { store } from '../utils/store';
import { blue } from '@mui/material/colors';
import { ws } from '../utils/wsUtil';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ChromoUp = () => {
    const { state, dispatch } = useContext(store)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    let [logs, setLogs] = useState("fetching logs....</br>")
    const [isUpdateDone, setIsUpdateDone] = useState(false)

    useEffect(()=>{
        if (state.brunch_version === '') {
            dispatch({type: 'SET_UNSUPPORTED',payload: true})
        }
    },[dispatch, state.brunch_version])

    return (
        <div>
            <SEO title="Chrome OS Updater" />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" textAlign={"center"} gutterBottom>
                                Current ChromeOS Version
                            </Typography>
                            <Typography variant="h6" component="div" textAlign={"center"} fontWeight={500}>
                                {state.chromeos_version}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Available Updates
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color={state.isLightTheme ? "blue" : blue[500]} gutterBottom>
                                Latest ChromeOS
                            </Typography>
                            <ListItem
                                disableGutters
                                disablePadding
                                secondaryAction={
                                    <>
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                                ws.send("update-chromeos");
                                                ws.onmessage = async function (evt) {
                                                    var messages = evt.data.split(':next:');
                                                    messages.forEach(message => {
                                                        if (message === "ChromeOS updated.") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(logs += message + '<br>')
                                                    })
                                                    // var messages = evt.data.split(':next:');
                                                    // for (var i = 0; i < messages.length; i++) {
                                                    //     if (messages[i] === "ChromeOS updated.") {
                                                    //         setIsUpdateDone(true)
                                                    //     }
                                                    //     setLogs(messages[i])
                                                    // }
                                                }
                                            }}
                                            size="large" edge="end" variant="contained"
                                            disabled={state.latest_chromeos === state.chromeos_version}
                                        >
                                            Update
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={state.latest_chromeos}
                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                                />
                            </ListItem>
                            <Alert sx={{ mt: 2 }} severity="warning">Before you Update, <br/>We recommend you to check for the any breaking changes via <br/> <Link color="secondary" target="_blank" href="https://github.com/sebanc/brunch/releases"><strong>Brunch's Github </strong><OpenInNewIcon sx={{mb:-0.6, fontSize: 20}} /></Link><br/> and from our <br/><Link color="secondary" target="_blank" href="https://discord.gg/2uy5w4uzB7"><strong>Discord's Announcements </strong><OpenInNewIcon sx={{mb:-0.7, fontSize: 20}} /></Link></Alert>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={isDialogOpen} minWidth="md" maxWidth="md">
                {!isUpdateDone && <LinearProgress color="secondary" />}
                <DialogTitle>Updating ChromeOS...</DialogTitle>
                <DialogContent>
                    <Typography mb={1}>Please Don't close this application while update is going on</Typography>
                    <Paper className='konsole' sx={{ background: 'black', color: 'white' }}>
                        {/* <Typography align='center'>LOGS</Typography> */}
                        <div dangerouslySetInnerHTML={{ __html: logs }} />
                    </Paper>
                </DialogContent>
                {isUpdateDone &&
                    <Button sx={{ m: 1 }} variant="contained" onClick={() => ws.send("reboot")}>Reboot now</Button>
                }
            </Dialog>
        </div>
    );
};

export default ChromoUp;
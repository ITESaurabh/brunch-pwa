import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import SEO from '../components/SEO';
import { useContext, useState } from 'react';
import { store } from '../utils/store';
import { blue } from '@mui/material/colors';
import { ws } from '../utils/wsUtil';

const ChromoUp = () => {
    const { state } = useContext(store)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [logs, setLogs] = useState("fetching logs....</br>")
    const [isUpdateDone, setIsUpdateDone] = useState(false)

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
                                                    for (var i = 0; i < messages.length; i++) {
                                                        if (messages[i] === "<p style=\"color:#33266e;\">---Log end---<br><br>The update process is finished:<br>- If you see error messages in the above log, do not turn off your computer and manually update ChromeOS according to the instructions on github.<br>- Otherwise <a href=javascript:reboot();>click here</a> to reboot your computer and finish the update.</p>") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(messages[i])
                                                    }
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
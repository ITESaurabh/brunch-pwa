import { Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, LinearProgress, Paper } from '@mui/material';
import SEO from '../components/SEO';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useState } from 'react';
import { store } from '../utils/store';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ws } from '../utils/wsUtil';

const BrunchUp = () => {
    const { state } = useContext(store)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [logs, setLogs] = useState("fetching logs....</br>")
    const [isUpdateDone, setIsUpdateDone] = useState(false)

    // console.log(state);
    return (
        <div>
            <SEO title="Brunch Updater" />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" textAlign={"center"} gutterBottom>
                                Current installed Brunch
                            </Typography>
                            <Typography variant="h6" component="div" textAlign={"center"} fontWeight={500}>
                                {state.brunch_version}
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
                            <Typography sx={{ fontSize: 16 }} color={state.isLightTheme ? "green" : "lime"} gutterBottom>
                                Stable Brunch
                            </Typography>
                            <ListItem
                                disableGutters
                                disablePadding
                                secondaryAction={
                                    <>
                                        <Button endIcon={<OpenInNewIcon />} href="https://github.com/sebanc/brunch/releases/latest" target="_blank" variant='text' color="secondary" sx={{ mr: 2 }} aria-label="comments">
                                            Change-log
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                                ws.send("update-stable");
                                                ws.onmessage = async function (evt) {
                                                    var messages = evt.data.split(':next:');
                                                    for (var i = 0; i < messages.length; i++) {
                                                        if (messages[i] === "Brunch updated.") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(messages[i])
                                                    }
                                                }
                                            }}
                                            size="large" edge="end" variant="contained"
                                            disabled={state.latest_stable.replace(" stable", '') === state.brunch_version}
                                        >
                                             {state.latest_stable.replace(" stable", '') === state.brunch_version ? 'Installed': 'Update'}
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={state.latest_stable}
                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color={state.isLightTheme ? "error" : "red"} gutterBottom>
                                Unstable Brunch
                            </Typography>
                            <ListItem
                                disableGutters
                                disablePadding
                                secondaryAction={
                                    <>
                                        <Button endIcon={<OpenInNewIcon />} href="https://github.com/sebanc/brunch-unstable/releases/latest" target="_blank" variant='text' color="secondary" sx={{ mr: 2 }} aria-label="comments">
                                            Change-log
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                                ws.send("update-unstable");
                                                ws.onmessage = async function (evt) {
                                                    var messages = evt.data.split(':next:');
                                                    for (var i = 0; i < messages.length; i++) {
                                                        if (messages[i] === "Brunch updated.") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(messages[i])
                                                    }
                                                }
                                            }}
                                            size="large" edge="end" variant="contained"
                                            disabled={state.latest_unstable.replace(" unstable", '') === state.brunch_version}
                                        >
                                            {state.latest_unstable.replace(" unstable", '') === state.brunch_version ? 'Installed': 'Update'}
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={state.latest_unstable}
                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={isDialogOpen} minWidth="md" maxWidth="md">
                {!isUpdateDone && <LinearProgress color="secondary" />}
                <DialogTitle>Updating Brunch...</DialogTitle>
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

export default BrunchUp;
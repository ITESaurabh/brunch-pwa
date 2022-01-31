import { Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, LinearProgress, Paper, ListItemText, ListItem, Alert } from '@mui/material';
import { useState } from 'react';
import SEO from '../components/SEO';
import { ws } from '../utils/wsUtil';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Addons = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [logs, setLogs] = useState("fetching logs....</br>")
    const [isUpdateDone, setIsUpdateDone] = useState(false)
    return (
        <div>
            <SEO title="Brunch Addons" />
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h6">
                        Available Addons
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ListItem
                                disableGutters
                                disablePadding
                                secondaryAction={
                                    <>
                                        <Button endIcon={<OpenInNewIcon />} href="https://github.com/sebanc/brunch-toolchain/releases/latest" target="_blank" variant='text' color="secondary" sx={{ mr: 2 }} aria-label="comments">
                                            Change-log
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                                ws.send("install-toolchain");
                                                ws.onmessage = async function (evt) {
                                                    var messages = evt.data.split(':next:');
                                                    for (var i = 0; i < messages.length; i++) {
                                                        if (messages[i] === "Brunch-toolchain and brioche installed.") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(messages[i])
                                                    }
                                                }
                                            }}
                                            size="large" edge="end" variant="contained">
                                            Install / Update
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary="Brunch-Toolchain and Brioche"
                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                                />
                            </ListItem>
                            <Alert sx={{ mt: 2 }} severity="warning">This will remove any data installed in /usr/local <strong>(notably the brunch-toolkit / chromebrew / crouton)</strong></Alert>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ListItem
                                disableGutters
                                disablePadding
                                secondaryAction={
                                    <>
                                        <Button endIcon={<OpenInNewIcon />} href="https://github.com/WesBosch/brunch-toolkit/releases/latest" target="_blank" variant='text' color="secondary" sx={{ mr: 2 }} aria-label="comments">
                                            Change-log
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                                ws.send("install-toolkit");
                                                ws.onmessage = async function (evt) {
                                                    var messages = evt.data.split(':next:');
                                                    for (var i = 0; i < messages.length; i++) {
                                                        if (messages[i] === "Brunch-toolkit installed.") {
                                                            setIsUpdateDone(true)
                                                        }
                                                        setLogs(messages[i])
                                                    }
                                                }
                                            }}
                                            size="large" edge="end" variant="contained">
                                            Install / Update
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary="Brunch-Toolkit"
                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={isDialogOpen} minWidth="md" maxWidth="md">
                {!isUpdateDone && <LinearProgress color="secondary" />}
                <DialogTitle>Installing Addon...</DialogTitle>
                <DialogContent>
                    <Typography mb={1}>Please Don't close this application while installation is going on</Typography>
                    <Paper className='konsole' sx={{ background: 'black', color: 'white' }}>
                        {/* <Typography align='center'>LOGS</Typography> */}
                        <div dangerouslySetInnerHTML={{ __html: logs }} />
                    </Paper>
                </DialogContent>
                {isUpdateDone &&
                        <Button sx={{ m: 1 }} variant="contained" color="secondary" onClick={() => setIsDialogOpen(false)}>close</Button>
                }
            </Dialog>
        </div>
    );
};
export default Addons;
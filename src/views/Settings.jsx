import { Avatar, Card, CardContent, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Switch, Typography } from '@mui/material';
import SEO from '../components/SEO';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AlbumIcon from '@mui/icons-material/Album';
import OgIcon from '../Original.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@emotion/react';

const Settings = () => {

    const theme = useTheme()
    return (
        <div>
            <SEO title='Settings' />
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Stack spacing={2} direction={"row"}>
                                <Avatar
                                    alt="Brunch"
                                    src={OgIcon}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Stack direction={"column"}>
                                    <Stack spacing={2} direction={"row"}>
                                        <Typography variant='h5' sx={{ pt: 1 }}>Brunch PWA </Typography>
                                        <Typography variant='subtitle2' sx={{ pt: 1, ml: '4px !important', color: "#f2c300" }}>Version 2</Typography>
                                        <IconButton target="_blank" sx={{ ml: '4px !important'}} href="https://github.com/ITESaurabh/brunch-pwa-v2" size="small">
                                            <GitHubIcon />
                                        </IconButton>
                                    </Stack>
                                    <Typography variant='body1' sx={{ fontWeight: 500 }}> by <Link target="_blank" sx={{ color: theme.palette.secondary.main }} href="https://github.com/ITESaurabh">ITESaurabh</Link></Typography>
                                    <Typography variant='body1'>Special thanks to <Link target="_blank" sx={{ color: theme.palette.secondary.main }} href="https://github.com/sebanc">Sebanc</Link></Typography>
                                </Stack>



                            </Stack>
                            <Stack direction={"row"}>



                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Display update notifications for
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List
                        component={Paper}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-wifi" primary="Brunch stable releases" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                            // checked={checked.indexOf('wifi') !== -1}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentLateIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-bluetooth" primary="Brunch unstable releases" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                            // checked={checked.indexOf('wifi') !== -1}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AlbumIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-bluetooth" primary="ChromeOS recovery images" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                            // checked={checked.indexOf('wifi') !== -1}

                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default Settings;
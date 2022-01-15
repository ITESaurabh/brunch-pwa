import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Switch, Typography } from '@mui/material';
import SEO from '../components/SEO';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';

const Settings = () => {
    return (
        <div>
            <SEO title='Settings' />
            <Grid container xs={12} spacing={2}>
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
                                <WifiIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-wifi" primary="Brunch stable releases" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                                // checked={checked.indexOf('wifi') !== -1}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <BluetoothIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-bluetooth" primary="Brunch unstable releases" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                                // checked={checked.indexOf('wifi') !== -1}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-bluetooth',
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <BluetoothIcon />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-bluetooth" primary="ChromeOS recovery images" />
                            <Switch
                                edge="end"
                                onChange={() => null}
                                // checked={checked.indexOf('wifi') !== -1}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-bluetooth',
                                }}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default Settings;
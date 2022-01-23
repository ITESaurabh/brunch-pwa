import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import SEO from '../components/SEO';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { store } from '../utils/store';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const BrunchUp = () => {
    const { state } = useContext(store)
    console.log(state);
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
                                        <Button size="large" edge="end" variant="contained" disabled={state.latest_stable.replace(" stable", '') === state.brunch_version}>
                                            Update
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
                                        <Button size="large" edge="end" variant="contained">
                                            Update
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
        </div>
    );
};

export default BrunchUp;
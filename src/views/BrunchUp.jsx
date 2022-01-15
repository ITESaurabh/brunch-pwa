import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import SEO from '../components/SEO';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { store } from '../utils/store';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const BrunchUp = () => {
    const { state } = useContext(store)

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
                                Brunch r94 20211127
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
                                        <Button size="large" edge="end" variant="contained">
                                            Update
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary="Brunch r94 stable 20211121"
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
                                    primary="Brunch r97 unstable 20220112"
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
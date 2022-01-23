import { Button, Card, CardContent, Grid, ListItem, ListItemText, Typography } from '@mui/material';
import SEO from '../components/SEO';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useContext } from 'react';
import { store } from '../utils/store';
import { blue } from '@mui/material/colors';

const ChromoUp = () => {
    const { state } = useContext(store)

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
                                    primary={state.latest_chromeos}
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

export default ChromoUp;
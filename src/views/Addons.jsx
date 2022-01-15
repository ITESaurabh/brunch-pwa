import { Alert, Button, Card, CardContent, Grid, ListItem, ListItemText, Typography } from '@mui/material';
import SEO from '../components/SEO';

const Addons = () => {

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
                                    <Button size="large" edge="end" variant="contained">
                                        Install / Update
                                    </Button>
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
                                    <Button size="large" edge="end" variant="contained">
                                        Install / Update
                                    </Button>
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
        </div>
    );
};
export default Addons;
import { EngineerList } from '@components/engineer/engineerList';
import { Navbar } from '@components/navbar';
import { SubscriptionForm } from '@components/subscription/subscriptionForm';
import { Subscriptions } from '@components/subscription/subscriptions';
import { useEngineerList } from '@hooks/useEngineerList';
import { useSubscriptions } from '@hooks/useSubscriptions';
import { Box, Container, Grid, Typography } from '@mui/material';

function App() {
    const subscriptions = useSubscriptions();
    const engineers = useEngineerList(subscriptions.activeSubscription);

    return (
        <Container maxWidth="xl">
            <Navbar />
            <Box mt={3}>
                <Typography fontWeight={700} variant="h2">
                    Welcome to Dev Hunter
                </Typography>
            </Box>
            <Grid container spacing={3} my={3}>
                <Grid item xs={12} md={4} width={'300px'}>
                    <SubscriptionForm
                        onSubmit={subscriptions.handleAddSubscription}
                    />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Subscriptions
                        activeSubscription={subscriptions.activeSubscription}
                        subscriptions={subscriptions.subscriptions}
                        onActiveSubscriptionChange={
                            subscriptions.setActiveSubscription
                        }
                    />
                </Grid>
            </Grid>
            {subscriptions.activeSubscription && (
                <EngineerList
                    activeSubscription={subscriptions.activeSubscription}
                    engineers={engineers}
                />
            )}
        </Container>
    );
}

export default App;

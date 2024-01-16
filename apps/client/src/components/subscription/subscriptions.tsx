import { SubscriptionModel } from '@api/models';
import { SubscriptionCard } from '@components/subscription/subscriptionCard';
import { Box, Grid, Typography } from '@mui/material';

interface SubscriptionProps {
    activeSubscription?: SubscriptionModel;
    subscriptions: SubscriptionModel[];
    onActiveSubscriptionChange: (subscription: SubscriptionModel) => void;
}

export function Subscriptions(props: SubscriptionProps) {
    if (props.subscriptions.length === 0) {
        return (
            <Box
                display={'flex'}
                alignItems={'center'}
                height={'100%'}
                justifyContent={'center'}
            >
                <Box textAlign={'center'}>
                    <Typography variant="h3" fontWeight={700}>
                        No matchings
                    </Typography>
                    <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={350}
                    >
                        We will let you know when a match is found
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" fontWeight={500}>
                Your subscriptions
            </Typography>
            <Grid container spacing={3}>
                {props.subscriptions.map((subscription) => (
                    <Grid item xs={12} md={6} key={subscription.uuid}>
                        <SubscriptionCard
                            onActivate={props.onActiveSubscriptionChange}
                            subscription={subscription}
                            isActive={
                                props.activeSubscription?.uuid ===
                                subscription.uuid
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

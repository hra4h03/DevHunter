import { SubscriptionModel } from '@api/models';
import { SubscriptionChip } from '@components/subscription/subscriptionChip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';

interface SubscriptionCardProps {
    onActivate: (subscription: SubscriptionModel) => void;
    subscription: SubscriptionModel;
    isActive: boolean;
}

const format = (number: number) =>
    new Intl.NumberFormat('en-US').format(number);

export function SubscriptionCard(props: SubscriptionCardProps) {
    const { subscription, isActive, onActivate } = props;

    return (
        <Box
            onClick={() => onActivate(subscription)}
            sx={{ cursor: 'pointer' }}
        >
            <Paper
                id={subscription.uuid!}
                sx={{
                    p: 2,
                    borderRadius: 5,
                    backgroundColor: isActive ? green[50] : 'transparent',
                    borderColor: isActive ? green[500] : grey[500],
                    position: 'relative',
                }}
                variant="outlined"
            >
                {isActive && (
                    <IconButton sx={{ position: 'absolute', top: 2, right: 2 }}>
                        <CheckCircleIcon color="success" />
                    </IconButton>
                )}
                <Typography variant="h6" fontWeight={500}>
                    Tech Languages
                </Typography>
                <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                    {subscription.techLanguages?.map((x) => (
                        <SubscriptionChip name={x.name} key={x.id} />
                    ))}
                </Box>

                <Typography variant="h6" fontWeight={500}>
                    Experience
                </Typography>
                <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                    {subscription.experiences?.map((x) => (
                        <SubscriptionChip name={x.name} key={x.id} />
                    ))}
                </Box>

                <Typography variant="h6" fontWeight={500}>
                    Salary Range
                </Typography>
                <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                    <SubscriptionChip
                        name={`${format(subscription.minSalary)} - ${format(
                            subscription.maxSalary,
                        )} AMD`}
                    />
                </Box>

                <Typography variant="h6" fontWeight={500}>
                    Position
                </Typography>
                <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                    {subscription.positions?.map((x) => (
                        <SubscriptionChip name={x.name} key={x.id} />
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}

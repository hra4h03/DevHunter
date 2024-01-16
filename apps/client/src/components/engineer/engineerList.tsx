import { EngineerModel, SubscriptionModel } from '@api/models';
import { EngineerCard } from '@components/engineer/engineerCard';
import { Box, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface EngineerListProps {
    engineers: EngineerModel[];
    activeSubscription: SubscriptionModel;
}

export function EngineerList(props: EngineerListProps) {
    return (
        <Box>
            <Typography variant="h5" fontWeight={500} mb={2}>
                Candidates
            </Typography>
            {props.engineers.length === 0 ? (
                <Typography variant="body2" fontWeight={500} color={grey[500]}>
                    No engineers found with the given criteria
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {props.engineers.map((engineer) => (
                        <Grid item xs={12} md={6} lg={4} key={engineer.id}>
                            <EngineerCard
                                activeSubscription={props.activeSubscription}
                                engineer={engineer}
                                isNew={!!engineer.isNew}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

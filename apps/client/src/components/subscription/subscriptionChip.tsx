import { Chip } from '@mui/material';
import { grey } from '@mui/material/colors';

interface SubscriptionChipProps {
    name: string;
}

export function SubscriptionChip(props: SubscriptionChipProps) {
    return (
        <Chip
            label={props.name}
            variant="outlined"
            sx={{ mx: 0.5, mb: 0.5, bgcolor: grey[50] }}
        />
    );
}

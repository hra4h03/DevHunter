import { Chip } from '@mui/material';
import { green, grey } from '@mui/material/colors';

interface EngineerChipProps {
    active: boolean;
    name: string;
}

export function EngineerChip(props: EngineerChipProps) {
    return (
        <Chip
            variant="outlined"
            label={props.name}
            sx={{
                mx: 0.5,
                mb: 0.5,
                ...(props.active
                    ? {
                          bgcolor: green[50],
                          color: green[500],
                          borderColor: green[500],
                      }
                    : { bgcolor: grey[50] }),
            }}
        />
    );
}

import {
    EngineerModel,
    SubscriptionModel,
    TechLanguageModel,
} from '@api/models';
import { EngineerChip } from '@components/engineer/engineerChip';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Chip, IconButton, Paper, Typography } from '@mui/material';
import { grey, orange } from '@mui/material/colors';

interface EngineerCardProps {
    engineer: EngineerModel;
    activeSubscription: SubscriptionModel;
    isNew: boolean;
}

const format = (number: number) =>
    new Intl.NumberFormat('en-US').format(number);

export function EngineerCard(props: EngineerCardProps) {
    const { engineer, isNew, activeSubscription } = props;

    const isLanguageMatch = (language: TechLanguageModel) => {
        return activeSubscription.techLanguages?.some(
            (x) => x.id === language.id,
        );
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 5 }} variant="outlined">
            <Box display={'flex'} alignItems={'center'} mb={1}>
                <IconButton>
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <Typography variant="h5" fontWeight={500}>
                    {engineer.fullName}
                </Typography>
                <Box flexGrow={1} />
                {isNew && (
                    <Chip
                        label="New"
                        sx={{
                            bgcolor: orange[50],
                            color: grey[800],
                        }}
                    />
                )}
            </Box>
            <Typography variant="body1" fontWeight={500}>
                Tech Languages
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                {engineer.techLanguages?.map((x) => (
                    <EngineerChip
                        key={x.id}
                        name={x.name}
                        active={isLanguageMatch(x)}
                    />
                ))}
            </Box>

            <Typography variant="body1" fontWeight={500}>
                Experience
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                <EngineerChip
                    key={engineer.experience.id}
                    name={engineer.experience.name}
                    active
                />
            </Box>

            <Typography variant="body1" fontWeight={500}>
                Salary Range
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                <EngineerChip
                    name={`${format(engineer.minSalary)} - ${format(
                        engineer.maxSalary,
                    )} AMD`}
                    active
                />
            </Box>

            <Typography variant="body1" fontWeight={500}>
                Position
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} mb={3}>
                <EngineerChip name={engineer.position.name} active />
            </Box>
        </Paper>
    );
}

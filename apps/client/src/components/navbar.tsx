import { EngineerService } from '@api/services';
import { Box, Button } from '@mui/material';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export function Navbar() {
    const generateEngineers = useMutation(EngineerService.generateEngineers, {
        onSuccess() {
            toast.success('Engineers generated!');
        },
        onError() {
            toast.error('Failed to generate engineers!');
        },
    });

    return (
        <Box display="flex" justifyContent={'space-between'} my={2}>
            <img src="/DevHunter.svg" alt="DevHunter" />
            <Button
                variant="contained"
                onClick={() => generateEngineers.mutate()}
            >
                Generate new candidate
            </Button>
        </Box>
    );
}

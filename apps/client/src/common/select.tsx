import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import React from 'react';

interface SelectProps<T> {
    label: string;
    options: T[];
    getOptionLabel: (option: T) => string;
}

export function Select<T>({
    label,
    options,
    getOptionLabel,
    ...props
}: SelectProps<T> &
    Partial<
        Omit<React.ComponentProps<typeof Autocomplete>, 'getOptionLabel'>
    >) {
    return (
        <Box>
            <Typography fontWeight={500}>{label}</Typography>
            <Autocomplete
                size="small"
                multiple
                options={options}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                )}
                disableCloseOnSelect
                getOptionLabel={(option) => getOptionLabel(option as T)}
                {...props}
            />
        </Box>
    );
}

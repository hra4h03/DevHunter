import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import React from 'react';

interface SelectProps<T> {
    label: string;
    options: T[];
    error?: string;
    getOptionLabel: (option: T) => string;
}

export function Select<T>({
    label,
    options,
    getOptionLabel,
    error,
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
                    <TextField
                        {...params}
                        placeholder="Select"
                        {...(error
                            ? {
                                  helperText: (
                                      <Typography variant="caption" color="red">
                                          {error}
                                      </Typography>
                                  ),
                              }
                            : {})}
                    />
                )}
                disableCloseOnSelect
                getOptionLabel={(option) => getOptionLabel(option as T)}
                {...props}
            />
        </Box>
    );
}

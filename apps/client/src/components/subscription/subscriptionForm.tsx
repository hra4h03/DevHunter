import {
    ExperienceModel,
    PositionModel,
    SubscriptionModel,
    TechLanguageModel,
} from '@api/models';
import { Select } from '@common/select';
import { useEngineerMetadata } from '@hooks/useEngineerMetadata';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';

interface SubscriptionFormProps {
    onSubmit: (subscription: SubscriptionModel) => void;
}

interface Inputs {
    minSalary: number;
    maxSalary: number;
    experiences: ExperienceModel[];
    techLanguages: TechLanguageModel[];
    positions: PositionModel[];
}

export function SubscriptionForm(props: SubscriptionFormProps) {
    const [exprienceQuery, positionsQuery, techLanguageQuery] =
        useEngineerMetadata();

    const formik = useFormik<Partial<Inputs>>({
        initialValues: {
            experiences: [],
            techLanguages: [],
            positions: [],
        },
        onSubmit(data) {
            props.onSubmit({
                uuid: nanoid(),
                minSalary: data.minSalary!,
                maxSalary: data.maxSalary!,
                experiences: data.experiences || [],
                techLanguages: data.techLanguages || [],
                positions: data.positions || [],
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Select
                sx={{ mb: 2 }}
                label={'Tech Languages'}
                options={techLanguageQuery.data!}
                getOptionLabel={(x) => x.name}
                onChange={(_e, value) =>
                    formik.setFieldValue('techLanguages', value)
                }
            />

            <Select
                sx={{ mb: 2 }}
                label={'Experience'}
                options={exprienceQuery.data!}
                getOptionLabel={(x) => x.name}
                onChange={(_e, value) =>
                    formik.setFieldValue('experiences', value)
                }
            />

            <Box mb={2}>
                <Typography fontWeight={500}>Salary range</Typography>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <TextField
                        size="small"
                        type="number"
                        placeholder="e.g. 500000"
                        name="minSalary"
                        onChange={formik.handleChange}
                    />
                    <span>-</span>
                    <TextField
                        size="small"
                        type="number"
                        placeholder="e.g. 1000000"
                        name="maxSalary"
                        onChange={formik.handleChange}
                    />
                </Box>
            </Box>

            <Select
                sx={{ mb: 2 }}
                label={'Position'}
                options={positionsQuery.data!}
                getOptionLabel={(x) => x.name}
                onChange={(_e, value) =>
                    formik.setFieldValue('positions', value)
                }
            />

            <Button type="submit" variant="contained">
                Create subscription
            </Button>
        </form>
    );
}

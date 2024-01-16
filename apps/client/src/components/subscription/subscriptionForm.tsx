import {
    ExperienceModel,
    PositionModel,
    SubscriptionModel,
    TechLanguageModel,
} from '@api/models';
import { Select } from '@common/select';
import { MESSAGES } from '@configs/app.messages';
import { useEngineerMetadata } from '@hooks/useEngineerMetadata';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';

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

const nameAndIdSchema = yup.object({
    name: yup.string().required(),
    id: yup.number().required(),
});

const validationSchema = yup.object({
    minSalary: yup
        .number()
        .lessThan(
            yup.ref('maxSalary'),
            MESSAGES['minSalary.smaller.than.maxSalary'],
        )
        .required(MESSAGES['field.is.required']),
    maxSalary: yup.number().required(MESSAGES['field.is.required']),
    experiences: yup
        .array()
        .min(1, MESSAGES['field.is.required'])
        .of(nameAndIdSchema),
    techLanguages: yup
        .array()
        .min(1, MESSAGES['field.is.required'])
        .of(nameAndIdSchema),
    positions: yup
        .array()
        .min(1, MESSAGES['field.is.required'])
        .of(nameAndIdSchema),
});

export function SubscriptionForm(props: SubscriptionFormProps) {
    const [exprienceQuery, positionsQuery, techLanguageQuery] =
        useEngineerMetadata();

    const formik = useFormik<Partial<Inputs>>({
        initialValues: {
            experiences: [],
            techLanguages: [],
            positions: [],
        },
        validationSchema,
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
                error={formik.errors.techLanguages}
                onChange={(_e, value) =>
                    formik.setFieldValue('techLanguages', value)
                }
            />

            <Select
                sx={{ mb: 2 }}
                label={'Experience'}
                options={exprienceQuery.data!}
                getOptionLabel={(x) => x.name}
                error={formik.errors.experiences}
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
                {formik.errors.minSalary && (
                    <Typography ml={1.5} variant="caption" color={'red'}>
                        {formik.errors.minSalary}
                    </Typography>
                )}
            </Box>

            <Select
                sx={{ mb: 2 }}
                label={'Position'}
                options={positionsQuery.data!}
                getOptionLabel={(x) => x.name}
                error={formik.errors.positions}
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

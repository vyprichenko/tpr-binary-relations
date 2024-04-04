import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Model from '@/model/Model';

const ResultPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    padding: theme.spacing(2),
    marginBottom: 20
}));

const ResultsList = ({
    sortBy,
    validation
}: {
    sortBy: number[];
    validation: string[];
}): JSX.Element => (
    <>
        {[...Model.variants]
            .sort(
                (v1, v2) =>
                    sortBy[Model.variants.indexOf(v2)] -
                    sortBy[Model.variants.indexOf(v1)]
            )
            .map((variant, i) => (
                <ResultPaper
                    key={variant.id}
                    sx={i == 0 ? { backgroundColor: '#fff4b5' } : undefined}
                >
                    <i>
                        d<sub>{Model.variants.indexOf(variant) + 1}</sub>
                    </i>
                    <Typography fontSize="large">
                        {variant.toString()}
                    </Typography>
                    <Typography sx={{ width: '100%' }}>
                        {`Оцінка ${Number(
                            sortBy[Model.variants.indexOf(variant)].toFixed(3)
                        )}`}
                    </Typography>
                </ResultPaper>
            ))}
        {validation.map((message) => (
            <Alert
                key={message}
                variant="outlined"
                severity="error"
                sx={{ marginBottom: 2 }}
            >
                {message}
            </Alert>
        ))}
    </>
);

export default observer(ResultsList);

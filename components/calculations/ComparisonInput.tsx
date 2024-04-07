import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import DragHandleSharpIcon from '@mui/icons-material/DragHandleSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import Model from '@/model/Model';
import Comparison from '@/model/types/Comparison';
import VariantLabel from '@/components/VariantLabel';

const VariantPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    display: 'flex',
    gap: 5,
    padding: theme.spacing(2),
    textAlign: 'center',
    '& > p': {
        flexGrow: 1,
        textAlign: 'center'
    }
}));

const ComparisonRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty': {
        color: theme.palette.action.disabled
    },
    '& .MuiRating-iconFilled': {
        color: deepOrange[400]
    },
    '& .MuiRating-iconHover': {
        color: theme.palette.action.disabled
    }
}));

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    const icons = {
        1: <KeyboardArrowLeftSharpIcon fontSize="large" />,
        2: <DragHandleSharpIcon fontSize="large" />,
        3: <KeyboardArrowRightSharpIcon fontSize="large" />
    };
    return <span {...other}>{icons[value as keyof typeof icons]}</span>;
}

const ComparisonInput = ({
    comparison
}: {
    comparison: Comparison;
}): JSX.Element => {
    const handleChange = (event: any, value: number | null) => {
        Model.setComparisonValue(comparison, value ? value - 1 : null);
    };

    return (
        <Grid
            container
            sx={{ mb: 3 }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={4}>
                <VariantPaper>
                    <VariantLabel variant={comparison.variant1} />
                    <Typography fontSize="large">
                        {comparison.variant1.toString()}
                    </Typography>
                </VariantPaper>
            </Grid>
            <Grid
                item
                xs={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <ComparisonRating
                    name="comparison"
                    value={comparison.value + 1}
                    max={comparison.maxValue + 1}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={4}>
                <VariantPaper>
                    <VariantLabel variant={comparison.variant2} />
                    <Typography fontSize="large">
                        {comparison.variant2.toString()}
                    </Typography>
                </VariantPaper>
            </Grid>
        </Grid>
    );
};

export default observer(ComparisonInput);

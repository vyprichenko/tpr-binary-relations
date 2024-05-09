import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import DragHandleSharpIcon from '@mui/icons-material/DragHandleSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Model from '@/model/Model';
import Comparison from '@/model/types/Comparison';
import VariantLabel from '@/components/VariantLabel';
import VariantPaper from '@/components/VariantPaper';

const ComparisonRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty': {
        color: theme.palette.action.disabled
    },
    '& .MuiRating-iconFilled': {
        color: deepOrange[400]
    },
    '& .MuiRating-iconActive': {
        color: deepOrange[400]
    }
}));

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14
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

    const variantName1 = comparison.variant1.toString();
    const variantName2 = comparison.variant2.toString();

    return (
        <Grid
            container
            sx={{ mb: 3 }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={4}>
                <VariantPaper sx={{ alignItems: 'center' }}>
                    <VariantLabel variant={comparison.variant1} />
                    {variantName1.length <= 12 ? (
                        <Typography fontSize="large">{variantName1}</Typography>
                    ) : (
                        <LightTooltip title={variantName1}>
                            <span style={{ flexGrow: 1 }}>
                                <Button disabled sx={{ flexGrow: 1 }}>
                                    <MoreHorizOutlinedIcon fontSize="medium" />
                                </Button>
                            </span>
                        </LightTooltip>
                    )}
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
                <VariantPaper sx={{ alignItems: 'center' }}>
                    <VariantLabel variant={comparison.variant2} />
                    {variantName2.length <= 12 ? (
                        <Typography fontSize="large">{variantName2}</Typography>
                    ) : (
                        <LightTooltip title={variantName2}>
                            <span style={{ flexGrow: 1 }}>
                                <Button disabled>
                                    <MoreHorizOutlinedIcon fontSize="medium" />
                                </Button>
                            </span>
                        </LightTooltip>
                    )}
                </VariantPaper>
            </Grid>
        </Grid>
    );
};

export default observer(ComparisonInput);

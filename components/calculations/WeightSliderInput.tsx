import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider, { SliderValueLabelProps } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import VariantLabel from '@/components/VariantLabel';
import VariantPaper from '@/components/VariantPaper';
import Weight from '@/model/types/Weight';

const SliderTooltip = (props: SliderValueLabelProps) => {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
};

/**
 * Компонент для вводу вагомості даної альтернативи у вигляді слайдера.
 */
const WeightSliderInput = ({ weight }: { weight: Weight }): JSX.Element => {
    const onSliderChange = (e: Event, newValue: number | number[]) => {
        weight.value = newValue as number;
    };

    return (
        <VariantPaper>
            <VariantLabel variant={weight.variant} />
            <Box
                sx={{
                    ml: 1,
                    mr: 1,
                    gap: '0.5rem',
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}
            >
                <Typography
                    id="weight-input-slider"
                    color="text.primary"
                    sx={{ fontSize: 14, textAlign: 'left' }}
                >
                    {weight.variant.toString()}
                </Typography>
                <Slider
                    valueLabelDisplay="off"
                    slots={{
                        valueLabel: SliderTooltip
                    }}
                    aria-labelledby="weight-input-slider"
                    marks
                    min={0}
                    max={10}
                    value={weight.value}
                    onChange={onSliderChange}
                />
                <Typography sx={{ fontSize: 12, textAlign: 'left' }}>
                    {`Оцінка ${weight.value}. ${weight.toString()}.`}
                </Typography>
            </Box>
        </VariantPaper>
    );
};

export default observer(WeightSliderInput);

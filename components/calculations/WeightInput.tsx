import { observer } from 'mobx-react-lite';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Weight from '@/model/types/Weight';
import Model from '@/model/Model';

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+'
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ComparisonInput = ({ weight }: { weight: Weight }): JSX.Element => {
    return (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.primary">
                        <strong>{`A${
                            Model.variants.indexOf(weight.variant) + 1
                        }. `}</strong>
                        {weight.variant.toString()}
                    </Typography>
                    <Rating
                        sx={{ mt: 2 }}
                        size="small"
                        name="weight"
                        value={weight.value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, value) => {
                            weight.value = value || 0;
                        }}
                        emptyIcon={
                            <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                            />
                        }
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default observer(ComparisonInput);

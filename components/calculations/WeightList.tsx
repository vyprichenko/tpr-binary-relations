import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import WeightRatingInput from './WeightRatingInput';
import WeightSliderInput from './WeightSliderInput';
import Model from '@/model/Model';
import Expert from '@/model/types/Expert';

const WeightList = ({ expert }: { expert: Expert | null }): JSX.Element => (
    <>
        {Model.weightsMatrix
            .filter((weights) => weights[0].expert == expert || !expert)
            .map((weights, i) => (
                <Grid key={i} container sx={{ mb: 3 }} spacing={2}>
                    {weights.map((weight) => (
                        <Grid item key={weight.id} xs={12}>
                            <WeightSliderInput weight={weight} />
                        </Grid>
                    ))}
                </Grid>
            ))}
    </>
);

export default observer(WeightList);

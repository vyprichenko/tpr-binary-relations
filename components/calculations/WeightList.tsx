import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import WeightInput from './WeightInput';
import Model from '@/model/Model';

const WeightList = (): JSX.Element => {
    return (
        <>
            {Model.weightsMatrix.map((weights, i) => (
                <div key={i}>
                    {Model.weightsMatrix.length > 1 ? (
                        <Typography variant="subtitle1" gutterBottom>
                            Експерт{' '}
                            <strong>{weights[0].expert.toString()}</strong> дає
                            оцінку альтернативам:
                        </Typography>
                    ) : null}
                    {weights.map((weight) => (
                        <WeightInput key={weight.id} weight={weight} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default observer(WeightList);

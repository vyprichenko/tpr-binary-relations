import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Model from '@/model/Model';

const VariantPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    padding: theme.spacing(2),
    marginBottom: 20
}));

const VariantList = ({ sortBy }: { sortBy: number[] }): JSX.Element => (
    <>
        {[...Model.variants]
            .sort(
                (v1, v2) =>
                    sortBy[Model.variants.indexOf(v2)] -
                    sortBy[Model.variants.indexOf(v1)]
            )
            .map((variant, i) => (
                <VariantPaper key={variant.id}>
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
                </VariantPaper>
            ))}
    </>
);

export default observer(VariantList);


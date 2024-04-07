import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import Model from '@/model/Model';
import VariantListItem from './VariantListItem';

const VariantList = (): JSX.Element => (
    <Grid
        container
        sx={{ mb: 3 }}
        spacing={3}
        alignItems="center"
    >
        {[...Model.variants].map((variant) => (
            <Grid item key={variant.id} sm={6} xs={12}>
                <VariantListItem variant={variant} />
            </Grid>
        ))}
    </Grid>
);

export default observer(VariantList);

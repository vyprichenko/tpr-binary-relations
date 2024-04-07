'use client';

import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import Navigation from '@/components/Navigation';
import ResultsList from '@/components/results/ResultsList';
import Model from '@/model/Model';

const Results = () => {
    const order = Model.calculateOrder();
    const validation = Model.validateTriades(Model.experts[0]);
    return (
        <>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    {Model.variants.length > 1 &&
                    Model.experts.length > 0 &&
                    order != undefined ? (
                        <ResultsList sortBy={order} validation={validation} />
                    ) : (
                        <Alert severity="error">
                            Для порівняння необхідно не менше двох альтернатив.
                        </Alert>
                    )}
                </Grid>
            </Grid>
            <Navigation back />
        </>
    );
};

export default observer(Results);

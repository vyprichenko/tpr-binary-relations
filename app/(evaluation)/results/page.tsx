'use client';

import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Navigation from '@/components/Navigation';
import ResultsList from '@/components/results/ResultsList';
import ComparisonMatrix from '@/components/calculations/ComparisonMatrix';
import Model from '@/model/Model';

const WhiteAlert = styled(Alert)({
    backgroundColor: '#fff'
});

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
                        <ResultsList sortBy={order} />
                    ) : (
                        <Alert severity="error">
                            Для порівняння необхідно не менше двох альтернатив.
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={10}>
                    {Model.comparisonsMatrix.map((comparisons, i) => (
                        <ComparisonMatrix
                            key={`comparisons_${i}`}
                            comparisons={comparisons}
                        />
                    ))}
                </Grid>
                <Grid item xs={10}>
                    {validation.map(([type, message]) => (
                        <WhiteAlert
                            key={message}
                            variant="outlined"
                            severity={type}
                            sx={{ mb: 2, py: 0 }}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        </WhiteAlert>
                    ))}
                </Grid>
            </Grid>
            <Navigation back />
        </>
    );
};

export default observer(Results);

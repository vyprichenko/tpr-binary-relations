'use client';

import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Navigation from '@/components/Navigation';
import ExpertSelect from '@/components/calculations/ExpertSelect';
import CalculationMethodRadio from '@/components/calculations/CalculationMethodRadio';
import ComparisonList from '@/components/calculations/ComparisonList';
import WeightList from '@/components/calculations/WeightList';
import CalculationMethod from '@/types/CalculationMethod';
import Model from '@/model/Model';

const Calculations = () => {
    const { currentExpert } = Model;

    if (Model.variants.length > 1 && Model.experts.length > 0)
        return (
            <>
                <Grid container spacing={4} justifyContent="center">
                    {Model.experts.length > 1 ? (
                        <>
                            <Grid item md={4} xs={10}>
                                <ExpertSelect
                                    value={currentExpert}
                                    onChange={(expert) => {
                                        Model.currentExpert = expert;
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={10}>
                                <CalculationMethodRadio />
                            </Grid>
                        </>
                    ) : null}
                    <Grid item xs={10}>
                        {Model.calcMethod == CalculationMethod.Comparison ? (
                            <ComparisonList expert={currentExpert} />
                        ) : (
                            <WeightList expert={currentExpert} />
                        )}
                    </Grid>
                </Grid>
                <Navigation to="/results" back />
            </>
        );

    return (
        <>
            <Grid item xs={10}>
                <Alert severity="error">
                    Для порівняння необхідно не менше двох альтернатив та
                    принаймні один експерт.
                </Alert>
            </Grid>
            <Navigation to="/results" back />
        </>
    );
};

export default observer(Calculations);

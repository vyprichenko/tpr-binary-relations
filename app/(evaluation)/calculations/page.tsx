'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Navigation from '@/components/Navigation';
import CalculationMethodRadio from '@/components/calculations/CalculationMethodRadio';
import ComparisonList from '@/components/calculations/ComparisonList';
import WeightList from '@/components/calculations/WeightList';
import CalculationMethod from '@/types/CalculationMethod';
import Model from '@/model/Model';

const Calculations = () => {
    const router = useRouter();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    if (Model.variants.length > 1 && Model.experts.length > 0)
        return (
            <>
                <Grid container spacing={4} justifyContent="center">
                    {Model.experts.length > 1 ? (
                        <Grid item xs={10}>
                            <CalculationMethodRadio />
                        </Grid>
                    ) : null}
                    <Grid item xs={10}>
                        {Model.calcMethod == CalculationMethod.Comparison ? (
                            <ComparisonList />
                        ) : (
                            <WeightList />
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

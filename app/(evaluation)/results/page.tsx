'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Navigation from '@/components/Navigation';
import ResultsList from '@/components/results/ResultsList';
import Model from '@/model/Model';
import styles from './page.module.css';

const Results = () => {
    const order = Model.calculateOrder();
    return (
        <>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
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
            </Grid>
            <Navigation back />
        </>
    );
};

export default observer(Results);

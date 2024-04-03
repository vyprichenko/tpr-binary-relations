'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navigation from '@/components/Navigation';
import ExpertCard from '@/components/experts/ExpertCard';
import ExpertDialog from '@/components/experts/ExpertDialog';
import Model from '@/model/Model';
import styles from './page.module.css';

const Experts = () => {
    const router = useRouter();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Grid container spacing={4}>
                {Model.experts.length > 0 ? (
                    Model.experts.map((expert) => (
                        <Grid item key={expert.id} xs={12} sm={6}>
                            <ExpertCard expert={expert} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Alert severity="info">Запросіть експертів.</Alert>
                    </Grid>
                )}
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button
                        variant="contained"
                        onClick={handleDialogOpen}
                        disabled={Model.experts.length >= Model.expertsLimit}
                    >
                        Запросити
                    </Button>
                </Grid>
            </Grid>
            <Navigation to="/calculations" back />
            <ExpertDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
        </>
    );
};

export default observer(Experts);

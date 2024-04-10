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
            <Grid container spacing={4} justifyContent="center">
                {Model.experts.length > 0 ? (
                    <Grid
                        item
                        container
                        xs={10}
                        sx={{ mb: 3 }}
                        spacing={3}
                        alignItems="center"
                    >
                        {Model.experts.map((expert) => (
                            <Grid item key={expert.id} xs={12} sm={6}>
                                <ExpertCard expert={expert} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid item xs={10}>
                        <Alert severity="info">Запросіть експертів.</Alert>
                    </Grid>
                )}
                <Grid
                    item
                    xs={10}
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

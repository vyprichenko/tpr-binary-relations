'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Navigation from '@/components/Navigation';
import VariantList from '@/components/variants/VariantList';
import VariantDialog from '@/components/variants/VariantDialog';
import Model from '@/model/Model';
import styles from './page.module.css';

const Variants = () => {
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
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    {Model.variants.length > 0 ? (
                        <VariantList />
                    ) : (
                        <Alert severity="info">
                            Додайте варіанти для порівняння.
                        </Alert>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button
                        variant="contained"
                        onClick={handleDialogOpen}
                        disabled={Model.variants.length >= Model.variantsLimit}
                    >
                        Додати
                    </Button>
                </Grid>
            </Grid>
            <Navigation to="/calculations" />
            <VariantDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
        </>
    );
};

export default observer(Variants);

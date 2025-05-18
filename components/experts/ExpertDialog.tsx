import { useState, ChangeEvent, SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Model from '@/model/Model';
import Expert from '@/model/types/Expert';

/**
 * Діалогове вікно для додавання нового експерта.
 */
const ExpertDialog = ({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}): JSX.Element => {
    const [name, setName] = useState(Expert.generateName());
    const [knowlege, setKnowlege] = useState(0);
    const [theory, setTheory] = useState(0);
    const [experience, setExperience] = useState(0);
    const [literature, setLiterature] = useState(0);
    const [intuition, setIntuition] = useState(0);

    const handleNameChange = (e: ChangeEvent) => {
        setName((e.target as HTMLInputElement).value);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        Model.addExpert(
            name,
            knowlege,
            theory,
            experience,
            literature,
            intuition
        );
        setName('');
        setKnowlege(0);
        setTheory(0);
        setExperience(0);
        setLiterature(0);
        setIntuition(0);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Новий експерт</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Запросіть експерта, який допоможе з оцінкою альтернатив.
                        Достатньо одного експерта, але можна створити групу до
                        {` ${Model.expertsLimit} `}
                        осіб, які діятимуть незалежно, а результати їх роботи
                        будуть зважені згідно кваліфікації.
                    </DialogContentText>
                    <Grid container rowSpacing={2} columnSpacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Ім'я"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} justifyContent="center">
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                sx={{
                                    mb: 2,
                                    '& > legend': { mt: 2 }
                                }}
                            >
                                <Typography component="legend">
                                    Ступінь знайомства з проблемою
                                </Typography>
                                <Rating
                                    name="knowlege"
                                    size="large"
                                    precision={0.5}
                                    value={knowlege * 10}
                                    onChange={(e, value) => {
                                        setKnowlege((value ?? 0) / 10);
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="expert-theory">
                                    Теоретичний аналіз
                                </InputLabel>
                                <Select
                                    labelId="expert-theory"
                                    value={
                                        theory ? theory.toString() : undefined
                                    }
                                    onChange={(e: SelectChangeEvent) => {
                                        setTheory(+e.target.value);
                                    }}
                                    label="theory"
                                >
                                    <MenuItem value="0.3">Високий</MenuItem>
                                    <MenuItem value="0.2">Середній</MenuItem>
                                    <MenuItem value="0.1">Низький</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="expert-experience">
                                    Досвід роботи
                                </InputLabel>
                                <Select
                                    labelId="expert-experience"
                                    value={
                                        experience
                                            ? experience.toString()
                                            : undefined
                                    }
                                    onChange={(e: SelectChangeEvent) => {
                                        setExperience(+e.target.value);
                                    }}
                                    label="experience"
                                >
                                    <MenuItem value="0.5">Високий</MenuItem>
                                    <MenuItem value="0.4">Середній</MenuItem>
                                    <MenuItem value="0.2">Низький</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="expert-literature">
                                    Література
                                </InputLabel>
                                <Select
                                    labelId="expert-literature"
                                    value={
                                        literature
                                            ? literature.toString()
                                            : undefined
                                    }
                                    onChange={(e: SelectChangeEvent) => {
                                        setLiterature(+e.target.value);
                                    }}
                                    label="literature"
                                >
                                    <MenuItem value="0.1">Високий</MenuItem>
                                    <MenuItem value="0.08">Середній</MenuItem>
                                    <MenuItem value="0.04">Низький</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="expert-intuition">
                                    Інтуїція
                                </InputLabel>
                                <Select
                                    labelId="expert-intuition"
                                    value={
                                        intuition
                                            ? intuition.toString()
                                            : undefined
                                    }
                                    onChange={(e: SelectChangeEvent) => {
                                        setIntuition(+e.target.value);
                                    }}
                                    label="intuition"
                                >
                                    <MenuItem value="0.05">Високий</MenuItem>
                                    <MenuItem value="0.04">Середній</MenuItem>
                                    <MenuItem value="0.02">Низький</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={onClose}>
                        Скасувати
                    </Button>
                    <Button type="submit" disabled={name == ''}>
                        Запросити
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ExpertDialog;

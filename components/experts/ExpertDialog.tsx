import { useState, ChangeEvent, SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Model from '@/model/Model';
import JobPosition from '@/types/JobPosition';
import AcademicDegree from '@/types/AcademicDegree';
import Expert from '@/model/types/Expert';

const ExpertDialog = ({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}): JSX.Element => {
    const defaultJob = JobPosition.LeadingEngeneer;
    const defaultDegree = AcademicDegree.NonDegreeSpecialist;
    const [name, setName] = useState(Expert.generateName());
    const [exp, setExp] = useState(1);
    const [job, setJob] = useState<JobPosition>(defaultJob);
    const [degree, setDegree] = useState<AcademicDegree>(defaultDegree);

    const handleNameChange = (e: ChangeEvent) => {
        setName((e.target as HTMLInputElement).value);
    };

    const handleExpChange = (e: ChangeEvent) => {
        setExp(+(e.target as HTMLInputElement).value);
    };

    const handleJobChange = (e: SelectChangeEvent) => {
        setJob(e.target.value as JobPosition);
    };

    const handleDegreeChange = (e: SelectChangeEvent) => {
        setDegree(e.target.value as AcademicDegree);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        Model.addExpert(
            name,
            exp,
            job as JobPosition,
            degree as AcademicDegree
        );
        setName('');
        setJob(defaultJob);
        setDegree(defaultDegree);
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
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="exp-job-position-label">
                                    Посада
                                </InputLabel>
                                <Select
                                    labelId="exp-job-position-label"
                                    value={job}
                                    onChange={handleJobChange}
                                    label="jobPosition"
                                >
                                    {Object.entries(JobPosition).map(
                                        ([key, value]) => (
                                            <MenuItem key={key} value={value}>
                                                {value}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="standard"
                                sx={{ width: '100%' }}
                            >
                                <InputLabel id="exp-job-academic-degree">
                                    Науковий ступінь
                                </InputLabel>
                                <Select
                                    labelId="exp-job-academic-degree"
                                    value={degree}
                                    onChange={handleDegreeChange}
                                    label="academicDegree"
                                >
                                    {Object.entries(AcademicDegree).map(
                                        ([key, value]) => (
                                            <MenuItem key={key} value={value}>
                                                {value}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                label="Досвід роботи (років)"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={exp}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    min: 1,
                                    max: 99
                                }}
                                onChange={handleExpChange}
                            />
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

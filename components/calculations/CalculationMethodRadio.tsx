import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CalculationMethod from '@/types/CalculationMethod';
import Model from '@/model/Model';

const RowRadioButtonsGroup = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Model.calcMethod = +(e.target as HTMLInputElement).value;
    };

    return (
        <FormControl variant="standard">
            <FormLabel id="cm-group-label">Метод порівняння</FormLabel>
            <RadioGroup
                row
                aria-labelledby="cm-group-label"
                name="cm"
                value={Model.calcMethod}
                onChange={handleChange}
            >
                <FormControlLabel
                    value={CalculationMethod.Comparison}
                    control={<Radio size="small" />}
                    label="Парне порівняння"
                />
                <FormControlLabel
                    value={CalculationMethod.Weight}
                    control={<Radio size="small" />}
                    label="Зважування"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default observer(RowRadioButtonsGroup);

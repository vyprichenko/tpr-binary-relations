import { observer } from 'mobx-react-lite';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Model from '@/model/Model';
import Expert from '@/model/types/Expert';

/**
 * Компонент вибору експерта.
 */
const ExpertSelect = ({
    value,
    onChange
}: {
    value: Expert | null;
    onChange: (value: Expert | null) => void;
}) => (
    <FormControl
        variant="standard"
        sx={{ width: '100%', '& > label + *': { mt: '0 !important' } }}
    >
        <FormLabel id="expert-select">Експерт</FormLabel>
        <Select
            labelId="expert-select"
            value={value?.id}
            onChange={(e: SelectChangeEvent) => {
                onChange(
                    Model.experts.find(
                        (expert) => expert.id == e.target.value
                    ) ?? null
                );
            }}
            label="expert"
        >
            {Model.experts.map((expert) => (
                <MenuItem key={expert.id} value={expert.id}>
                    {expert.toString()}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default observer(ExpertSelect);

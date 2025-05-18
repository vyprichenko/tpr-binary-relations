import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Model from '@/model/Model';

/**
 * Діалогове вікно для додавання альтернативи порівняння.
 */
const VariantDialog = ({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}): JSX.Element => {
    const [name, setName] = useState('');

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    Model.addVariant(name);
                    onClose();
                }}
            >
                <DialogTitle>Нова альтернатива</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Додайте до{` ${Model.variantsLimit} `}альтернативних
                        варіантів вибору, які будуть далі оцінені одним, або
                        кількома експертами для виявлення найкращого.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Назва"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={onClose}>
                        Скасувати
                    </Button>
                    <Button type="submit" disabled={name == ''}>
                        Створити
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default VariantDialog;

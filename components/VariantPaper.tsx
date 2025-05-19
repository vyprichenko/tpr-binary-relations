import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

/**
 * Елемент-обгортка з інформацією про альтернативу.
 * Являє собою додатково стилізований компонент Paper.
 */
const VariantPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    display: 'flex',
    gap: 5,
    padding: theme.spacing(2),
    textAlign: 'center',
    '& > p': {
        flexGrow: 1,
        textAlign: 'center'
    }
}));

export default VariantPaper;

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';

/**
 * Кнопки "Далі / Назад" для навігації по сторінкам додатку.
 */
const Navigation = ({
    to,
    back = false
}: {
    to?: string;
    back?: boolean;
}): JSX.Element => {
    const router = useRouter();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
            {back ? (
                <Button
                    size="large"
                    onClick={() => router.back()}
                    startIcon={<ChevronLeftIcon />}
                >
                    Назад
                </Button>
            ) : null}
            <Box sx={{ flex: '1 1 auto' }} />
            {to ? (
                <Button
                    size="large"
                    onClick={() => router.push(to)}
                    endIcon={<ChevronRightIcon />}
                >
                    Далі
                </Button>
            ) : null}
        </Box>
    );
};

export default Navigation;

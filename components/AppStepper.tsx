import { observer } from 'mobx-react-lite';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Model from '@/model/Model';

const AppStepper = (): JSX.Element => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper
                nonLinear
                activeStep={Model.steps.findIndex(
                    ({ link }) => link == pathname
                )}
                alternativeLabel
            >
                {Model.steps.map(({ link, label }) => (
                    <Step key={link}>
                        <StepButton onClick={() => router.push(link)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default observer(AppStepper);

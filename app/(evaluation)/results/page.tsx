'use client';

import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Navigation from '@/components/Navigation';
import ExpertSelect from '@/components/calculations/ExpertSelect';
import ResultsList from '@/components/results/ResultsList';
import ComparisonsEquation from '@/components/results/ComparisonsEquation';
import ComparisonMatrix from '@/components/calculations/ComparisonMatrix';
import Model from '@/model/Model';
import CalculationMethod from '@/types/CalculationMethod';

const WhiteAlert = styled(Alert)({
    backgroundColor: '#fff'
});

const Results = () => {
    const currentExpert =
        Model.calcMethod == CalculationMethod.Comparison
            ? Model.currentExpert
            : null;

    const order = currentExpert
        ? Model.calculateOrder(currentExpert)
        : Model.calculateWeights();

    const validation = currentExpert
        ? Model.validateTriades(currentExpert)
        : [];

    const handleWeightCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        Model.considerExpertWeight = event.target.checked;
    };

    return (
        <>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                {Model.experts.length > 1 &&
                Model.calcMethod == CalculationMethod.Comparison ? (
                    <>
                        <Grid item md={4} xs={10} justifySelf="flex-start">
                            <ExpertSelect
                                value={currentExpert}
                                onChange={(expert) => {
                                    Model.currentExpert = expert;
                                }}
                            />
                        </Grid>
                        <Grid item md={6}></Grid>
                    </>
                ) : null}
                {Model.experts.length > 1 &&
                Model.calcMethod == CalculationMethod.Weight ? (
                    <>
                        <Grid item xs={10} justifySelf="flex-start">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={Model.considerExpertWeight}
                                            onChange={
                                                handleWeightCheckboxChange
                                            }
                                        />
                                    }
                                    label="Врахувати компетентність експертів"
                                />
                            </FormGroup>
                        </Grid>
                    </>
                ) : null}
                {Model.variants.length > 1 && order ? (
                    <>
                        <Grid item xs={10}>
                            <ResultsList
                                expert={currentExpert}
                                sortBy={order}
                            />
                        </Grid>
                        {currentExpert ? (
                            <Grid item xs={10}>
                                <ComparisonMatrix
                                    comparisons={
                                        Model.comparisonsMatrix[
                                            Model.experts.indexOf(currentExpert)
                                        ]
                                    }
                                />
                            </Grid>
                        ) : null}
                        {validation.length > 0 ? (
                            <Grid item xs={10}>
                                <ComparisonsEquation sortBy={order} />
                                {validation.map(([type, message]) => (
                                    <WhiteAlert
                                        key={message}
                                        variant="outlined"
                                        severity={type}
                                        sx={{ mb: 1, py: 0 }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: message
                                            }}
                                        />
                                    </WhiteAlert>
                                ))}
                            </Grid>
                        ) : null}
                    </>
                ) : (
                    <Alert severity="error">
                        Для порівняння необхідно не менше двох альтернатив та
                        принаймні один експерт.
                    </Alert>
                )}
            </Grid>
            <Navigation back />
        </>
    );
};

export default observer(Results);

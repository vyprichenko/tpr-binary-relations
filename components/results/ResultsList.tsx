import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box, CardActionArea, CardContent } from '@mui/material';
import { Grid } from '@mui/material';
import Model from '@/model/Model';
import ValidationResult from '@/types/ValidationResult';
import VariantLabel from '@/components/VariantLabel';

const ResultCard = styled(Card)({
    '& .MuiCardHeader-action': {
        alignSelf: 'center'
    },
    '& .MuiCardContent-root': {
        paddingTop: 0
    }
});

const ResultsList = ({
    sortBy,
    validation
}: {
    sortBy: number[];
    validation: ValidationResult[];
}): JSX.Element => {
    const [isCollapsed, setCollapsed] = useState(true);
    return (
        <>
            <Grid
                container
                sx={{ mb: 3 }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
            >
                {[...Model.variants]
                    .sort(
                        (v1, v2) =>
                            sortBy[Model.variants.indexOf(v2)] -
                            sortBy[Model.variants.indexOf(v1)]
                    )
                    .map((variant, i) => {
                        const comparisonResults = Model.findComparisons(
                            Model.experts[0],
                            variant,
                            undefined,
                            true
                        )
                            .sort((c1, c2) => c2.value - c1.value)
                            .map((c) => c.toString())
                            .filter((c) => c);

                        return (
                            <Grid item key={variant.id} xs={12}>
                                <ResultCard>
                                    <CardActionArea
                                        onClick={() =>
                                            setCollapsed(!isCollapsed)
                                        }
                                    >
                                        <CardHeader
                                            avatar={
                                                <VariantLabel
                                                    variant={variant}
                                                />
                                            }
                                            title={variant.toString()}
                                            titleTypographyProps={{
                                                variant: 'body1'
                                            }}
                                            action={
                                                <Box
                                                    sx={{
                                                        typography: 'body1',
                                                        p: 1
                                                    }}
                                                >
                                                    Оцінка{' '}
                                                    <strong>
                                                        {Number(
                                                            sortBy[
                                                                Model.variants.indexOf(
                                                                    variant
                                                                )
                                                            ].toFixed(3)
                                                        )}
                                                    </strong>
                                                </Box>
                                            }
                                        />
                                        {comparisonResults.length > 0 ? (
                                            <Collapse in={!isCollapsed}>
                                                <CardContent>
                                                    {comparisonResults.map(
                                                        (c) => (
                                                            <Typography
                                                                key={c}
                                                                variant="body2"
                                                            >
                                                                {c}
                                                            </Typography>
                                                        )
                                                    )}
                                                </CardContent>
                                            </Collapse>
                                        ) : null}
                                    </CardActionArea>
                                </ResultCard>
                            </Grid>
                        );
                    })}
            </Grid>
            {validation.map(([type, message]) => (
                <Alert
                    key={message}
                    variant="outlined"
                    severity={type || 'info'}
                    sx={{ marginBottom: 2 }}
                >
                    {message}
                </Alert>
            ))}
        </>
    );
};

export default observer(ResultsList);

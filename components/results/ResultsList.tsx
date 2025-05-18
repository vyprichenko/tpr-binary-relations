import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box, CardActionArea, CardContent } from '@mui/material';
import { Grid } from '@mui/material';
import VariantLabel from '@/components/VariantLabel';
import Model from '@/model/Model';
import Expert from '@/model/types/Expert';

const ResultCard = styled(Card)({
    '& .MuiCardHeader-action': {
        alignSelf: 'flex-start',
        marginTop: 0
    },
    '& .MuiCardContent-root': {
        paddingTop: 0
    },
    '& .MuiCardHeader-avatar': {
        fontSize: '1rem',
        alignSelf: 'flex-start'
    }
});

/**
 * Звіт з виконання порівнянь експертами.
 */
const ResultsList = ({
    expert,
    sortBy
}: {
    expert: Expert | null;
    sortBy: number[];
}): JSX.Element => {
    const [isCollapsed, setCollapsed] = useState(true);
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {[...Model.variants]
                .sort(
                    (v1, v2) =>
                        sortBy[Model.variants.indexOf(v2)] -
                        sortBy[Model.variants.indexOf(v1)]
                )
                .map((variant, r) => {
                    const comparisonResults = expert
                        ? Model.findComparisons(
                              expert,
                              variant,
                              undefined,
                              true
                          )
                              .sort((c1, c2) => c2.value - c1.value)
                              .map((c) => c.toString())
                              .filter((c) => c)
                        : [];

                    const value = Number(
                        sortBy[Model.variants.indexOf(variant)].toFixed(3)
                    );
                    const n = Model.variants.length;
                    const a = (2 * (n + 1 - (r + 1))) / (n * (n + 1));

                    return (
                        <Grid item key={variant.id} xs={12}>
                            <ResultCard>
                                <CardActionArea
                                    onClick={() => setCollapsed(!isCollapsed)}
                                >
                                    <CardHeader
                                        avatar={
                                            <VariantLabel variant={variant} />
                                        }
                                        title={variant.toString()}
                                        titleTypographyProps={{
                                            variant: 'body1'
                                        }}
                                        action={
                                            <Box
                                                sx={{
                                                    typography: 'body1',
                                                    p: 0,
                                                    px: 1
                                                }}
                                            >
                                                Оцінка <strong>{value}</strong>
                                            </Box>
                                        }
                                    />
                                    <Collapse in={!isCollapsed}>
                                        {comparisonResults.length > 0 ? (
                                            <CardContent>
                                                {comparisonResults.map((c) => (
                                                    <Typography
                                                        key={c}
                                                        variant="body2"
                                                    >
                                                        {c}
                                                    </Typography>
                                                ))}
                                            </CardContent>
                                        ) : (
                                            <CardContent
                                                sx={{ display: 'flex', gap: 2 }}
                                            >
                                                <Typography variant="body2">
                                                    <i>
                                                        M<sub>j</sub>
                                                    </i>{' '}
                                                    = {value}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <i>
                                                        R<sub>j</sub>
                                                    </i>{' '}
                                                    = {r + 1}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <i>
                                                        λ<sub>j</sub>
                                                    </i>{' '}
                                                    = {Number(a.toFixed(3))}
                                                </Typography>
                                            </CardContent>
                                        )}
                                    </Collapse>
                                </CardActionArea>
                            </ResultCard>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default observer(ResultsList);

import React from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import { blue, blueGrey } from '@mui/material/colors';
import Model from '@/model/Model';
import Comparison from '@/model/types/Comparison';
import VariantLabel from '@/components/VariantLabel';

const GridSpan = styled('span')(({ theme }) => {
    return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${blueGrey[300]}`,
        borderRadius: 2,
        backgroundColor: theme.palette.mode == 'dark' ? blueGrey[300] : 'white'
    };
});

const GridSpanFilled = styled(GridSpan)(({ theme }) => ({
    backgroundColor: theme.palette.mode == 'dark' ? blueGrey[500] : blue[50]
}));

/**
 * Результат порівнянь у вигляді матриці.
 */
const ComparisonMatrix = ({
    comparisons
}: {
    comparisons: Comparison[];
}): JSX.Element => {
    const { variants } = Model;
    return (
        <div
            // prettier-ignore
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${variants.length + 2}, minmax(2rem, 1fr))`,
                gridAutoRows: `2rem`,
                gap: 4
            }}
        >
            <GridSpanFilled>–</GridSpanFilled>
            {variants.map((v) => (
                <GridSpanFilled key={v.id}>
                    <VariantLabel variant={v} />
                </GridSpanFilled>
            ))}
            <GridSpanFilled>
                <i>
                    &sum;d<sub>ij</sub>
                </i>
            </GridSpanFilled>
            {variants.map((v, vi) =>
                comparisons
                    .filter(({ variant1 }) => variant1 == v)
                    .map((c, ci, ciArr) => (
                        <React.Fragment key={`matrix_comp_${c.id}`}>
                            {ci == 0 ? (
                                <GridSpanFilled>
                                    <VariantLabel variant={v} />
                                </GridSpanFilled>
                            ) : null}
                            <GridSpan>{c.toStringValue()}</GridSpan>
                            {ci == ciArr.length - 1 ? (
                                <GridSpanFilled>
                                    {ciArr
                                        .reduce(
                                            (sum, cii) =>
                                                (sum += cii.valueOf()),
                                            0
                                        )
                                        .toString()}
                                </GridSpanFilled>
                            ) : null}
                        </React.Fragment>
                    ))
            )}
        </div>
    );
};

export default observer(ComparisonMatrix);

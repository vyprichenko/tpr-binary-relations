import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { blueGrey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import Model from '@/model/Model';
import Comparison from '@/model/types/Comparison';
import VariantLabel from '@/components/VariantLabel';

const GridSpan = ({
    children,
    fill = false
}: {
    children?: ReactNode;
    fill?: boolean;
}): JSX.Element => {
    const style = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${blueGrey[300]}`,
        borderRadius: 2,
        backgroundColor: fill ? blue[50] : 'white'
    };
    return <span style={children ? style : undefined}>{children}</span>;
};

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
            <GridSpan fill>–</GridSpan>
            {variants.map((v) => (
                <GridSpan key={v.id} fill>
                    <VariantLabel variant={v} />
                </GridSpan>
            ))}
            <GridSpan fill>
                <i>
                    &sum;d<sub>ij</sub>
                </i>
            </GridSpan>
            {variants.map((v, vi) =>
                comparisons
                    .filter(({ variant1 }) => variant1 == v)
                    .map((c, ci, ciArr) => (
                        <React.Fragment key={`matrix_comp_${c.id}`}>
                            {ci == 0 ? (
                                <GridSpan fill>
                                    <VariantLabel variant={v} />
                                </GridSpan>
                            ) : null}
                            <GridSpan>{c.toStringValue()}</GridSpan>
                            {ci == ciArr.length - 1 ? (
                                <GridSpan fill>
                                    {ciArr
                                        .reduce(
                                            (sum, cii) =>
                                                (sum += cii.valueOf()),
                                            0
                                        )
                                        .toString()}
                                </GridSpan>
                            ) : null}
                        </React.Fragment>
                    ))
            )}
        </div>
    );
};

export default observer(ComparisonMatrix);

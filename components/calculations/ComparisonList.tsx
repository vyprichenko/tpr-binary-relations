import React from 'react';
import { observer } from 'mobx-react-lite';
import ComparisonInput from './ComparisonInput';
import Model from '@/model/Model';
import Expert from '@/model/types/Expert';

/**
 * Перелік всіх виконаних порівнянь.
 */
const ComparisonList = ({ expert }: { expert: Expert | null }): JSX.Element => {
    return (
        <>
            {Model.comparisonsMatrix.map((comparisons, i) => (
                <React.Fragment key={`comparisons_${i}`}>
                    <div>
                        {comparisons
                            .filter((c) => c.expert == expert || !expert)
                            .filter((c) => c.variant1 != c.variant2)
                            .filter(
                                (c, i, carr) =>
                                    !carr
                                        .slice(0, i)
                                        .find((c1) => c != c1 && c.matches(c1))
                            )
                            .map((comparison) => (
                                <ComparisonInput
                                    key={`${comparison.id}_${i}`}
                                    comparison={comparison}
                                />
                            ))}
                    </div>
                </React.Fragment>
            ))}
        </>
    );
};

export default observer(ComparisonList);

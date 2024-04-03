import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ComparisonInput from './ComparisonInput';
import ComparisonMatrix from './ComparisonMatrix';
import Model from '@/model/Model';

const ComparisonList = (): JSX.Element => {
    return (
        <>
            {Model.comparisonsMatrix.map((comparisons, i) => (
                <React.Fragment key={`comparisons_${i}`}>
                    <div>
                        {comparisons
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
                    <ComparisonMatrix comparisons={comparisons} />
                    <Box sx={{ mb: 4 }} />
                </React.Fragment>
            ))}
        </>
    );
};

export default observer(ComparisonList);


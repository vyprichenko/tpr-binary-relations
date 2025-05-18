import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Model from '@/model/Model';
import Variant from '@/model/types/Variant';

/**
 * Математичний запис виконаного порівняння.
 */
const ComparisonsEquation = ({ sortBy }: { sortBy: number[] }): JSX.Element => (
    <Box sx={{ p: 0, mb: 4, fontSize: 20, textAlign: 'center' }}>
        {[...Model.variants]
            .map((v, vi): [Variant, number, number] => [v, vi, sortBy[vi]])
            .sort(([v1, vi1, s1], [v2, vi2, s2]) => s2 - s1)
            .map(([v, vi, s], i, vsArr) => {
                let sign = '';
                if (i > 0) {
                    if (s > vsArr[i - 1][2]) sign = ' < ';
                    if (s < vsArr[i - 1][2]) sign = ' > ';
                    else sign = ' ≅ ';
                }
                return (
                    <React.Fragment key={i}>
                        {sign}
                        <i>d</i>
                        <small>
                            <sub>{vi + 1}</sub>
                        </small>
                    </React.Fragment>
                );
            })}
    </Box>
);

export default observer(ComparisonsEquation);

import React from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import Model from '@/model/Model';
import Variant from '@/model/types/Variant';

const VariantInfo = styled('i')(({ theme }) => ({
    cursor: 'help',
    '&:hover': {
        color: theme.palette.action.active
    }
}));

/**
 * Спливаюча підказка з назвою альтернативи.
 */
const VariantLabel = ({ variant }: { variant: Variant }): JSX.Element => {
    const { variants } = Model;
    return (
        <VariantInfo title={variant.name}>
            d<sub>{variants.indexOf(variant) + 1}</sub>
        </VariantInfo>
    );
};

export default observer(VariantLabel);

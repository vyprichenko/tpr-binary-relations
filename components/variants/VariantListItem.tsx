import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Variant from '@/model/types/Variant';
import Model from '@/model/Model';
import VariantLabel from '@/components/VariantLabel';

const VariantListItem = ({ variant }: { variant: Variant }): JSX.Element => (
    <Card key={variant.id}>
        <CardHeader
            sx={{ alignItems: 'flex-start' }}
            avatar={<VariantLabel variant={variant} />}
            title={variant.toString()}
            titleTypographyProps={{ variant: 'body1' }}
            action={
                <IconButton
                    aria-label="remove"
                    onClick={() => Model.removeVariant(variant)}
                >
                    <ClearIcon />
                </IconButton>
            }
        />
    </Card>
);

export default VariantListItem;

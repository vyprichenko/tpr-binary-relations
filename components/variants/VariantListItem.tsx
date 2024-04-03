import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Variant from '@/model/types/Variant';
import Model from '@/model/Model';

const VariantListItem = ({
    variant,
    index
}: {
    variant: Variant;
    index: number;
}): JSX.Element => (
    <Card key={variant.id} sx={{ mb: 2 }}>
        <CardHeader
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

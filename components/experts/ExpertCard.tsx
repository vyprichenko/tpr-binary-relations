import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Expert from '@/model/types/Expert';
import Model from '@/model/Model';

/**
 * Блок для відображення основної інформації про залученого експерта.
 */
const ExpertCard = ({ expert }: { expert: Expert }): JSX.Element => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        alt={expert.name}
                        src={`https://i.pravatar.cc/150?u=${expert.id}`}
                    />
                }
                action={
                    <IconButton
                        title="Звільнити"
                        aria-label="remove"
                        onClick={() => Model.removeExpert(expert)}
                    >
                        <ClearIcon />
                    </IconButton>
                }
                title={expert.toString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {`Компетентність: ${Number(expert.weight.toFixed(2))}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ExpertCard;

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
import JobPosition from '@/types/JobPosition';
import AcademicDegree from '@/types/AcademicDegree';
import declension from '@/utils/declension';

const ExpertCard = ({ expert }: { expert: Expert }): JSX.Element => {
    const job =
        Object.entries(JobPosition).find(
            ([key]) => key == expert.jobPosition
        )?.[1] ?? JobPosition.LeadingEngeneer;

    const degree =
        Object.entries(AcademicDegree).find(
            ([key]) => key == expert.academicDegree
        )?.[1] ?? AcademicDegree.NonDegreeSpecialist;

    const experience = (() => {
        if (expert.experience > 50) return `більше 50 років`;
        if (expert.experience < 1) return `менше року`;

        return `${expert.experience} ${declension({
            number: expert.experience,
            f0: 'рік',
            f1: 'року',
            f2: 'років'
        })}`;
    })();

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
                subheader={expert.academicDegree.toString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`Займає посаду "${expert.jobPosition}", досвід роботи ${experience}.`}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
                    {`Вага оцінки: ${Number(
                        Model.expertsWeights[expert.id].toFixed(2)
                    )}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ExpertCard;

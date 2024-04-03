import { observer } from 'mobx-react-lite';
import Model from '@/model/Model';
import VariantListItem from './VariantListItem';

const VariantList = (): JSX.Element => (
    <>
        {[...Model.variants].map((variant, i) => (
            <VariantListItem key={variant.id} variant={variant} index={i} />
        ))}
    </>
);

export default observer(VariantList);

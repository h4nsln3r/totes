import { useTranslation } from 'react-i18next';
import { Gig } from '../../../../types/gigs';

type Props = {
  gigs: Gig[];
  emptyText?: string;
};

const LiveList = ({ gigs, emptyText = 'Inga gigs för tillfället…' }: Props) => {
  const { t } = useTranslation();

  const text = emptyText ?? t('live.empty');

  if (!gigs || gigs.length === 0) {
    return <div className="live__empty">{text}</div>;
  }

  return (
    <ul className="live__list">
      {gigs.map((gig, i) => (
        <li key={i} className="live__item">
          <span className="live__date">{gig.date}</span>
          <span className="live__venue">{gig.venue}</span>
        </li>
      ))}
    </ul>
  );
};

export default LiveList;

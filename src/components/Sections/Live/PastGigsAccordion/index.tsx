import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { Gig } from '../../../../types/gigs';
import { heightExpandVariants } from '../../../../constants/animations';
import LiveList from '../LiveList';
import './past-gigs.scss';

type Props = {
  gigs: Gig[];
  title?: string;
  defaultOpen?: boolean;
};

const PastGigsAccordion = ({ gigs, title = 'Tidigare spelningar', defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  if (!gigs.length) return null;

  return (
    <div className="past-gigs">
      <button type="button" className="past-gigs__toggle" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        {open ? <SlArrowUp /> : <SlArrowDown />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            className="past-gigs__content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={heightExpandVariants}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <LiveList gigs={gigs} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastGigsAccordion;

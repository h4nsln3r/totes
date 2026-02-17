import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaExternalLinkAlt, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Gig } from "../../../../types/gigs";

type Props = {
  gigs: Gig[];
  emptyText?: string;
};

const variants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

const LiveList = ({ gigs, emptyText = "Inga gigs för tillfället…" }: Props) => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const text = emptyText ?? t("live.empty");

  if (!gigs || gigs.length === 0) {
    return <div className="live__empty">{text}</div>;
  }

  const formatDate = (dateStr: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split("-");
      const months = [
        "jan", "feb", "mar", "apr", "maj", "jun",
        "jul", "aug", "sep", "okt", "nov", "dec",
      ];
      return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
    }
    return dateStr;
  };

  return (
    <ul className="live__list">
      {gigs.map((gig, i) => {
        const isExpanded = expandedIndex === i;
        const hasDetails =
          gig.city ||
          gig.time ||
          gig.adress ||
          gig.link ||
          gig.facebookLink;

        return (
          <li
            key={`${gig.date}-${gig.venue}-${i}`}
            className={`live__item ${isExpanded ? "live__item--expanded" : ""}`}
          >
            <button
              type="button"
              className="live__item-header"
              onClick={() =>
                setExpandedIndex((prev) => (prev === i ? null : i))
              }
              aria-expanded={isExpanded}
              aria-controls={`gig-details-${i}`}
              id={`gig-header-${i}`}
            >
              <span className="live__date">{formatDate(gig.date)}</span>
              <span className="live__venue">{gig.venue}</span>
              {hasDetails && (
                <span className="live__item-chevron" aria-hidden>
                  {isExpanded ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              )}
            </button>

            {hasDetails && (
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`gig-details-${i}`}
                    role="region"
                    aria-labelledby={`gig-header-${i}`}
                    className="live__item-detail"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={variants}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="live__item-detail-inner">
                      {gig.city && (
                        <p className="live__item-row">
                          <span className="live__item-label">{t("live.city")}</span>
                          <span className="live__item-value">{gig.city}</span>
                        </p>
                      )}
                      {gig.adress && (
                        <p className="live__item-row">
                          <span className="live__item-label">{t("live.address")}</span>
                          <span className="live__item-value">{gig.adress}</span>
                        </p>
                      )}
                      {gig.time && (
                        <p className="live__item-row">
                          <span className="live__item-label">{t("live.time")}</span>
                          <span className="live__item-value">{gig.time}</span>
                        </p>
                      )}
                      <div className="live__item-links">
                        {gig.link && (
                          <a
                            href={gig.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="live__item-link"
                          >
                            <FaExternalLinkAlt aria-hidden />
                            {t("live.eventLink")}
                          </a>
                        )}
                        {gig.facebookLink && (
                          <a
                            href={gig.facebookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="live__item-link live__item-link--facebook"
                          >
                            <FaFacebook aria-hidden />
                            Facebook
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default LiveList;

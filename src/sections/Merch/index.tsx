import { useTranslation } from "react-i18next";
import SectionWrapper from "..";
import { MERCH_PRODUCTS } from "../../data/merch";

import "./merch.scss";

const Merch = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper sectionName="merch">
      <h2 className="section__title">{t("merch.title")}</h2>
      <p className="merch__intro">{t("merch.intro")}</p>

      <div className="merch__grid">
        {MERCH_PRODUCTS.map((product) => {
          const hasLink = Boolean(product.stripePaymentLink?.trim());
          return (
            <article key={product.id} className="merch__card">
              <div className="merch__card-image-wrap">
                <img
                  src={product.image}
                  alt=""
                  className="merch__card-image"
                  loading="lazy"
                />
              </div>
              <div className="merch__card-body">
                <h3 className="merch__card-title">{t(product.nameKey)}</h3>
                <p className="merch__card-desc">{t(product.descriptionKey)}</p>
                <p className="merch__card-price">{t(product.priceKey)}</p>
                {hasLink ? (
                  <a
                    href={product.stripePaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="merch__card-cta"
                  >
                    {t("merch.buy")}
                  </a>
                ) : (
                  <span className="merch__card-cta merch__card-cta--disabled">
                    {t("merch.comingSoon")}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="merch__shipping">{t("merch.shipping")}</p>
    </SectionWrapper>
  );
};

export default Merch;

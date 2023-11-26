import styles from "./PlanCard.module.css";
import { ColorVariant, iPricingCardProps } from "@/interfaces";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks";
import { useTranslation } from "react-i18next";

export const PlanCard = ({
  name,
  price,
  offers,
  terms,
  disabled = false,
  onChoose,
}: iPricingCardProps) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const choosen = name.toLowerCase() === user?.role;

  return (
    <div className={styles.pricingCardContainer}>
      <div className={styles.pricingCardContent}>
        <div className={styles.pricingCardHeader}>
          <div className={styles.pricingCardName}>{name}</div>
          <div className={styles.pricingCardPrice}>{price}</div>
        </div>
        <ul className={styles.pricingCardOffers}>
          {offers.map((text, ind) => (
            <li key={ind} className={styles.pricingCardOffer}>
              {text}
            </li>
          ))}
        </ul>
        <ul className={styles.pricingCardTerms}>
          <div className={styles.pricingCardTermsTitle}>TERMS</div>
          {terms.map((text, ind) => (
            <li key={ind} className={styles.pricingCardTerm}>
              {text}
            </li>
          ))}
        </ul>
        <div className={styles.pricingCardButton}>
          <Button
            className="fill-container"
            text={choosen ? t("pricing.choosen") : t("pricing.choose")}
            variant={choosen ? ColorVariant.black : ColorVariant.white}
            disabled={disabled}
            onClick={onChoose}
          />
        </div>
      </div>
    </div>
  );
};

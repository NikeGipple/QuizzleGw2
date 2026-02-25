import "./styles.sass";
import { useTranslation } from "react-i18next";

export const TrueFalseClient = ({onSubmit}) => {
    const { t } = useTranslation();

    return (
        <div className="true-false-client">
            <div
                className="true-false-option true-option"
                onClick={() => onSubmit([0])}
                role="button"
                tabIndex={0}
                aria-label={t("trueFalseClient.true")}
            >
                <span>{t("trueFalseClient.true")}</span>
            </div>

            <div
                className="true-false-option false-option"
                onClick={() => onSubmit([1])}
                role="button"
                tabIndex={0}
                aria-label={t("trueFalseClient.false")}
            >
                <span>{t("trueFalseClient.false")}</span>
            </div>
        </div>
    );
};
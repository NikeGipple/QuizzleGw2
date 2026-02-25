import "./styles.sass";
import { useTranslation } from "react-i18next";

export const QuestionPreview = ({question, isActive, onClick}) => {
    const { t } = useTranslation();

    return (
        <div className={`question-preview${isActive ? " preview-active" : ""}`} onClick={onClick}>
            <h3>{question || t("quizCreator.questionPreview.noTitle")}</h3>
        </div>
    )
}
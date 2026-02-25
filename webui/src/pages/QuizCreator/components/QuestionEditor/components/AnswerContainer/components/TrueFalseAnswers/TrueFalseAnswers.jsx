import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const TrueFalseAnswers = ({answers, onChange}) => {
    const { t } = useTranslation();

    const updateAnswer = (index, isCorrect) => {
        const newAnswers = [...answers];

        newAnswers[0] = {...newAnswers[0], is_correct: index === 0 ? isCorrect : false};
        newAnswers[1] = {...newAnswers[1], is_correct: index === 1 ? isCorrect : false};

        onChange(newAnswers);
    };

    return (
        <div className="true-false-container">
            <div
                className={`true-false-answer true-false-true ${answers[0]?.is_correct ? 'selected' : ''}`}
                onClick={() => updateAnswer(0, true)}
            >
                <span>{t("trueFalseClient.true")}</span>
                <FontAwesomeIcon icon={faCheckCircle} className={`check-icon ${answers[0]?.is_correct ? 'correct' : ''}`}/>
            </div>

            <div
                className={`true-false-answer true-false-false ${answers[1]?.is_correct ? 'selected' : ''}`}
                onClick={() => updateAnswer(1, true)}
            >
                <span>{t("trueFalseClient.false")}</span>
                <FontAwesomeIcon icon={faCheckCircle} className={`check-icon ${answers[1]?.is_correct ? 'correct' : ''}`}/>
            </div>
        </div>
    );
};
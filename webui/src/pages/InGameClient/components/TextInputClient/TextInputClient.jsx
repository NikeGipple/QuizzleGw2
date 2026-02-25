import "./styles.sass";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const TextInputClient = ({onSubmit, maxLength = 200}) => {
    const [textAnswer, setTextAnswer] = useState("");
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (textAnswer.trim() !== "") {
            onSubmit(textAnswer.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const canSubmit = textAnswer.trim() !== "";

    return (
        <div className="text-input-client">
            <div className="text-input-container">
                <textarea
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t("textInputClient.placeholder")}
                    maxLength={maxLength}
                    className="text-answer-input"
                />
                <div className="character-count">
                    {textAnswer.length}/{maxLength}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`submit-text-answer ${canSubmit ? "submit-shown" : ""}`}
                aria-label={t("textInputClient.submit")}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};
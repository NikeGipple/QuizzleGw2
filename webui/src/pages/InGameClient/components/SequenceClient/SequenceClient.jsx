import "./styles.sass";
import {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faGripVertical, faSort} from "@fortawesome/free-solid-svg-icons";
import {Reorder, AnimatePresence, motion} from "framer-motion";
import { useTranslation } from "react-i18next";

export const SequenceClient = ({question, onSubmit}) => {
    const [sortableAnswers, setSortableAnswers] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (question && question.answers && Array.isArray(question.answers) && question.answers.length > 0) {
            const answersWithDisplayId = question.answers.map((answer, index) => ({
                ...answer,
                displayId: `client-${index}-${Math.random().toString(36).substring(2, 9)}`
            }));
            setSortableAnswers(answersWithDisplayId);
            setHasSubmitted(false);
        } else {
            setSortableAnswers([]);
            setHasSubmitted(false);
        }
    }, [question]);

    const handleSubmit = () => {
        if (hasSubmitted) return;

        const answerOrder = sortableAnswers.map(answer => answer.originalIndex);
        setHasSubmitted(true);
        onSubmit(answerOrder);
    };

    const canSubmit = sortableAnswers.length > 0 && !hasSubmitted;

    if (!question || !question.answers) {
        return (
            <div className="sequence-client">
                <div className="sequence-instructions">
                    <FontAwesomeIcon icon={faSort} className="sequence-icon" />
                    <span>{t("sequenceClient.waitingForQuestion")}</span>
                </div>
            </div>
        );
    }

    if (typeof question.answers === 'number') {
        return (
            <div className="sequence-client">
                <div className="sequence-instructions">
                    <FontAwesomeIcon icon={faSort} className="sequence-icon" />
                    <span>{t("sequenceClient.loadingTask")}</span>
                </div>
                <div className="sequence-error">
                    <p>{t("sequenceClient.errors.needsContents")}</p>
                    <p>{t("sequenceClient.errors.usePracticeMode")}</p>
                </div>
            </div>
        );
    }

    if (!Array.isArray(question.answers) || question.answers.length === 0) {
        return (
            <div className="sequence-client">
                <div className="sequence-instructions">
                    <FontAwesomeIcon icon={faSort} className="sequence-icon" />
                    <span>{t("sequenceClient.noAnswers")}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="sequence-client">
            <div className="sequence-instructions">
                <FontAwesomeIcon icon={faSort} className="sequence-icon" />
                <span>{t("sequenceClient.instructions")}</span>
            </div>

            <Reorder.Group
                as="div"
                className="sequence-list"
                values={sortableAnswers}
                onReorder={setSortableAnswers}
            >
                <AnimatePresence initial={false}>
                    {sortableAnswers.map((answer, index) => (
                        <Reorder.Item
                            key={answer.displayId}
                            value={answer}
                            style={{listStyleType: "none"}}
                        >
                            <motion.div
                                className="sequence-item"
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                whileDrag={{scale: 1.05}}
                            >
                                <div className="drag-handle">
                                    <FontAwesomeIcon icon={faGripVertical} />
                                </div>
                                <div className="sequence-number">{index + 1}</div>
                                <div className="sequence-content">
                                    {answer.type === "image" ? (
                                        <img
                                            src={answer.content}
                                            alt={t("sequenceClient.answerAlt", { n: index + 1 })}
                                            className="sequence-answer-image"
                                        />
                                    ) : (
                                        <span className="sequence-answer-text">{answer.content}</span>
                                    )}
                                </div>
                            </motion.div>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            <div className="submit-container">
                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`submit-sequence ${canSubmit ? "submit-shown" : ""}`}
                    aria-label={t("sequenceClient.submit")}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
};
import "./styles.sass";
import SelectBox from "@/common/components/SelectBox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faInfinity, faCoins} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import { useTranslation } from "react-i18next";

export const QuestionSettings = ({question, onChange}) => {
    const { t } = useTranslation();

    const [selectedTimer, setSelectedTimer] = useState(() => {
        if (question.timer === undefined || question.timer === null) return "default";
        if (question.timer === -1) return "unlimited";
        if (question.timer === 30) return "30";
        if (question.timer === 120) return "120";
        return "custom";
    });

    const [selectedPointMultiplier, setSelectedPointMultiplier] = useState(() => {
        if (question.pointMultiplier === undefined || question.pointMultiplier === null) return "standard";
        return question.pointMultiplier;
    });

    const timerOptions = [
        {
            value: "default",
            label: t("quizCreator.questionSettings.timer.options.default.label"),
            description: t("quizCreator.questionSettings.timer.options.default.description"),
            icon: faClock
        },
        {
            value: "30",
            label: t("quizCreator.questionSettings.timer.options.s30.label"),
            description: t("quizCreator.questionSettings.timer.options.s30.description"),
            icon: faClock
        },
        {
            value: "120",
            label: t("quizCreator.questionSettings.timer.options.s120.label"),
            description: t("quizCreator.questionSettings.timer.options.s120.description"),
            icon: faClock
        },
        {
            value: "unlimited",
            label: t("quizCreator.questionSettings.timer.options.unlimited.label"),
            description: t("quizCreator.questionSettings.timer.options.unlimited.description"),
            icon: faInfinity
        }
    ];

    const pointMultiplierOptions = [
        {
            value: "standard",
            label: t("quizCreator.questionSettings.points.options.standard.label"),
            description: t("quizCreator.questionSettings.points.options.standard.description"),
            icon: faCoins
        },
        {
            value: "none",
            label: t("quizCreator.questionSettings.points.options.none.label"),
            description: t("quizCreator.questionSettings.points.options.none.description"),
            icon: faCoins
        },
        {
            value: "double",
            label: t("quizCreator.questionSettings.points.options.double.label"),
            description: t("quizCreator.questionSettings.points.options.double.description"),
            icon: faCoins
        }
    ];

    useEffect(() => {
        if (question.timer === undefined || question.timer === null) {
            setSelectedTimer("default");
        } else if (question.timer === -1) {
            setSelectedTimer("unlimited");
        } else if (question.timer === 30) {
            setSelectedTimer("30");
        } else if (question.timer === 120) {
            setSelectedTimer("120");
        } else {
            setSelectedTimer("custom");
        }

        if (question.pointMultiplier === undefined || question.pointMultiplier === null) {
            setSelectedPointMultiplier("standard");
        } else {
            setSelectedPointMultiplier(question.pointMultiplier);
        }
    }, [question.timer, question.pointMultiplier]);

    const handleTimerChange = (value) => {
        setSelectedTimer(value);

        let timerNum;
        if (value === "default") {
            timerNum = undefined;
        } else if (value === "unlimited") {
            timerNum = -1;
        } else if (value === "30") {
            timerNum = 30;
        } else if (value === "120") {
            timerNum = 120;
        }

        onChange({...question, timer: timerNum});
    };

    const handlePointMultiplierChange = (value) => {
        setSelectedPointMultiplier(value);
        const multiplierValue = value === "standard" ? undefined : value;
        onChange({...question, pointMultiplier: multiplierValue});
    };

    if (!question) return null;

    return (
        <motion.div
            className="question-settings"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.25, delay: 0.2, ease: "easeOut"}}
        >
            <div className="settings-header">
                <h3>{t("quizCreator.questionSettings.title")}</h3>
            </div>

            <div className="setting-group">
                <div className="setting-label">
                    <FontAwesomeIcon icon={faClock}/>
                    <span>{t("quizCreator.questionSettings.timer.label")}</span>
                </div>

                <SelectBox
                    value={selectedTimer}
                    onChange={handleTimerChange}
                    options={timerOptions}
                    placeholder={t("quizCreator.questionSettings.timer.placeholder")}
                />
            </div>

            <div className="setting-group">
                <div className="setting-label">
                    <FontAwesomeIcon icon={faCoins}/>
                    <span>{t("quizCreator.questionSettings.points.label")}</span>
                </div>

                <SelectBox
                    value={selectedPointMultiplier}
                    onChange={handlePointMultiplierChange}
                    options={pointMultiplierOptions}
                    placeholder={t("quizCreator.questionSettings.points.placeholder")}
                />
            </div>
        </motion.div>
    );
};
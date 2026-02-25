import "./styles.sass";
import {useContext, useEffect, useState} from "react";
import {QuizContext} from "@/common/contexts/Quiz";
import {useNavigate} from "react-router-dom";
import Scoreboard from "@/pages/InGameHost/components/Scoreboard/index.js";
import AnalyticsTabs from "@/common/components/AnalyticsTabs";
import Button from "@/common/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar, faTrophy, faDownload} from "@fortawesome/free-solid-svg-icons";
import {useSoundManager} from "@/common/utils/SoundManager.js";
import SoundRenderer from "@/common/components/SoundRenderer";
import {exportLiveQuizToExcel} from "@/common/utils/ExcelExport";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const EndingHost = () => {
    const {isLoaded, scoreboard} = useContext(QuizContext);
    const navigate = useNavigate();
    const soundManager = useSoundManager();
    const [activeView, setActiveView] = useState('scoreboard');
    const [analyticsData, setAnalyticsData] = useState(null);
    const [hasPlayedEndingSound, setHasPlayedEndingSound] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (!isLoaded) {
            navigate("/load");
            return;
        }

        if (scoreboard?.analytics) {
            setAnalyticsData(scoreboard.analytics);
        }
    }, [isLoaded, scoreboard]);

    useEffect(() => {
        if (!isLoaded) return;

        if (!hasPlayedEndingSound) {
            const timer = setTimeout(() => {
                soundManager.playCelebration('GAME_COMPLETE');
                setHasPlayedEndingSound(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isLoaded, soundManager, hasPlayedEndingSound]);

    const handleExportToExcel = () => {
        if (!analyticsData) {
            toast.error(t("endingHost.toast.noAnalyticsToExport"));
            return;
        }

        try {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            const quizName = `LiveQuiz_${timestamp}`;
            const filename = exportLiveQuizToExcel(analyticsData, quizName);
            toast.success(t("endingHost.toast.exportSuccess", { filename }));
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error(t("endingHost.toast.exportError"));
        }
    };

    const viewTabs = [
        {id: 'scoreboard', title: t("endingHost.tabs.results"), icon: faTrophy},
        {id: 'analytics', title: t("endingHost.tabs.analytics"), icon: faChartBar}
    ];

    return (
        <div className="ending-page">
            <SoundRenderer/>

            <div className="view-toggle">
                {viewTabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`toggle-button ${activeView === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveView(tab.id)}
                    >
                        <FontAwesomeIcon icon={tab.icon}/>
                        <span>{tab.title}</span>
                    </button>
                ))}
            </div>

            {activeView === 'analytics' && analyticsData && (
                <div className="export-button-container">
                    <Button
                        text={t("endingHost.actions.downloadExcel")}
                        icon={faDownload}
                        onClick={handleExportToExcel}
                        type="compact green"
                    />
                </div>
            )}

            {activeView === 'scoreboard' && (
                <Scoreboard
                    isEnd
                    nextQuestion={() => {}}
                    scoreboard={Object.values(scoreboard?.scoreboard || {})}
                />
            )}

            {activeView === 'analytics' && analyticsData && (
                <div className="analytics-container">
                    <AnalyticsTabs
                        analyticsData={analyticsData}
                        quizData={null}
                        isLiveQuiz={true}
                    />
                </div>
            )}

            {activeView === 'analytics' && !analyticsData && (
                <div className="no-analytics">
                    <p>{t("endingHost.noAnalytics")}</p>
                </div>
            )}
        </div>
    )
}
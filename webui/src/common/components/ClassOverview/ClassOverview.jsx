import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faQuestionCircle,
  faChartLine,
  faExclamationTriangle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import StatCard from '../StatCard';
import './styles.sass';
import { useTranslation } from "react-i18next";

const ClassOverview = ({ analyticsData, isLiveQuiz }) => {
  const { classAnalytics, questionAnalytics } = analyticsData;
  const { t } = useTranslation();

  const difficultyDistribution = questionAnalytics.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="class-overview">
      <div className="stats-grid">
        <StatCard
          icon={faUsers}
          title={t("classOverview.stats.participants")}
          value={classAnalytics.totalStudents}
          color="blue"
        />
        <StatCard
          icon={faQuestionCircle}
          title={t("classOverview.stats.questions")}
          value={classAnalytics.totalQuestions}
          color="green"
        />
        <StatCard
          icon={faChartLine}
          title={t("classOverview.stats.avgAccuracy")}
          value={`${classAnalytics.averageAccuracy}%`}
          color={
            classAnalytics.averageAccuracy >= 80 ? 'green' :
            classAnalytics.averageAccuracy >= 60 ? 'orange' : 'red'
          }
        />
        <StatCard
          icon={faExclamationTriangle}
          title={t("classOverview.stats.hardQuestions")}
          value={classAnalytics.questionsNeedingReview}
          color={classAnalytics.questionsNeedingReview > 0 ? 'red' : 'green'}
        />
      </div>

      <div className="difficulty-section">
        <h3>{t("classOverview.difficulty.title")}</h3>
        <div className="difficulty-overview">
          <div className="difficulty-stats">
            <div className="difficulty-item easy">
              <div className="difficulty-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="difficulty-info">
                <span className="difficulty-label">{t("classOverview.difficulty.easy")}</span>
                <span className="difficulty-count">
                  {t("classOverview.difficulty.questionsCount", { count: difficultyDistribution.easy || 0 })}
                </span>
              </div>
            </div>

            <div className="difficulty-item medium">
              <div className="difficulty-icon">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
              <div className="difficulty-info">
                <span className="difficulty-label">{t("classOverview.difficulty.medium")}</span>
                <span className="difficulty-count">
                  {t("classOverview.difficulty.questionsCount", { count: difficultyDistribution.medium || 0 })}
                </span>
              </div>
            </div>

            <div className="difficulty-item hard">
              <div className="difficulty-icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <div className="difficulty-info">
                <span className="difficulty-label">{t("classOverview.difficulty.hard")}</span>
                <span className="difficulty-count">
                  {t("classOverview.difficulty.questionsCount", { count: difficultyDistribution.hard || 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="difficulty-summary">
            <div className="summary-text">
              {classAnalytics.questionsNeedingReview > 0 ? (
                <span className="needs-review">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {t("classOverview.summary.needsReview", { count: classAnalytics.questionsNeedingReview })}
                </span>
              ) : (
                <span className="all-good">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  {t("classOverview.summary.allGood")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLiveQuiz && (
        <div className="live-quiz-info">
          <strong>{t("classOverview.live.avgPoints", { points: classAnalytics.averageScore })}</strong>
        </div>
      )}
    </div>
  );
};

export default ClassOverview;
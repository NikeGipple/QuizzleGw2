import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheckCircle,
  faUsers,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import './styles.sass';
import { useTranslation } from "react-i18next";

const RecommendationsTab = ({analyticsData}) => {
  const {classAnalytics, questionAnalytics, studentAnalytics} = analyticsData;
  const { t } = useTranslation();

  const recommendations = [];

  const strugglingStudents = studentAnalytics.filter(s => s.needsAttention);
  const hardQuestions = questionAnalytics.filter(q => q.needsReview);

  if (strugglingStudents.length > 0) {
    recommendations.push({
      type: 'urgent',
      icon: faExclamationTriangle,
      title: t("recommendations.studentsNeedHelp", { count: strugglingStudents.length }),
      students: strugglingStudents.map(s => ({ name: s.name, accuracy: s.accuracy }))
    });
  }

  if (hardQuestions.length > 0) {
    recommendations.push({
      type: 'warning',
      icon: faQuestionCircle,
      title: t("recommendations.hardQuestions", { count: hardQuestions.length }),
      questions: hardQuestions.map(q => ({ n: q.questionIndex + 1, pct: q.correctPercentage }))
    });
  }

  if (classAnalytics.averageAccuracy < 60) {
    recommendations.push({
      type: 'urgent',
      icon: faUsers,
      title: t("recommendations.lowClassPerformance.title", { pct: classAnalytics.averageAccuracy }),
      action: t("recommendations.lowClassPerformance.action")
    });
  } else if (classAnalytics.averageAccuracy >= 80) {
    recommendations.push({
      type: 'success',
      icon: faCheckCircle,
      title: t("recommendations.goodClassPerformance.title", { pct: classAnalytics.averageAccuracy }),
      action: t("recommendations.goodClassPerformance.action")
    });
  }

  return (
    <div className="recommendations-tab">
      {recommendations.length > 0 ? (
        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-card ${rec.type}`}>
              <div className="recommendation-header">
                <FontAwesomeIcon
                  icon={rec.icon}
                  className={`recommendation-icon ${rec.type}`}
                />
                <h3>{rec.title}</h3>
              </div>

              <div className="recommendation-content">
                {rec.action && (
                  <p className="recommendation-action">{rec.action}</p>
                )}

                {rec.students && (
                  <div className="recommendation-details">
                    <h4>{t("recommendations.labels.students")}</h4>
                    <ul>
                      {rec.students.map((student, i) => (
                        <li key={i}>
                          {t("recommendations.studentItem", {
                            name: student.name,
                            pct: student.accuracy
                          })}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rec.questions && (
                  <div className="recommendation-details">
                    <h4>{t("recommendations.labels.questions")}</h4>
                    <ul>
                      {rec.questions.map((q, i) => (
                        <li key={i}>
                          {t("recommendations.questionItem", { n: q.n, pct: q.pct })}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recommendations">
          <FontAwesomeIcon icon={faCheckCircle}/>
          <h3>{t("recommendations.none.title")}</h3>
          <p>{t("recommendations.none.subtitle")}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsTab;
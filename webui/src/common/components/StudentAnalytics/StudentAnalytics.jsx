import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faSort,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {getCharacterEmoji} from '@/common/data/characters';
import './styles.sass';
import { useTranslation } from "react-i18next";

const StudentAnalytics = ({analyticsData, isLiveQuiz}) => {
  const {studentAnalytics} = analyticsData;
  const [sortBy, setSortBy] = useState('accuracy');
  const [sortOrder, setSortOrder] = useState('desc');
  const { t } = useTranslation();

  const sortedStudents = [...studentAnalytics].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 80) return {level: 'excellent', color: 'green', text: t('studentAnalytics.performance.excellent')};
    if (accuracy >= 60) return {level: 'good', color: 'orange', text: t('studentAnalytics.performance.ok')};
    return {level: 'needs-improvement', color: 'red', text: t('studentAnalytics.performance.help')};
  };

  const needsAttention = studentAnalytics.filter(s => s.needsAttention);

  return (
    <div className="student-analytics">
      <div className="students-table">
        <div className="table-header">
          <div className="col-student">{t("studentAnalytics.columns.student")}</div>

          <div
            className="col-accuracy sortable"
            onClick={() => handleSort('accuracy')}
          >
            {t("studentAnalytics.columns.accuracy")}
            <FontAwesomeIcon icon={faSort}/>
          </div>

          <div
            className="col-correct sortable"
            onClick={() => handleSort('correctAnswers')}
          >
            {t("studentAnalytics.columns.correct")}
            <FontAwesomeIcon icon={faSort}/>
          </div>

          <div className="col-incorrect">{t("studentAnalytics.columns.incorrect")}</div>

          {isLiveQuiz && (
            <div
              className="col-points sortable"
              onClick={() => handleSort('totalPoints')}
            >
              {t("studentAnalytics.columns.points")}
              <FontAwesomeIcon icon={faSort}/>
            </div>
          )}

          <div className="col-status">{t("studentAnalytics.columns.status")}</div>
        </div>

        {sortedStudents.map((student) => {
          const performance = getPerformanceLevel(student.accuracy);
          return (
            <div key={student.id} className={`table-row ${performance.level}`}>
              <div className="col-student">
                <span className="student-character">
                  {getCharacterEmoji(student.character)}
                </span>
                <span className="student-name">{student.name}</span>
                {student.needsAttention && (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="attention-icon"
                  />
                )}
              </div>

              <div className="col-accuracy">
                <div className="accuracy-bar">
                  <div
                    className={`accuracy-fill ${performance.level}`}
                    style={{width: `${student.accuracy}%`}}
                  />
                  <span className="accuracy-text">{student.accuracy}%</span>
                </div>
              </div>

              <div className="col-correct">
                <FontAwesomeIcon icon={faCheck} className="correct"/>
                {student.correctAnswers}
              </div>

              <div className="col-incorrect">
                <FontAwesomeIcon icon={faTimes} className="incorrect"/>
                {student.incorrectAnswers}
              </div>

              {isLiveQuiz && (
                <div className="col-points">
                  {student.totalPoints}
                </div>
              )}

              <div className={`col-status ${performance.level}`}>
                {performance.text}
              </div>
            </div>
          );
        })}
      </div>

      {needsAttention.length > 0 && (
        <div className="attention-section">
          <h3>
            <FontAwesomeIcon icon={faExclamationTriangle}/>
            {t("studentAnalytics.needsHelpTitle", { count: needsAttention.length })}
          </h3>

          <div className="attention-list">
            {needsAttention.map(student => (
              <div key={student.id} className="attention-item">
                <span className="student-info">
                  {getCharacterEmoji(student.character)} {student.name}
                </span>
                <span className="student-stats">
                  {student.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAnalytics;
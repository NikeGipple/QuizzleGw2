import {faListUl, faToggleOn, faKeyboard, faSort} from "@fortawesome/free-solid-svg-icons";

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple-choice",
  TRUE_FALSE: "true-false",
  TEXT: "text",
  SEQUENCE: "sequence",
};

export const DEFAULT_QUESTION_TYPE = QUESTION_TYPES.MULTIPLE_CHOICE;

// ✅ niente stringhe “DE” qui: solo chiavi
export const QUESTION_TYPE_CONFIG = [
  {
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    icon: faListUl,
    nameKey: "questionTypes.multipleChoice.name",
    descriptionKey: "questionTypes.multipleChoice.description",
  },
  {
    type: QUESTION_TYPES.TRUE_FALSE,
    icon: faToggleOn,
    nameKey: "questionTypes.trueFalse.name",
    descriptionKey: "questionTypes.trueFalse.description",
  },
  {
    type: QUESTION_TYPES.TEXT,
    icon: faKeyboard,
    nameKey: "questionTypes.text.name",
    descriptionKey: "questionTypes.text.description",
  },
  {
    type: QUESTION_TYPES.SEQUENCE,
    icon: faSort,
    nameKey: "questionTypes.sequence.name",
    descriptionKey: "questionTypes.sequence.description",
  },
];

export const getQuestionTypeConfig = (type) =>
  QUESTION_TYPE_CONFIG.find((config) => config.type === type) || QUESTION_TYPE_CONFIG[0];

export const getQuestionTypeIcon = (type) => getQuestionTypeConfig(type).icon;

// ⚠️ rimuovi/evita getQuestionTypeName qui (non può usare t).
// Lascia solo le funzioni “pure” e risolvi la label nel componente UI.

export const getDefaultAnswersForType = (type, t) => {
  switch (type) {
    case QUESTION_TYPES.TRUE_FALSE:
      return [
        { type: QUESTION_TYPES.TEXT, content: t("trueFalseClient.true"), is_correct: false },
        { type: QUESTION_TYPES.TEXT, content: t("trueFalseClient.false"), is_correct: false },
      ];
    case QUESTION_TYPES.TEXT:
      return [{ content: "" }];
    case QUESTION_TYPES.SEQUENCE:
      return [];
    case QUESTION_TYPES.MULTIPLE_CHOICE:
    default:
      return [];
  }
};

export const ANSWER_LIMITS = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 6,
  [QUESTION_TYPES.TRUE_FALSE]: 2,
  [QUESTION_TYPES.TEXT]: 10,
  [QUESTION_TYPES.SEQUENCE]: 8,
};

export const MINIMUM_ANSWERS = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 2,
  [QUESTION_TYPES.TRUE_FALSE]: 2,
  [QUESTION_TYPES.TEXT]: 1,
  [QUESTION_TYPES.SEQUENCE]: 2,
};
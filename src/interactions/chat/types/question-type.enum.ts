const QuestionTypeDef = {
  Multiple: 'Multiple',
  Single: 'Single',
  FreeText: 'FreeText',
} as const;

type QuestionType = typeof QuestionTypeDef[keyof typeof QuestionTypeDef];

export default QuestionType;

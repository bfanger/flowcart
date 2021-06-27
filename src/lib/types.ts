/* eslint-disable no-use-before-define */

export type QuestionData = {
  question: string;
  yes?: FlowCartData;
  no?: FlowCartData;
};
export type AnswerData = {
  answer: string;
};

export type FlowCartData = QuestionData | AnswerData;

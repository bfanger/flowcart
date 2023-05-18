/* eslint-disable no-use-before-define */

export type QuestionData = {
  question: string;
  yes: FlowCartData;
  no: FlowCartData;
};
export type AnswerData = {
  answer: string;
  color: string;
  textColor?: string;
};

export type FlowCartData = QuestionData | AnswerData;

export type Choice = "UNKNOWN" | "YES" | "NO";

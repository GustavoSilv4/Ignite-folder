import { expect, test } from "vitest";
import { Answer } from "../entities/answer";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestions = new AnswerQuestionUseCase();

  const answer = answerQuestions.execute({
    instructorId: "1",
    questionId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});

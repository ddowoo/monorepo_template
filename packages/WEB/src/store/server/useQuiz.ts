import { useQuery } from "react-query";
import { getQuestionListFetch } from "../../services/quiz";

export const useQuiz = (count: QuizCount, level: QuizLevel) => {
  return useQuery(["quiz"], () => getQuestionListFetch(count, level), {
    // staleTime: Infinity,
    // suspense: true,
    // useErrorBoundary: true,
    // cacheTime: 0,
    retry: false,
  });
};

import { useQuery } from "react-query";
import axios from "axios";

export const hel = "hello";

export const useQuiz = (count: QuizCount, level: QuizLevel) => {
  console.log("체크체크");
  console.log("count : ", count);
  console.log("level : ", level);

  const quizQuery = useQuery(["quiz"], () => getQuestionListFetch(count, level), {
    staleTime: Infinity,
    suspense: true,
    useErrorBoundary: true,
  });

  return quizQuery;
};
type OpenDbReturn = {
  response_code: number;
  results: Question[];
};

export const getQuestionListFetch = async (count: QuizCount, level: QuizLevel): Promise<QuestionItem[]> => {
  try {
    const params = {
      amount: count,
      difficulty: level,
      type: "multiple",
    };

    const res = await quizAxios.get<OpenDbReturn>("", { params });

    if (res.data.response_code === 0) {
      return res.data.results.map((question) => {
        const { correct_answer, incorrect_answers } = question;

        return {
          ...question,
          optionList: shuffle([correct_answer, ...incorrect_answers]),
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const quizAxios = axios.create({
  baseURL: "https://opentdb.com/api.php",
  withCredentials: true,
});

quizAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

quizAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

type QuizCount = 5 | 10 | 15 | null;
type QuizLevel = "easy" | "medium" | "hard" | null;

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: "multiple";
};

export type QuestionItem = Question & { optionList: string[] };
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

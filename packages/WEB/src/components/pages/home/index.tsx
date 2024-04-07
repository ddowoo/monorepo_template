import { useQuizConfig } from "../../../store/client/quizConfig";
import { BoxButton } from "../../atoms/buttons";
import { useNavigate } from "react-router-dom";

const QUIZ_COUNT_LIST: QuizCount[] = [5, 10, 15];
const QUIZ_LEVEL_LIST: QuizLevel[] = ["easy", "medium", "hard"];

const Home = () => {
  const navigate = useNavigate();
  const quizConfig = useQuizConfig();

  const btnRoll = quizConfig.count !== null && quizConfig.level !== null ? "primary" : "disabled";

  const handleQuizCount = quizConfig.setCount;

  const handleQuizLevel = quizConfig.setLevel;

  const handleStateQuiz = () => navigate("/quiz?idx=0");

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grow">
        <ul className="flex justify-between">
          {QUIZ_COUNT_LIST.map((quizCount) => {
            return (
              <li key={`quiz_count_${quizCount}`}>
                <label>
                  <input onChange={() => handleQuizCount(quizCount)} type="radio" className="mx-2" checked={quizConfig.count === quizCount} />
                  {quizCount}개
                </label>
              </li>
            );
          })}
        </ul>
        <ul className="flex justify-between my-5">
          {QUIZ_LEVEL_LIST.map((quizLevel) => {
            return (
              <li key={`quiz_level_${quizLevel}`}>
                <label>
                  <input onChange={() => handleQuizLevel(quizLevel)} type="radio" className="mx-2" checked={quizConfig.level === quizLevel} />
                  {quizLevel}
                </label>
              </li>
            );
          })}
        </ul>
        <p className="text-slate-500 text-xs">* 문제수와 난이도를 선택 후 퀴즈풀기 버튼을 누르면 퀴즈가 시작됩니다.</p>
        <p className="text-slate-500 text-xs">* 오답노트를 누르면 지금까지 틀린 문제를 모두 볼 수 있습니다.</p>
      </div>
      <BoxButton text="퀴즈풀기" role={btnRoll} disabled={btnRoll === "disabled"} onClick={handleStateQuiz} />
    </div>
  );
};

export default Home;

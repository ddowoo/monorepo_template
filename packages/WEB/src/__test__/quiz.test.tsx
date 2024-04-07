import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useQuiz } from "../store/server/useQuiz";
import nock from "nock";
import React from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe("홈 컴포넌트 테스트", () => {
  it("react query useQuiz 테스트", async () => {
    // const expectation = nock("https://opentdb.com")
    //   .get("/api.php")
    //   .query({
    //     amount: 10,
    //     difficulty: "medium",
    //     type: "multiple",
    //   })
    //   .reply(200, {
    //     answer: 42,
    //   });
    // const { result } = renderHook(() => useQuiz(10, "medium"), { wrapper });
    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // console.log(result);
    // expect(result.current.data?.length).toBe(10);
  });
});

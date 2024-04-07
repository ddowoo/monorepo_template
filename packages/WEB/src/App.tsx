import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import PageLayout from "./components/blocks/pageLayout";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <RouterProvider router={router} />
        </PageLayout>
      </QueryClientProvider>
    </>
  );
}

export default App;

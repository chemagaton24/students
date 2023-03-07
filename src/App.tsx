import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GloablStyles } from "./components/common/GlobalStyles.style";
import { Container } from "./components/display/Container";
import Students from "./components/Students";
import Profile from "./components/Students/Profile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <GloablStyles />
      <QueryClientProvider client={queryClient}>
        <Container>
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="/:id" element={<Profile />} />
          </Routes>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

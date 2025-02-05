import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Table from "./components/Table/Table";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}

export default App;

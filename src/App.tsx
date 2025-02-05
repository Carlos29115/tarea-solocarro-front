import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Table from "./components/Table/Table";

/* interface Employee {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
} */

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}

export default App;

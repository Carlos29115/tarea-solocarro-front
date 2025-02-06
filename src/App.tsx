import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;

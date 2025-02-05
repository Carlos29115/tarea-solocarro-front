import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Table from "./components/Table/Table";
import Card from "./components/Card/Card";
import SimpleModal from "./components/Modal/SimpleModal/SimpleModal";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Card>
        <div className="flex-center">
          <h3>Posts</h3>
        </div>
        <Table />
      </Card>
      <SimpleModal title="New post">Modaaal</SimpleModal>
    </QueryClientProvider>
  );
}

export default App;

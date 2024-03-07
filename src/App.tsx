import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/styles/containers.css";
import MainToDoContent from "./components/MainToDoContent";
import Container from "react-bootstrap/Container";
import { TasksProvider } from "./context/TasksContext";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Container fluid="sm">
        <h1 className="app_heading">To-do list</h1>
        <TasksProvider>
          <MainToDoContent />
        </TasksProvider>
      </Container>
    </Provider>
  );
}

export default App;

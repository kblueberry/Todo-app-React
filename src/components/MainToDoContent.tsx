import { useContext } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { TasksContext } from "../context/TasksContext";
import FilterTasksAction from "./actions/FilterTasksAction";
import { ToDoItemNew, ToDoItemView } from "./todo-item/ToDoItem";
import { Task } from "../dtos/Task";
import { APP_CONSTANTS } from "../constants";

export default function MainToDoContent(): JSX.Element {
  const { tasks } = useContext(TasksContext);

  return (
    <>
      <Row className="app_top_actions">
        <Col xs={5} md={5}>
          <FilterTasksAction />
        </Col>
      </Row>
      <ToDoItemNew />
      <Container className="todos-container">
        <h2>{APP_CONSTANTS.todosHeading}</h2>
        {!tasks.length && <i>{APP_CONSTANTS.noTasksPlaceholder}</i>}
        {tasks.map((task: Task) => (
          <ToDoItemView key={task.id} task={task} />
        ))}
      </Container>
    </>
  );
}

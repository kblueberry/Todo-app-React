import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import "../../assets/styles/buttons.css";
import { APP_CONSTANTS } from "../../constants";
import { TasksContext } from "../../context/TasksContext";
import { Task } from "../../dtos/Task";

export function ToDoItemNew(): JSX.Element {
  const { onNewTaskAdd } = useContext(TasksContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddTask = (data: any): void => {
    onNewTaskAdd(new Task(data.taskName));
  };

  return (
    <Form onSubmit={handleSubmit(handleAddTask)}>
      <Row>
        <Col xs={7} md={10}>
          <Form.Control
            type="text"
            placeholder="Add task to the list"
            {...register("taskName", {
              required: true,
              maxLength: APP_CONSTANTS.taskNameMaxLength,
            })}
          />
          {errors.taskName && (
            <p className="task_name_error">
              {APP_CONSTANTS.maxLengthValidation}
            </p>
          )}
        </Col>
        <Col xs={5} md={2}>
          <Button variant="success" type="submit">
            {APP_CONSTANTS.addTaskLabel}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export function ToDoItemView({ task }: { task: Task }): JSX.Element {
  const { onTaskRemoval, onTaskStatusChange } = useContext(TasksContext);

  return (
    <Row
      className={`todo-container todo-container-rounded todo-container-y-spacing ${
        task.completed ? "todo-done" : ""
      }`}
    >
      <Col xs={7} md={10}>
        {task.name}
      </Col>
      <Col xs={5} md={2}>
        <div className="row-flex">
          <Form.Check
            inline
            name="done"
            type="checkbox"
            id="done-action"
            onChange={() => onTaskStatusChange(task.id)}
          />
          <Button
            variant="light"
            className="icon-light"
            size="sm"
            onClick={() => onTaskRemoval(task.id)}
          >
            <img src="./images/cancel-svgrepo-com.svg" alt="check-svg"></img>
          </Button>
        </div>
      </Col>
    </Row>
  );
}

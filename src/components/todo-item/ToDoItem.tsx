import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import cancelSvg from "../../assets/images/cancel-svgrepo-com.svg";
import "../../assets/styles/buttons.css";
import { APP_CONSTANTS } from "../../constants";
import { Task } from "../../types/Task";
import { useAppDispatch } from "../../store/hooks";
import { add, changeTaskStatus, remove } from "../../store/tasksReducer";
import { useCallback } from "react";

export function ToDoItemNew(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddTask = useCallback((data: any): void => {
    const newTask = {
      id: uuidv4(),
      completed: false,
      name: data.taskName,
    };
    dispatch(add(newTask));
    reset({ taskName: "" });
  }, []);

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
          <Button variant="success" type="submit" disabled={!!errors.taskName}>
            {APP_CONSTANTS.addTaskLabel}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export function ToDoItemView({ task }: { task: Task }): JSX.Element {
  const dispatch = useAppDispatch();

  const removeTask = useCallback((id: string): void => {
    dispatch(remove(id));
  }, []);

  const toggleTaskStatus = useCallback((id: string): void => {
    dispatch(changeTaskStatus(id));
  }, []);

  return (
    <Row
      className={`todo-container todo-container-rounded todo-container-y-spacing ${
        task.completed ? "todo-done" : ""
      }`}
      onClick={() => toggleTaskStatus(task.id)}
    >
      <Col xs={7} md={10}>
        {task.name}
      </Col>
      <Col xs={5} md={2}>
        <div className="row-flex">
          <Button
            variant="light"
            className="icon-light"
            size="sm"
            onClick={() => removeTask(task.id)}
          >
            <img src={cancelSvg} alt="cancel-svg"></img>
          </Button>
        </div>
      </Col>
    </Row>
  );
}

import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { TasksContext } from "../../context/TasksContext";
import { FilterCriteria } from "../../enums/Actions";
import { APP_CONSTANTS } from "../../constants";

export default function FilterTasksAction(): JSX.Element {
  const { onTasksFiltering } = useContext(TasksContext);

  return (
    <Form.Select
      defaultValue="Filter tasks"
      onChange={event => {
        onTasksFiltering(event.target.value);
      }}
    >
      <option disabled>{APP_CONSTANTS.filterTasksLabel}</option>
      <option value={FilterCriteria.All}>
        {APP_CONSTANTS.tasksLabels.all}
      </option>
      <option value={FilterCriteria.Completed}>
        {APP_CONSTANTS.tasksLabels.completed}
      </option>
      <option value={FilterCriteria.Current}>
        {APP_CONSTANTS.tasksLabels.current}
      </option>
    </Form.Select>
  );
}

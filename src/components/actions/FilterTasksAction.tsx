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
      <option value={FilterCriteria.Done}>
        {APP_CONSTANTS.tasksLabels.done}
      </option>
      <option value={FilterCriteria.Incomplete}>
        {APP_CONSTANTS.tasksLabels.incomplete}
      </option>
    </Form.Select>
  );
}

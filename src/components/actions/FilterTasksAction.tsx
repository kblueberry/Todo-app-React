import { useContext, useMemo } from "react";
import Form from "react-bootstrap/Form";
import { TasksContext } from "../../context/TasksContext";
import { FilterCriteria } from "../../enums/Actions";
import { APP_CONSTANTS } from "../../constants";

export default function FilterTasksAction(): JSX.Element {
  const { onTasksFiltering, tasks } = useContext(TasksContext);

  const completedTasksCount = useMemo(
    () => tasks.filter(task => task.completed)?.length,
    [tasks]
  );

  const currentTasksCount = useMemo(
    () => tasks.filter(task => !task.completed)?.length,
    [tasks]
  );

  return (
    <Form.Select
      defaultValue="Filter tasks"
      onChange={event => {
        onTasksFiltering(event.target.value);
      }}
    >
      <option disabled>{APP_CONSTANTS.filterTasksLabel}</option>
      <option value={FilterCriteria.All}>
        {APP_CONSTANTS.tasksLabels.all} ({tasks.length})
      </option>
      <option value={FilterCriteria.Completed}>
        {APP_CONSTANTS.tasksLabels.completed} ({completedTasksCount})
      </option>
      <option value={FilterCriteria.Current}>
        {APP_CONSTANTS.tasksLabels.current} ({currentTasksCount})
      </option>
    </Form.Select>
  );
}

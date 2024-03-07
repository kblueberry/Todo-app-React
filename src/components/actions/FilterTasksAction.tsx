import { useMemo } from "react";
import Form from "react-bootstrap/Form";
import { APP_CONSTANTS } from "../../constants";
import { FilterCriteria } from "../../enums/Actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filterTasks } from "../../store/tasksReducer";

export default function FilterTasksAction(): JSX.Element {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  const completedTasksCount = useMemo(
    () => tasks.filter(task => task.completed)?.length,
    [tasks]
  );

  const currentTasksCount = useMemo(
    () => tasks.filter(task => !task.completed)?.length,
    [tasks]
  );

  const filter = (criteria: string): void => {
    dispatch(filterTasks(criteria));
  };

  return (
    <Form.Select
      defaultValue={APP_CONSTANTS.filterDefaultPlaceholder}
      onChange={event => filter(event.target.value)}
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

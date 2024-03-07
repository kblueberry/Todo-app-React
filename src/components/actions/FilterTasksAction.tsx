import { useCallback } from "react";
import Form from "react-bootstrap/Form";
import { APP_CONSTANTS } from "../../constants";
import { FilterCriteria } from "../../types/Actions";
import { selectCriteria } from "../../selectors/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeCriteria } from "../../store/tasksReducer";

export default function FilterTasksAction(): JSX.Element {
  const dispatch = useAppDispatch();

  const filter = useCallback((criteria: string): void => {
    dispatch(changeCriteria(criteria as FilterCriteria));
  }, []);

  const criteria = useAppSelector(selectCriteria);

  return (
    <Form.Select
      value={criteria}
      onChange={event => filter(event.target.value)}
    >
      <option disabled>{APP_CONSTANTS.filterTasksLabel}</option>
      <option value={FilterCriteria.All}>
        {APP_CONSTANTS.tasksLabels.all} ({"TODO"})
      </option>
      <option value={FilterCriteria.Completed}>
        {APP_CONSTANTS.tasksLabels.completed} ({"TODO"})
      </option>
      <option value={FilterCriteria.Current}>
        {APP_CONSTANTS.tasksLabels.current} ({"TODO"})
      </option>
    </Form.Select>
  );
}

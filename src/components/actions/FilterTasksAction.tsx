import { useContext } from "react"
import Form from "react-bootstrap/Form"
import { TasksContext } from "../../context/TasksContext"
import { FilterCriteria } from "../../enums/Actions"

export default function FilterTasksAction(): JSX.Element {
  const { onTasksFiltering } = useContext(TasksContext)

  return (
    <Form.Select
      defaultValue="Filter tasks"
      onChange={(event) => {
        onTasksFiltering(event.target.value)
      }}
    >
      <option disabled>Filter tasks</option>
      <option value={FilterCriteria.All}>All</option>
      <option value={FilterCriteria.Done}>Done</option>
      <option value={FilterCriteria.Incomplete}>Incomplete</option>
    </Form.Select>
  )
}

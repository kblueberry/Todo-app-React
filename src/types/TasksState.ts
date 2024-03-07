import { FilterCriteria } from "./Actions";
import { Task } from "./Task";

export interface TasksState {
  criteria: FilterCriteria;
  tasks: Array<Task>;
}

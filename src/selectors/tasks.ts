import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { TasksState } from "../types/TasksState";
import { FilterCriteria } from "../types/Actions";
import { Task } from "../types/Task";

const selectSelf = (state: RootState): TasksState => state.tasks;

const getFilter = (criteria: FilterCriteria): ((task: Task) => boolean) => {
  switch (criteria) {
    case FilterCriteria.All:
      return () => true;
    case FilterCriteria.Completed:
      return task => task.completed;
    case FilterCriteria.Current:
      return task => !task.completed;
    default:
      throw new Error(`Unknown filter criteria ${criteria}`);
  }
};

export const selectCriteria = createSelector(
  [selectSelf],
  state => state.criteria
);

export const selectTasks = createSelector([selectSelf], state => state.tasks);

export const selectActiveTasks = createSelector(
  [selectCriteria, selectTasks],
  (criteria, tasks) => tasks.filter(getFilter(criteria))
);

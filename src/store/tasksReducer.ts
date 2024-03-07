import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types/Task";
import { FilterCriteria } from "../types/Actions";
import { TasksState } from "../types/TasksState";

const initialState: TasksState = {
  criteria: FilterCriteria.All,
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      const tasks = state.tasks.concat(...[action.payload]);
      return { ...state, tasks };
    },
    remove: (state, action: PayloadAction<string>) => {
      const tasks = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks };
    },
    changeTaskStatus: (state, action: PayloadAction<string>) => {
      const taskToChange = state.tasks.find(task => task.id === action.payload);
      if (taskToChange) {
        taskToChange.completed = !taskToChange.completed;
      }
    },
    changeCriteria: (state, action: PayloadAction<FilterCriteria>) => {
      return { ...state, criteria: action.payload };
    },
    filterTasks: (state, action: PayloadAction<string>) => {
      let filtered = [];

      if (action.payload === FilterCriteria.All) {
        return { ...state, tasks: state.tasks };
      } else if (action.payload === FilterCriteria.Completed) {
        filtered = [...state.tasks].filter(task => task.completed);
        return { ...state, tasks: filtered };
      } else {
        filtered = [...state.tasks].filter(task => !task.completed);
        return { ...state, tasks: filtered };
      }
    },
  },
});

export const { add, remove, changeTaskStatus, changeCriteria, filterTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;

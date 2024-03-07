import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../dtos/Task";
import { FilterCriteria } from "../enums/Actions";

interface TasksState {
  tasks: Array<Task>;
  initialTasks: Array<Task>;
}

const initialState: TasksState = {
  tasks: [],
  initialTasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      const changed = state.tasks.concat(...[action.payload]);
      return { ...state, tasks: changed, initialTasks: changed };
    },
    remove: (state, action: PayloadAction<string>) => {
      const changed = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks: changed, initialTasks: changed };
    },
    changeTaskStatus: (state, action: PayloadAction<string>) => {
      const taskToChange = state.tasks.find(task => task.id === action.payload);
      if (taskToChange) {
        taskToChange.completed = !taskToChange.completed;
      }
    },
    filterTasks: (state, action: PayloadAction<string>) => {
      let filtered = [];

      if (action.payload === FilterCriteria.All) {
        return { ...state, tasks: state.initialTasks };
      } else if (action.payload === FilterCriteria.Completed) {
        filtered = [...state.initialTasks].filter(task => task.completed);
        return { ...state, tasks: filtered };
      } else {
        filtered = [...state.initialTasks].filter(task => !task.completed);
        return { ...state, tasks: filtered };
      }
    },
  },
});

export const { add, remove, changeTaskStatus, filterTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;

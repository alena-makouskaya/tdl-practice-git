import { Provider } from "react-redux";
import { store } from "../state/store";
import { combineReducers } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import { legacy_createStore  } from 'redux'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to byu", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: "todolistId1", title: "What to learn", filter: "all" },
      { id: "todolistId2", title: "What to byu", filter: "all" },
    ],
    ["todolistId2"]: [
      { id: "todolistId1", title: "What to learn", filter: "all" },
      { id: "todolistId2", title: "What to byu", filter: "all" },
    ],
  },
};

const storyBookStore = legacy_createStore(
  rootReducer
);


export type AppRootState = ReturnType<typeof rootReducer>;

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}> {storyFn()}</Provider>;
};

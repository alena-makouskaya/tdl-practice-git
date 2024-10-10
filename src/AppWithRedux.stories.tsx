import { action } from "@storybook/addon-actions";

import AppWithRedux from "./AppWithRedux";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "AppWithRedux",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
};

const callBack = action("EditableSpan is changed");

export const AppWithReduxExample = () => {
  return <AppWithRedux />;
};

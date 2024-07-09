import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; //다른곳에서 정의된 함수니까..? 인라인 함수가 아니니ㅣ까

export default store;

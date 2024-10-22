import { createBrowserRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SelectThemePage from "./pages/SelectThemePage";
import RecordStoryPage from "./pages/RecordStoryPage";
import ResultPage from "./pages/ResultPage";

export const PATH = {
  START_PAGE: "/",
  SELECT_THEME_PAGE: "/theme",
  RECORD_STORY_PAGE: "/record",
  RESULT_PAGE: "/result",
} as const;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: PATH.SELECT_THEME_PAGE,
        element: <SelectThemePage />,
      },
      {
        path: PATH.RECORD_STORY_PAGE,
        element: <RecordStoryPage />,
      },
      {
        path: PATH.RESULT_PAGE,
        element: <ResultPage />,
      },
    ],
  },
]);

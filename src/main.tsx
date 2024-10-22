import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { css, Global } from "@emotion/react";
import { globalCss } from "./styles/global.ts";
import { resolveValue, Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <>
    <Global styles={globalCss} />
    <RouterProvider router={router} />
    <Toaster position="top-center">
      {(t) => (
        <div
          css={css`
            opacity: ${t.visible ? 1 : 0};
            background: "white";
            padding: 8;
            display: inline-flex;
            padding: 12px 16px;
            align-items: center;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.1);
            gap: 10;

            color: #191919;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 19.6px */
          `}
        >
          {t.icon}
          {resolveValue(t.message, t)}
        </div>
      )}
    </Toaster>
  </>
);

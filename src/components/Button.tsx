import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  variant = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "gray";
}) {
  return (
    <button
      css={css`
        display: flex;
        height: 56px;
        padding: 12px 40px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 12px;
        background-color: #f34f4f;
        width: 100%;

        color: #fff;
        text-align: center;

        /* Title/Title 01 */
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%; /* 16px */
        letter-spacing: -0.32px;

        ${variant === "default" &&
        css`
          :disabled {
            background-color: #ee8080;
            cursor: default;
          }

          :active {
            background-color: #d74545;
          }
        `}

        ${variant === "gray" &&
        css`
          background-color: #e7eaf0;
          color: #505564;
        `}
      `}
      {...props}
    />
  );
}

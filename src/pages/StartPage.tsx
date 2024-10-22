import { PATH } from "@/routes";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div
      css={css`
        background-image: url("/images/start-background.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom;
        width: 100%;
        height: 100vh;
        padding: 33px 0 0;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <img
          src="/images/logo.png"
          css={css`
            width: 165px;
          `}
        />
        <p
          css={css`
            color: #3c7980;
            text-align: center;
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%; /* 16px */
            letter-spacing: -0.48px;
            margin-top: 4px;
          `}
        >
          나의 생각을 그림으로 표현하는 AI 그림일기
        </p>
      </div>
      <Link to={PATH.SELECT_THEME_PAGE}>
        <button
          css={css`
            display: flex;
            height: 56px;
            padding: 20px 40px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 12px;
            background: #fff;
            margin: 0 20px 8px;
          `}
        >
          <span
            css={css`
              color: #101115;
              text-align: center;

              /* Title/Title 01 */
              font-family: Pretendard;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: 100%; /* 16px */
              letter-spacing: -0.32px;
            `}
          >
            시작하기
          </span>
        </button>
      </Link>
    </div>
  );
}

import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  return (
    <div
      css={css`
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: #fff;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `}
      >
        <img
          src="/images/loading.png"
          css={css`
            display: flex;
            width: 88px;
            height: 56px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 16px;
          `}
        />
        <p
          css={css`
            color: #505564;
            text-align: center;

            /* Title/Title 03 */
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 16px */
            letter-spacing: -0.48px;
          `}
        >
          이미지 생성중
          <LoadingText />
        </p>
      </div>
    </div>
  );
}

const LoadingText = () => {
  const maximumText = "...";
  const [sliceCount, setSliceCount] = useState(maximumText.length);

  useEffect(() => {
    const internal = setInterval(() => {
      setSliceCount((prev) => {
        if (prev === maximumText.length) return 0;
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(internal);
    };
  }, []);

  return maximumText.slice(0, sliceCount);
};

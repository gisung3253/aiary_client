import { PATH } from "@/routes";
import { LAYOUT_MAX_WIDTH } from "@/styles/constants";
import { css } from "@emotion/react";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      css={css`
        display: flex;
        height: 48px;
        padding: 0px 12px;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        max-width: ${LAYOUT_MAX_WIDTH}px;
        width: 100%;
        margin: 0 auto;
      `}
      {...props}
    >
      {children}
    </div>
  );
}

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => navigate(-1);

  return (
    <div
      css={css`
        padding: 10px;
      `}
      onClick={handleBackButtonClick}
    >
      <img
        src="/images/arrow-left.svg"
        css={css`
          width: 24px;
          height: 24px;
        `}
      />
    </div>
  );
};

const HomeButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => navigate(PATH.START_PAGE);

  return (
    <div
      css={css`
        padding: 10px;
      `}
      onClick={handleBackButtonClick}
    >
      <img
        src="/images/home.svg"
        css={css`
          width: 24px;
          height: 24px;
        `}
      />
    </div>
  );
};

NavBar.BackButton = BackButton;
NavBar.HomeButton = HomeButton;

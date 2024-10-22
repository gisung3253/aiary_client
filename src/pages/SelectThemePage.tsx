import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import { LAYOUT_MAX_WIDTH } from "@/styles/constants";
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes";

export default function SelectThemePage() {
  const [selectedItem, setSelectedItem] = useState<number | undefined>();
  const navigate = useNavigate();

  const handleNextPage = () =>
    navigate({
      pathname: PATH.RECORD_STORY_PAGE,
      search: `?selected=${selectedItem}`,
    });

  return (
    <div
      css={css`
        padding: 48px 20px 84px;
      `}
    >
      <NavBar>
        <NavBar.BackButton />
      </NavBar>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 32px 0 40px;
        `}
      >
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
          어떤 스타일이 마음에 드시나요?
        </p>
        <h1
          css={css`
            color: #22252d;

            /* Title/HeadLine 01 */
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%; /* 20px */
            letter-spacing: -0.6px;
            margin-top: 8px;
          `}
        >
          원하는 테마 하나를 선택해주세요
        </h1>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
        `}
      >
        {THEME_LIST.map((theme) => (
          <ThemeItem
            {...theme}
            isSelected={selectedItem ? selectedItem === theme.id : true}
            onClick={() => setSelectedItem(theme.id)}
          />
        ))}
      </div>
      <div
        css={css`
          padding: 0 20px 8px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: ${LAYOUT_MAX_WIDTH}px;
          width: 100%;
          margin: 0 auto;
        `}
      >
        <Button disabled={!selectedItem} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    </div>
  );
}

const ThemeItem = ({
  label,
  image,
  isSelected,
  onClick,
}: {
  image: string;
  label: string;
  isSelected?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      css={css`
        cursor: pointer;
      `}
    >
      <div
        css={css`
          border-radius: 16px;
          background: url(${image}) lightgray 50% / cover no-repeat;
          border-radius: 16px;
          aspect-ratio: 150 / 194;

          ${!isSelected && `opacity: 0.3;`}
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
          margin-top: 10px;

          ${!isSelected && `opacity: 0.3;`}
        `}
      >
        {label}
      </p>
    </div>
  );
};

const THEME_LIST = [
  {
    id: 1,
    image: "/images/theme/01853-2069992084.png",
    label: "Vintage Cartoon",
  },
  {
    id: 2,
    image: "/images/theme/popart.png",
    label: "Pop Art",
  },
  {
    id: 3,
    image: "/images/theme/4.png",
    label: "Van Gogh",
  },
  {
    id: 4,
    image: "/images/theme/water.png",
    label: "Water Color",
  },
];

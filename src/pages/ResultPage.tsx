import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import LoadingScreen from "@/components/LoadingScreen"; // 로딩 화면 추가
import { css } from "@emotion/react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { PATH } from "@/routes";
import { LAYOUT_MAX_WIDTH } from "@/styles/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


export default function ResultPage() {
  const navigate = useNavigate();

  //g->
  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get("selected");
  const [isLoading, setIsLoading] = useState(true);

  // useLocation을 사용해 state로 전달된 contents 값 가져오기
  const location = useLocation();
  const { contents } = location.state || { contents: "" };
  const [imageUrl, setImageUrl] = useState("");  // 이미지 URL 상태 관리

  const sendDataToServer = async () => {
    try {
      const response = await fetch('https://port-0-aiary-server-m2jzwr6m2bfa735a.sel4.cloudtype.app/ai/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          selectedItem,
        }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);  // 이미지 URL 저장
        setIsLoading(false);
      }
      console.log(data); // 서버에서 보낸 응답 출력
    } catch (error) {
      console.error('Error sending data to server:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendDataToServer();
  }, []);
  //////////////////////////////////////////////////////////////////////

  const handleShareButtonClick = () => {

    const mainUrl = "aiary1.vercel.app";
    
    navigator.clipboard.writeText(mainUrl).then(() => {
      toast(<div>url을 복사했어요</div>, {
        icon: <img src="/images/url.svg" />,
      });
    }).catch(err => {
      console.error('클립보드 복사 실패:', err);
    });
  };

  const handleRetryButtonClick = () => {
    navigate({
      pathname: PATH.START_PAGE,
    });
  };

  if (isLoading) {
    // 로딩 중일 때 로딩 화면 표시
    return <LoadingScreen />;
  }

  return (
    <div
      css={css`
        padding: 48px 20px 84px;
      `}
    >
      <NavBar>
        <NavBar.HomeButton />
      </NavBar>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 32px 0 28px;
        `}
      >
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
          `}
        >
          일기 작성 완료!
        </h1>
        <p
          css={css`
            color: #505564;
            text-align: center;

            /* Body/Body 01 */
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 22.4px */
            letter-spacing: -0.48px;
            margin-top: 8px;
          `}
        >
          만들어진 그림이 마음에 드시나요?
          <br />
          친구에게 자랑하거나, 다시 만들어보세요!
        </p>
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-self: stretch;
          width: 100%;
          aspect-ratio: 1 / 1;

          border-radius: 20px;
          background-color: #f2f4f9;
        `}
      >





{imageUrl && !isLoading && (
    // 이미지를 다운로드할 수 있도록 a 태그 사용
    <a href={imageUrl} download="generated_image.png">
      <img
        src={imageUrl}
        alt="Generated AI"
        css={css`
          width: 100%;
          border-radius: 20px;
        `}
      />
    </a>
  )}








        <div
          css={css`
            display: flex;
            padding: 10px 12px;
            align-items: flex-start;
            gap: 10px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.14);
            position: absolute;
            right: 17px;
            bottom: 19px;

            color: #505564;
            text-align: center;

            /* Sub Title/Sub Title 01 */
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%; /* 14px */
            letter-spacing: -0.42px;
          `}
        >
          길게 눌러 다운로드
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 20px 8px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: ${LAYOUT_MAX_WIDTH}px;
        `}
      >
        <Button
          onClick={handleShareButtonClick}
          css={css`
            padding: 12px;
          `}
        >
          <img
            src="/images/share.svg"
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 6px;
            `}
          />
          공유하기
        </Button>
        <Button
          variant="gray"
          onClick={handleRetryButtonClick}
          css={css`
            padding: 12px;
          `}
        >
          <img
            src="/images/retry.svg"
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 6px;
            `}
          />
          다시해보기
        </Button>
      </div>
    </div>
  );
}

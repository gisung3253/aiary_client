import React, { useState, useRef } from "react";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen2";
import NavBar from "@/components/NavBar";
import { PATH } from "@/routes";
import { css } from "@emotion/react";
import { HTMLAttributes, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Status = "ready" | "recording" | "done";

export default function RecordStoryPage() {
  const [status, setStatus] = useState<Status>("ready");
  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState<string>("");
  const navigate = useNavigate();

  // 녹음 관련 상태 및 레퍼런스
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get("selected");

  // 녹음 시작/중지 및 서버로 전송
  const handleRecordButtonClick = async () => {
    if (status === "ready") {
      // 녹음 시작
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("audio", audioBlob);

            // 서버에 음성 전송 및 텍스트 변환 요청
            setIsLoading(true);
            const response = await fetch("https://port-0-aiary-server-m2jzwr6m2bfa735a.sel4.cloudtype.app/stt", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            setContents(result.transcription); // 변환된 텍스트 화면에 표시
            setIsLoading(false);

            setStatus("ready");
          }
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setStatus("recording");
      } catch (error) {
        console.error("녹음 중 오류 발생:", error);
      }
    } else if (status === "recording") {
      // 녹음 중지
      mediaRecorderRef.current?.stop();
      setStatus("done");
    }
  };

  const handleNextButtonClick = () => {
    navigate({
      pathname: PATH.RESULT_PAGE,
      search: `?selected=${selectedItem}`,
    }, {
      state: {contents},
    });
  };

  const handleTextChangeEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setContents(target.value);
  };

  return (
    <div
      css={css`
        padding: 48px 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
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
          들려주신 이야기로 그림을 그려드릴게요
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
          음성으로 15초 정도 들려주세요!
        </h1>
      </div>
      <textarea
        css={css`
          display: flex;
          height: 360px;
          width: 100%;
          padding: 10px 12px;
          align-items: flex-start;
          align-self: stretch;
          border: none;
          outline: none;
          resize: none;
          flex-grow: 1;
          display: block;

          border-radius: 12px;
          background: #f2f4f9;
          z-index: 51;

          color: #313541;

          /* Body/Body 04 */
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 140%; /* 19.6px */
          letter-spacing: -0.42px;

          :focus {
            outline: 1px solid #505564;
          }

          ::placeholder {
            color: #8e94a3;
          }
        `}
        placeholder="들려주신 이야기는 여기에 입력돼요."
        value={contents}
        onChange={handleTextChangeEvent}
      />
      <div
        css={css`
          display: flex;
          width: 64px;
          height: 64px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;

          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

          margin-top: 36px;
          position: relative;
          z-index: 51;
          cursor: pointer;
        `}
        onClick={handleRecordButtonClick}
      >
        <Tooltip
          css={css`
            position: absolute;
            top: -56px;
          `}
        >
          {status === "ready" && "눌러서 녹음하기"}
          {status === "recording" && "녹음중..."}
          {status === "done" && "누르면 처음부터 다시 녹음돼요"}
        </Tooltip>
        <img
          src="/images/mic.svg"
          css={css`
            width: 28px;
            height: 28px;
          `}
        />
      </div>
      <Counter status={status} />
      <div
        css={css`
          padding: 12px 0 8px;
          width: 100%;
        `}
      >
        <Button onClick={handleNextButtonClick} disabled={!contents}>
          다음
        </Button>
      </div>
      {status === "recording" && <BackDrop />}
      {isLoading && <LoadingScreen />}
    </div>
  );
}

const Tooltip = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      css={css`
        display: flex;
        padding: 12px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        background: #313541;
        position: relative;

        color: #fff;
        text-align: center;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 14px */
        letter-spacing: -0.42px;
        width: fit-content;
        white-space: nowrap;
        z-index: 100;
        cursor: default;
        pointer-events: none;
      `}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        css={css`
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          margin: 0 auto;
        `}
      >
        <path
          d="M11.4863 9.80213C9.9419 12.5477 9.16969 13.9205 8 13.9205C6.8303 13.9205 6.0581 12.5477 4.5137 9.80213L2.35309 5.96104C0.860427 3.30742 0.114097 1.98062 0.693277 0.990306C1.27246 -1.37495e-06 2.79477 -1.24186e-06 5.83939 -9.75692e-07L10.1606 -5.97918e-07C13.2052 -3.31749e-07 14.7275 -1.98664e-07 15.3067 0.990308C15.8859 1.98062 15.1396 3.30743 13.6469 5.96104L11.4863 9.80213Z"
          fill="#313541"
        />
      </svg>
    </div>
  );
};

const BackDrop = () => {
  return (
    <div
      css={css`
        width: 360px;
        height: 800px;
        flex-shrink: 0;
        background: rgba(0, 0, 0, 0.2);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
      `}
    />
  );
};

const Counter = ({
  status,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { status: Status }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (status !== "recording") return;
    setCount(0);

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      console.log("222");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("1212");
    };
  }, [status]);

  return (
    <p
      css={css`
        color: #313541;
        text-align: center;

        /* Sub Title/Sub Title 01 */
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%; /* 14px */
        letter-spacing: -0.42px;
        margin-top: 10px;
        z-index: 51;

        visibility: ${status === "ready" ? "hidden" : "visible"};
      `}
      {...props}
    >
      {generateCounterString(count)}
    </p>
  );
};

const generateCounterString = (count: number) => {
  const minute = Math.floor(count / 60);
  const second = count % 60;

  const secondString = second < 10 ? `0${second}` : second;

  return `${minute}:${secondString}`;
};

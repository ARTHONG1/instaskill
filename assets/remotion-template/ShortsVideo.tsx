import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
  Audio
} from "remotion";

interface SceneProps {
  imageName: string;
  title: string;
  subTitle: string;
  badgeText: string;
  sceneIndex: number;
}

const Scene: React.FC<SceneProps> = ({ imageName, title, subTitle, badgeText, sceneIndex }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring animation
  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 }
  });

  // Subtle Ken Burns zoom effect
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Card slide up + pop
  const cardY = interpolate(entranceProgress, [0, 1], [60, 0]);
  const cardOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Exit fade out on last 8 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating particles/confetti progress
  const floatY = Math.sin(frame * 0.08) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FBF8F2 0%, #F3ECE0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "70px 50px 80px",
        opacity: exitOpacity,
        overflow: "hidden"
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,214,165,0.45) 0%, rgba(251,248,242,0) 70%)",
          borderRadius: "50%"
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          zIndex: 10,
          transform: `translateY(${interpolate(entranceProgress, [0, 1], [-40, 0])}px)`,
          opacity: cardOpacity
        }}
      >
        <div
          style={{
            background: "#4F46E5",
            color: "#FFFFFF",
            fontSize: "26px",
            fontWeight: 800,
            padding: "10px 28px",
            borderRadius: "50px",
            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)",
            letterSpacing: "0.02em"
          }}
        >
          {badgeText}
        </div>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#1F2937",
            textAlign: "center",
            lineHeight: 1.3
          }}
        >
          {title}
        </h2>
      </div>

      {/* Main Illustration Card with Ken Burns Zoom */}
      <div
        style={{
          width: "920px",
          height: "1150px",
          borderRadius: "44px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 6px #FFFFFF",
          transform: `translateY(${cardY + floatY}px) scale(${scale})`,
          opacity: cardOpacity,
          zIndex: 5,
          background: "#FFFFFF"
        }}
      >
        <Img
          src={staticFile(imageName)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Bottom Subtitle / CTA */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          padding: "18px 36px",
          borderRadius: "30px",
          border: "2px solid #E5E7EB",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 10,
          transform: `translateY(${interpolate(entranceProgress, [0, 1], [40, 0])}px)`,
          opacity: cardOpacity
        }}
      >
        <span style={{ fontSize: "28px" }}>✨</span>
        <span style={{ fontSize: "24px", fontWeight: 700, color: "#374151" }}>
          {subTitle}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const ClassddokShorts: React.FC = () => {
  const sceneDuration = 105; // 3.5s per scene @ 30fps

  const scenes = [
    {
      imageName: "01-cover-sketch.png",
      badgeText: "🚀 화제의 에듀테크 서비스",
      title: "수업 퀴즈 & 학습지, 유튜브 링크로 1분 컷!",
      subTitle: "현직 교사가 만든 AI 수업 도구 | classddok.com"
    },
    {
      imageName: "02-comparison-sketch.png",
      badgeText: "🤔 기존 vs 클래스똑딱",
      title: "더 이상 영상 멈추고 직접 타이핑하지 마세요!",
      subTitle: "30분 걸리던 문제 출제 ➔ 단 1분으로 단축 ⚡"
    },
    {
      imageName: "04-multilingual-sketch.png",
      badgeText: "📱 초간단 3단계 사용법",
      title: "유튜브 링크 넣고 ➔ 유형 선택 ➔ 출제 끝!",
      subTitle: "복잡한 설정 없이 누구나 바로 사용 가능"
    },
    {
      imageName: "03-steps-sketch.png",
      badgeText: "🌏 킬러 기능 ① 다문화 지원",
      title: "다문화 학생을 위한 5개 국어 자동 번역",
      subTitle: "영·중·일·베·러 다국어 맞춤 시험지 동시 제작"
    },
    {
      imageName: "05-worksheet-sketch.png",
      badgeText: "🖨️ 킬러 기능 ② 인쇄용 학습지",
      title: "예쁜 배부용 시험지 & 교사용 정답지 완비",
      subTitle: "화면에서 끝이 아닌 A4 인쇄용 템플릿 제공"
    },
    {
      imageName: "06-tips-sketch.png",
      badgeText: "💡 현직 교사의 실전 꿀팁",
      title: "자막 맞춤법 10초 점검 & Blooket 연동 예고",
      subTitle: "수업 퀄리티를 200% 높이는 활용 노하우"
    },
    {
      imageName: "07-outro-sketch.png",
      badgeText: "🎁 선생님, 이제 칼퇴해요!",
      title: "선생님의 퇴근 시간을 앞당겨 드립니다",
      subTitle: "지금 classddok.com에서 무료로 시작하세요!"
    }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Background Music Track */}
      <Audio src={staticFile("bgm.wav")} volume={0.8} />

      {/* Scenes Sequence */}
      {scenes.map((scene, idx) => (
        <Sequence
          key={idx}
          from={idx * sceneDuration}
          durationInFrames={sceneDuration}
        >
          <Scene
            imageName={scene.imageName}
            badgeText={scene.badgeText}
            title={scene.title}
            subTitle={scene.subTitle}
            sceneIndex={idx}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

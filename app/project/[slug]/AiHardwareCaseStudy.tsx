"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import type { ProjectData } from "./ProjectDetailClient";

type Navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

const heroTypingText = "让空气，和你一起训练。";

const backgroundDrivers = [
  { icon: "⊘", label: "疫情受限" },
  { icon: "¥", label: "经济约束" },
  { icon: "♡", label: "健康焦虑" },
  { icon: "▶", label: "线上健身资源丰富" },
  { icon: "⌚", label: "智能穿戴普及" },
  { icon: "◎", label: "社群激励文化" },
];

const backgroundBehaviors = [
  { icon: "◐", label: "高度个性化" },
  { icon: "↗", label: "数据记录与追踪" },
  { icon: "⇄", label: "社交分享" },
  { icon: "✦", label: "善用科技工具" },
];

const researchSteps = [
  { icon: "◎", label: "现象观察" },
  { icon: "⌁", label: "需求挖掘" },
  { icon: "✦", label: "科学验证" },
  { icon: "↗", label: "机会定位" },
];

const roadmapRibbonColors = ["mint", "rose", "coral", "apricot"];

const roadmapRibbonSegments = [
  { className: "is-horizontal is-first", start: 0.02 },
  { className: "is-corner is-turn-one", start: 0.08 },
  { className: "is-vertical is-drop-one", start: 0.12 },
  { className: "is-corner is-turn-two", start: 0.19 },
  { className: "is-horizontal is-second", start: 0.23 },
  { className: "is-corner is-turn-three", start: 0.29 },
  { className: "is-vertical is-drop-two", start: 0.33 },
  { className: "is-corner is-turn-four", start: 0.4 },
  { className: "is-horizontal is-third", start: 0.44 },
];

const painPoints = [
  {
    number: "01",
    title: "舒适，不等于健康",
    body: "用户习惯凭体感把温度调低，却会担心直吹造成头痛，也不知道怎样的环境才真正有利于运动。",
  },
  {
    number: "02",
    title: "控制，打断了运动",
    body: "训练中停下来找遥控器、反复调节温度，会破坏连续性与沉浸感。",
  },
  {
    number: "03",
    title: "一个设定，无法照顾所有人",
    body: "运动类型、阶段、性别、体能与实时状态不同，对环境的需求也随之改变。",
  },
  {
    number: "04",
    title: "用户需要可信的建议",
    body: "相比单纯“更凉”，用户更希望系统理解身体状态，主动响应并提供有依据的健康指导。",
  },
];

const formalExerciseModes = {
  aerobic: {
    label: "有氧运动",
    imageSrc: "/fitair/timeline-active-aerobic.png",
    imageAlt: "有氧运动人物插画",
    heartRate: "117-170 bpm",
    bloodOxygen: "95-99%",
    temperature: "21-23℃",
    humidity: "45-60%",
    oxygen: "21-23%",
  },
  anaerobic: {
    label: "无氧运动",
    imageSrc: "/fitair/timeline-active-anaerobic.png",
    imageAlt: "无氧运动人物插画",
    heartRate: "156-170 bpm",
    bloodOxygen: "92-97%",
    temperature: "18-22℃",
    humidity: "35-50%",
    oxygen: "20-21%",
  },
  relaxation: {
    label: "放松运动",
    imageSrc: "/fitair/timeline-active-relaxation.png",
    imageAlt: "放松运动人物插画",
    heartRate: "75-110 bpm",
    bloodOxygen: "98-100%",
    temperature: "22-26℃",
    humidity: "55-65%",
    oxygen: "21-22%",
  },
} as const;

type FormalExerciseMode = keyof typeof formalExerciseModes;

const formalExerciseModeOrder: FormalExerciseMode[] = [
  "aerobic",
  "anaerobic",
  "relaxation",
];

const insights = [
  {
    number: "01",
    kicker: "INVISIBLE COACH",
    title: "环境应该像一位看不见的教练。",
    body: "用科学知识和实时反馈主动配置环境、持续调整，让用户专注于运动本身。",
  },
  {
    number: "02",
    kicker: "PERSONAL BY DEFAULT",
    title: "个性化不是附加功能，而是基础能力。",
    body: "用户画像与实时状态画像共同决定调节策略；同一个人也会在不同运动阶段产生不同需求。",
  },
  {
    number: "03",
    kicker: "SERVICE LOOP",
    title: "一次控制，需要升级成完整服务闭环。",
    body: "从计划、执行到记录、分享和激励，环境服务贯穿整段运动旅程。",
  },
];

const inputSignals = [
  ["可穿戴设备", "心率 / 血氧 / 运动类型"],
  ["环境传感器", "温度 / 湿度 / CO₂ / 颗粒物"],
  ["用户与情境", "性别 / 体能 / 运动阶段"],
  ["主动反馈", "App / 语音微调"],
];

const outputActions = [
  ["日立空调", "温度 / 湿度 / 风速 / 风向"],
  ["空气设备", "加湿 / 除湿 / 新风"],
  ["空间氛围", "智能灯光 / 音响"],
  ["服务触点", "App / 运动报告 / 社区"],
];

const solutionArchitecture = [
  {
    number: "01",
    label: "SCENARIO / 场景",
    groups: [
      ["运动场景", "运动阶段"],
      ["实时环境", "运动方式 · 温度 · 湿度 · 风向 · 氧气"],
    ],
  },
  {
    number: "02",
    label: "COMMUNITY / 社区",
    groups: [
      ["好友互动", "好友排行榜 · 运动成就勋章"],
      ["经验延续", "训练经验分享"],
    ],
  },
  {
    number: "03",
    label: "SMART DEVICES / 智能设备",
    groups: [
      ["设备管理", "空气设备统一连接"],
      ["穿戴同步", "Apple Watch 实时同步"],
    ],
  },
  {
    number: "04",
    label: "MY / 我的",
    groups: [
      ["我的运动", "运动档案"],
      ["运动与健康", "运动环境建议"],
    ],
  },
] as const;

const solutionChapters = [
  {
    number: "01",
    label: "PROFILE & RECORD / 个性档案与运动记录",
    title: "先理解用户，再开始训练。",
    body: "以用户画像、身体数据与运动历史支持差异化服务，让后续环境建议拥有清晰的个人依据。",
    images: [
      "/fitair/solution-profile-1.png",
      "/fitair/solution-profile-2.png",
      "/fitair/solution-profile-3.png",
      "/fitair/solution-profile-4.png",
    ],
  },
  {
    number: "02",
    label: "THREE-STAGE MODES / 三阶段运动模式",
    title: "把完整训练拆成可执行的阶段。",
    body: "围绕热身、正式运动与拉伸恢复组织模式，并支持不同运动类型的场景选择。",
    images: [
      "/fitair/solution-stages-1.png",
      "/fitair/solution-stages-2.png",
      "/fitair/solution-stages-3.png",
      "/fitair/solution-stages-4.png",
      "/fitair/solution-stages-5.png",
      "/fitair/solution-stages-6.png",
      "/fitair/solution-stages-7.png",
    ],
  },
  {
    number: "03",
    label: "ADAPTIVE CONTROL / 实时自适应调节",
    title: "让环境跟随运动状态持续变化。",
    body: "根据运动阶段与实时数据持续优化环境，用户也可以通过 App 进行及时微调。",
    images: [
      "/fitair/solution-adaptive-1.png",
      "/fitair/solution-adaptive-2.png",
      "/fitair/solution-adaptive-3.png",
      "/fitair/solution-adaptive-4.png",
      "/fitair/solution-adaptive-5.png",
      "/fitair/solution-adaptive-6.png",
    ],
  },
  {
    number: "04",
    label: "WEARABLE SYNC / 穿戴设备实时同步",
    title: "把身体状态接入环境决策。",
    body: "连接运动手表与家中空气设备，让运动类型和实时身体状态进入调节过程。",
    images: [
      "/fitair/solution-watch-1.png",
      "/fitair/solution-watch-2.png",
      "/fitair/solution-watch-3.png",
      "/fitair/solution-watch-4.png",
    ],
  },
] as const;

function SectionHeading({
  eyebrow,
  children,
  intro,
  indexMedia,
}: {
  eyebrow: string;
  children: ReactNode;
  intro?: string;
  indexMedia?: {
    src: string;
    alt: string;
  };
}) {
  return (
    <header className="fitair-v2-heading reveal">
      <div className="fitair-v2-index">
        <span>{eyebrow}</span>
        {indexMedia ? (
          <figure className="fitair-v2-index-media">
            <img src={indexMedia.src} alt={indexMedia.alt} />
          </figure>
        ) : null}
      </div>
      <div>
        <h2>{children}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </header>
  );
}

function ExerciseMetrics({
  heartRate,
  bloodOxygen,
  temperature,
  humidity,
  oxygen,
}: {
  heartRate: string;
  bloodOxygen: string;
  temperature: string;
  humidity: string;
  oxygen: string;
}) {
  return (
    <div className="fitair-v2-timeline-metric-groups">
      <section className="fitair-v2-timeline-metric-group" aria-label="身体特征">
        <h4>身体特征</h4>
        <div className="fitair-v2-timeline-metrics is-body">
          <article>
            <img src="/fitair/timeline-heart-rate.png" alt="" aria-hidden="true" />
            <span>心率</span>
            <strong>{heartRate}</strong>
          </article>
          <article>
            <img src="/fitair/timeline-blood-oxygen.png" alt="" aria-hidden="true" />
            <span>血氧</span>
            <strong>{bloodOxygen}</strong>
          </article>
        </div>
      </section>
      <section className="fitair-v2-timeline-metric-group" aria-label="理想环境">
        <h4>理想环境</h4>
        <div className="fitair-v2-timeline-metrics is-environment">
          <article>
            <img src="/fitair/timeline-temperature.png" alt="" aria-hidden="true" />
            <span>温度</span>
            <strong>{temperature}</strong>
          </article>
          <article>
            <img src="/fitair/timeline-humidity.png" alt="" aria-hidden="true" />
            <span>湿度</span>
            <strong>{humidity}</strong>
          </article>
          <article>
            <img src="/fitair/timeline-oxygen.png" alt="" aria-hidden="true" />
            <span>氧气</span>
            <strong>{oxygen}</strong>
          </article>
        </div>
      </section>
    </div>
  );
}

export default function AiHardwareCaseStudy({
  project,
  navigate,
}: {
  project: ProjectData;
  navigate: Navigate;
}) {
  const [formalExerciseMode, setFormalExerciseMode] =
    useState<FormalExerciseMode>("aerobic");
  const [solutionChapterIndex, setSolutionChapterIndex] = useState(0);
  const [solutionScreenIndex, setSolutionScreenIndex] = useState(0);
  const futureRoadmapRef = useRef<HTMLDivElement>(null);
  const selectedFormalExercise = formalExerciseModes[formalExerciseMode];
  const selectedSolutionChapter = solutionChapters[solutionChapterIndex];

  const selectSolutionChapter = (index: number) => {
    setSolutionChapterIndex(index);
    setSolutionScreenIndex(0);
  };

  const showAdjacentSolutionScreen = (direction: -1 | 1) => {
    setSolutionScreenIndex((current) => {
      const screenCount = selectedSolutionChapter.images.length;
      return (current + direction + screenCount) % screenCount;
    });
  };

  useEffect(() => {
    const roadmap = futureRoadmapRef.current;
    if (!roadmap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      roadmap.style.setProperty("--roadmap-progress", "1");
      roadmap
        .querySelectorAll<HTMLElement>(
          "[data-roadmap-segment], [data-roadmap-stage]",
        )
        .forEach((element) => {
          element.style.setProperty("--roadmap-segment-progress", "1");
          element.style.setProperty("--roadmap-stage-progress", "1");
          element.style.setProperty("--roadmap-stage-offset", "0px");
        });
      return;
    }

    let animationFrame = 0;

    const updateRoadmapProgress = () => {
      const bounds = roadmap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const entryPoint = viewportHeight * 0.86;
      const exitPoint = Math.max(120, viewportHeight * 0.18);
      const travel = bounds.height + entryPoint - exitPoint;
      const progress = Math.min(1, Math.max(0, (entryPoint - bounds.top) / travel));

      roadmap.style.setProperty("--roadmap-progress", progress.toFixed(4));
      roadmap
        .querySelectorAll<HTMLElement>("[data-roadmap-segment]")
        .forEach((segment) => {
          const start = Number(segment.dataset.start ?? 0);
          const segmentProgress = Math.min(
            1,
            Math.max(0, (progress - start) / 0.12),
          );
          segment.style.setProperty(
            "--roadmap-segment-progress",
            segmentProgress.toFixed(4),
          );
        });
      roadmap
        .querySelectorAll<HTMLElement>("[data-roadmap-stage]")
        .forEach((stage) => {
          const start = Number(stage.dataset.start ?? 0);
          const stageProgress = Math.min(1, Math.max(0, (progress - start) / 0.15));
          stage.style.setProperty(
            "--roadmap-stage-progress",
            stageProgress.toFixed(4),
          );
          stage.style.setProperty(
            "--roadmap-stage-offset",
            `${((1 - stageProgress) * 32).toFixed(2)}px`,
          );
        });
      animationFrame = 0;
    };

    const requestRoadmapUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateRoadmapProgress);
    };

    requestRoadmapUpdate();
    window.addEventListener("scroll", requestRoadmapUpdate, { passive: true });
    window.addEventListener("resize", requestRoadmapUpdate);

    return () => {
      window.removeEventListener("scroll", requestRoadmapUpdate);
      window.removeEventListener("resize", requestRoadmapUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleFormalExerciseKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % formalExerciseModeOrder.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + formalExerciseModeOrder.length) %
        formalExerciseModeOrder.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = formalExerciseModeOrder.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextMode = formalExerciseModeOrder[nextIndex];
    setFormalExerciseMode(nextMode);
    requestAnimationFrame(() => {
      document.getElementById(`fitair-formal-${nextMode}-tab`)?.focus();
    });
  };

  return (
    <div className="fitair-v2">
      <section className="fitair-v2-hero" id="fitair-hero">
        <div className="fitair-v2-hero-grid" aria-hidden="true" />
        <div className="fitair-v2-hero-stage">
          <div className="fitair-v2-hero-title reveal">
            <p className="fitair-v2-brand-title">
              <span>HITACHI–</span>
              <b>Fitair</b>
            </p>
            <h1>
              Air That
              <br />
              Trains With
              <br />
              You.
            </h1>
            <p className="fitair-v2-hero-deck">
              Scene-Smart Solutions for Gen-Z&apos;s Home Workout Routine
            </p>
          </div>
          <figure className="fitair-v2-hero-art reveal">
            <img
              src="/fitair/hero-athlete.png"
              alt="FitAir 项目主视觉：一位手持瑜伽垫的居家运动者"
            />
          </figure>
        </div>
        <div className="fitair-v2-hero-bottom">
          <strong className="fitair-v2-typewriter" aria-label={heroTypingText}>
            <span aria-hidden="true">
              {Array.from(heroTypingText).map((character, index) => (
                <i
                  key={`${character}-${index}`}
                  style={{ "--fitair-char-index": index } as CSSProperties}
                >
                  {character}
                </i>
              ))}
            </span>
          </strong>
          <p>
            面向 Z 世代居家运动者的 AI 智能环境生态系统。它感知身体与空间状态，在运动前、中、后主动协调家中设备。
          </p>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      <section className="fitair-v2-background fitair-v2-pad" id="fitair-background">
        <SectionHeading
          eyebrow="BACKGROUND & CHALLENGE / 背景与挑战"
          intro="日立空调 × Z 世代居家运动"
        >
          从全球气候，到个人身体。
        </SectionHeading>

        <div className="fitair-v2-background-market reveal">
          <div className="fitair-v2-background-market-copy">
            <h3>
              以科技<em>赋能运动</em>，打开<em>智能健康家居</em>的新空间。
            </h3>
            <p>
              日立空调希望借助全球气候变暖趋势与亚太市场（尤其是中国）的增长潜力，
              通过面向未来的产品战略，开拓中国内地智能健康家居的新市场空间。
            </p>
            <div className="fitair-v2-background-signals" aria-label="战略机会关键词">
              <span>GLOBAL CLIMATE</span>
              <span>APAC · CHINA</span>
              <span>SMART HEALTH HOME</span>
            </div>
          </div>
          <figure className="fitair-v2-background-image">
            <img
              src="/fitair/background-challenge.jpg"
              alt="蓝色室内环境中的壁挂式空调、座椅与绿植"
            />
          </figure>
        </div>

        <div className="fitair-v2-background-context">
          <div className="fitair-v2-background-context-heading reveal">
            <h3>
              外部变化推动<em>居家运动</em>，<em>数字工具</em>重塑行为习惯。
            </h3>
          </div>
          <div className="fitair-v2-keyword-groups">
            <div className="fitair-v2-keyword-group reveal">
              <div className="fitair-v2-keyword-title">
                <span>成因</span>
                <small>CONTEXT DRIVERS · 06</small>
              </div>
              <ul>
                {backgroundDrivers.map((item) => (
                  <li key={item.label}>
                    <i aria-hidden="true">{item.icon}</i>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fitair-v2-keyword-group is-behavior reveal">
              <div className="fitair-v2-keyword-title">
                <span>行为特征</span>
                <small>BEHAVIOR TRAITS · 04</small>
              </div>
              <ul>
                {backgroundBehaviors.map((item) => (
                  <li key={item.label}>
                    <i aria-hidden="true">{item.icon}</i>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </section>

      <section className="fitair-v2-pain fitair-v2-pad" id="fitair-pain">
        <SectionHeading
          eyebrow="USER PAIN POINTS / 用户痛点"
          intro="快速民族志与 10 位有规律居家运动习惯的 Z 世代用户访谈。"
          indexMedia={{
            src: "/fitair/pain-user.png",
            alt: "Z 世代居家运动用户角色插画",
          }}
        >
          <span className="fitair-v2-heading-line">用户想要的不是更冷，</span>
          <span className="fitair-v2-heading-line">而是被系统理解。</span>
        </SectionHeading>
        <div className="fitair-v2-pain-list">
          {painPoints.map((point) => (
            <article className="fitair-v2-pain-row reveal" key={point.number}>
              <span>{point.number}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
              <i aria-hidden="true">↘</i>
            </article>
          ))}
        </div>
        <div className="fitair-v2-research-line reveal">
          {researchSteps.map((step, index) => (
            <span className="fitair-v2-research-step" key={step.label}>
              <i aria-hidden="true">{step.icon}</i>
              <b>{step.label}</b>
              {index < researchSteps.length - 1 ? <em aria-hidden="true">→</em> : null}
            </span>
          ))}
        </div>
      </section>

      <section className="fitair-v2-science fitair-v2-pad" id="fitair-science">
        <SectionHeading
          eyebrow="SCIENTIFIC BASIS / 科学依据"
          intro="多因素影响室内运动——多维空气管理"
        >
          什么是理想的运动环境？
        </SectionHeading>
        <div className="fitair-v2-science-parameters" aria-label="运动环境的三项关键参数">
          <article className="reveal">
            <span className="fitair-v2-science-parameter-icon" aria-hidden="true">°C</span>
            <div>
              <small>01 · TEMPERATURE</small>
              <strong>温度</strong>
            </div>
          </article>
          <article className="reveal">
            <span className="fitair-v2-science-parameter-icon" aria-hidden="true">H₂O</span>
            <div>
              <small>02 · HUMIDITY</small>
              <strong>湿度</strong>
            </div>
          </article>
          <article className="reveal">
            <span className="fitair-v2-science-parameter-icon" aria-hidden="true">O₂</span>
            <div>
              <small>03 · OXYGEN & AIR</small>
              <strong>氧气与空气</strong>
            </div>
          </article>
        </div>
        <p className="fitair-v2-science-system-intro reveal">
          理想环境并不总是最舒适的环境；它必须跟随运动目标与身体状态变化。
        </p>
        <div className="fitair-v2-science-system reveal">
          <figure className="fitair-v2-science-device">
            <img src="/fitair/science-device.png" alt="环境控制设备示意图" />
            <figcaption>ENVIRONMENT CONTROL / 环境控制</figcaption>
          </figure>
          <div className="fitair-v2-science-effects">
            <article>
              <span>01</span>
              <strong>提升环境舒适度</strong>
              <i aria-hidden="true">→</i>
            </article>
            <article>
              <span>02</span>
              <strong>通过环境调节，支持运动表现</strong>
              <i aria-hidden="true">→</i>
            </article>
          </div>
          <figure className="fitair-v2-science-athlete">
            <img src="/fitair/science-athlete.png" alt="处于运动状态中的人物插画" />
            <figcaption>BODY IN MOTION / 运动中的身体</figcaption>
          </figure>
        </div>
        <div className="fitair-v2-exercise-timeline reveal">
          <header className="fitair-v2-timeline-heading">
            <h3>运动状态不断变化——动态调节</h3>
          </header>
          <div className="fitair-v2-timeline-axis" aria-hidden="true" />

          <article className="fitair-v2-timeline-step is-left">
            <div className="fitair-v2-timeline-card">
              <header>
                <span>PHASE 01 · WARM-UP</span>
                <h3>热身</h3>
              </header>
              <ExerciseMetrics
                heartRate="98-110 bpm"
                bloodOxygen="98-100%"
                temperature="23.5-26℃"
                humidity="40-60%"
                oxygen="21%"
              />
              <p className="fitair-v2-timeline-logic">
                <span>LOGIC / 逻辑说明</span>
                略高温度帮助肌肉预热。
              </p>
            </div>
            <div className="fitair-v2-timeline-node" aria-hidden="true">
              <span>01</span>
            </div>
            <div className="fitair-v2-timeline-side-label is-visual">
              <img
                alt="热身阶段人物伸展插画"
                src="/fitair/timeline-warmup.png"
              />
            </div>
          </article>

          <article className="fitair-v2-timeline-step is-right">
            <div className="fitair-v2-timeline-side-label is-visual">
              <img
                alt={selectedFormalExercise.imageAlt}
                className="fitair-v2-timeline-stage-image"
                key={formalExerciseMode}
                src={selectedFormalExercise.imageSrc}
              />
            </div>
            <div className="fitair-v2-timeline-node" aria-hidden="true">
              <span>02</span>
            </div>
            <div className="fitair-v2-timeline-card is-interactive">
              <header>
                <span>PHASE 02 · ACTIVE TRAINING</span>
                <h3>正式运动</h3>
              </header>
              <div
                className="fitair-v2-timeline-tabs"
                role="tablist"
                aria-label="选择正式运动类型"
              >
                {formalExerciseModeOrder.map((mode, index) => (
                  <button
                    aria-controls="fitair-formal-exercise-panel"
                    aria-selected={formalExerciseMode === mode}
                    className={formalExerciseMode === mode ? "is-active" : undefined}
                    id={`fitair-formal-${mode}-tab`}
                    key={mode}
                    onClick={() => setFormalExerciseMode(mode)}
                    onKeyDown={(event) => handleFormalExerciseKeyDown(event, index)}
                    role="tab"
                    tabIndex={formalExerciseMode === mode ? 0 : -1}
                    type="button"
                  >
                    {formalExerciseModes[mode].label}
                  </button>
                ))}
              </div>
              <div
                aria-live="polite"
                aria-labelledby={`fitair-formal-${formalExerciseMode}-tab`}
                className="fitair-v2-timeline-panel"
                id="fitair-formal-exercise-panel"
                key={formalExerciseMode}
                role="tabpanel"
              >
                <ExerciseMetrics
                  heartRate={selectedFormalExercise.heartRate}
                  bloodOxygen={selectedFormalExercise.bloodOxygen}
                  temperature={selectedFormalExercise.temperature}
                  humidity={selectedFormalExercise.humidity}
                  oxygen={selectedFormalExercise.oxygen}
                />
              </div>
            </div>
          </article>

          <article className="fitair-v2-timeline-step is-left">
            <div className="fitair-v2-timeline-card">
              <header>
                <span>PHASE 03 · RECOVERY</span>
                <h3>修复</h3>
              </header>
              <ExerciseMetrics
                heartRate="60-81 bpm"
                bloodOxygen="98-100%"
                temperature="23.5-26℃"
                humidity="50-60%"
                oxygen="21%"
              />
              <p className="fitair-v2-timeline-logic">
                <span>LOGIC / 逻辑说明</span>
                温暖环境防止着凉。
              </p>
            </div>
            <div className="fitair-v2-timeline-node" aria-hidden="true">
              <span>03</span>
            </div>
            <div className="fitair-v2-timeline-side-label is-visual">
              <img
                alt="修复阶段人物伸展插画"
                src="/fitair/timeline-recovery.png"
              />
            </div>
          </article>
        </div>
        <div className="fitair-v2-difference reveal">
          <figure>
            <img
              alt="不同体质与运动状态差异的动态人物摄影"
              loading="lazy"
              src="/fitair/individual-difference.png"
            />
          </figure>
          <p>
            <span>
              <em>女性对温度变化更敏感</em>，需求也会随
              <em>生理周期改变</em>；男性通常更能接受较低温度。
              女性及体能较弱者往往需要<em>更温和的环境</em>。即使动作相同，
              训练状态也在<em>实时变化</em>。
            </span>
          </p>
        </div>
      </section>

      <section className="fitair-v2-insights" id="fitair-insights">
        <div className="fitair-v2-pad">
          <SectionHeading eyebrow="CORE INSIGHTS / 核心洞察">
            真正要设计的，
            <br />
            不是一台更聪明的空调。
          </SectionHeading>
        </div>
        <div className="fitair-v2-insight-stack">
          {insights.map((insight) => (
            <article className="fitair-v2-insight reveal" key={insight.number}>
              <span>{insight.number}</span>
              <div>
                <small>{insight.kicker}</small>
                <h3>{insight.title}</h3>
              </div>
              <p>{insight.body}</p>
            </article>
          ))}
        </div>
        <div className="fitair-v2-concept fitair-v2-pad reveal">
          <div>
            <span>THE ANSWER</span>
            <strong>FitAir</strong>
          </div>
          <p>
            从“设备调空气”转向“服务赋能运动”。
            一个感知、判断、执行并持续学习的智能环境伙伴。
          </p>
        </div>
      </section>

      <section className="fitair-v2-architecture fitair-v2-pad" id="fitair-architecture">
        <SectionHeading
          eyebrow="SYSTEM ARCHITECTURE / 系统架构"
          intro="感知层收集身体与空间信号，AI 云脑生成个性化策略，执行层协调设备与服务；用户反馈再次进入学习循环。"
        >
          一次调节背后，
          <br />
          是一套持续学习的协同系统。
        </SectionHeading>

        <figure className="fitair-v2-architecture-overview reveal">
          <img
            alt="FitAir 系统架构：运动服务能力连接日立智能家居、运动手表、智能家电与 AI 云脑"
            src="/fitair/system-architecture.png"
          />
        </figure>

        <div className="fitair-v2-capabilities reveal" aria-label="FitAir 服务能力">
          {[
            "运动社区",
            "科学模式库",
            "个性化配置",
            "完整运动周期",
            "实时自适应",
            "远程 / 语音控制",
          ].map((item, index) => (
            <span key={item}>
              <i>0{index + 1}</i>
              {item}
            </span>
          ))}
        </div>

        <div className="fitair-v2-network">
          <div className="fitair-v2-network-band reveal">
            <header>
              <span>LAYER 01</span>
              <h3>感知层 / PERCEPTION</h3>
            </header>
            <div className="fitair-v2-node-grid">
              {inputSignals.map(([title, body]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="fitair-v2-flow-arrow" aria-hidden="true">
            <span>STANDARDIZED DATA PROTOCOL</span>
            <i>↓</i>
          </div>

          <div className="fitair-v2-brain reveal">
            <div className="fitair-v2-brain-core">
              <small>LAYER 02 · AI CLOUD BRAIN</small>
              <strong>AI 云脑</strong>
              <span>实时决策引擎</span>
            </div>
            <article>
              <span>01</span>
              <h3>科学知识库</h3>
              <p>知道理论上什么环境更合适。</p>
            </article>
            <article>
              <span>02</span>
              <h3>感知与状态识别</h3>
              <p>理解用户此刻正在经历什么。</p>
            </article>
            <article>
              <span>03</span>
              <h3>画像、学习与决策</h3>
              <p>结合历史微调，为不同用户生成策略。</p>
            </article>
          </div>

          <div className="fitair-v2-flow-arrow" aria-hidden="true">
            <span>PERSONALIZED CONTROL STRATEGY</span>
            <i>↓</i>
          </div>

          <div className="fitair-v2-network-band reveal">
            <header>
              <span>LAYER 03</span>
              <h3>执行与服务层 / EXECUTION</h3>
            </header>
            <div className="fitair-v2-node-grid">
              {outputActions.map(([title, body]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="fitair-v2-learning-loop reveal">
            <span>LEARNING LOOP / 学习闭环</span>
            <p>
              用户通过“再凉快一点”等微调表达偏好；系统将反馈与运动、生理及环境情境一起记录，
              并在下一次相似场景中预先应用。
            </p>
            <i aria-hidden="true">↺</i>
            <figure>
              <img
                alt="FitAir 从观察记录、识别偏好到预测并自动执行的学习闭环"
                src="/fitair/learning-loop.png"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="fitair-v2-solution fitair-v2-pad" id="fitair-solution">
        <SectionHeading eyebrow="HIGH-FIDELITY SOLUTION / 高保真方案">
          从训练前建档，
          <br />
          到训练后复盘。
        </SectionHeading>
        <div className="fitair-v2-solution-summary reveal">
          <strong>ONE EXPERIENCE · THREE MOMENTS</strong>
          <div className="fitair-v2-solution-summary-copy">
            <span>运动前 · 选择模式与初始参数</span>
            <span>运动中 · 同步身体状态并实时调节</span>
            <span>运动后 · 生成报告、分享与激励</span>
          </div>
          <div
            aria-label="运动体验从运动前连续推进至运动后"
            className="fitair-v2-moment-carousel"
          >
            <b>START</b>
            <div className="fitair-v2-moment-carousel-window" aria-hidden="true">
              <div className="fitair-v2-moment-carousel-flow">
                {[0, 1].map((loop) => (
                  <span className="fitair-v2-moment-carousel-set" key={loop}>
                    <i className="is-coral" />
                    <i className="is-apricot" />
                    <i className="is-mint" />
                    <i className="is-rose" />
                  </span>
                ))}
              </div>
            </div>
            <b>FINISH</b>
          </div>
        </div>

        <div className="fitair-v2-solution-overview reveal">
          <div className="fitair-v2-solution-overview-copy">
            <p>
              在日立既有 App 中加入运动场景，让空气设备、运动阶段、身体数据与社区体验进入同一条服务路径。
            </p>
          </div>
          <figure className="fitair-v2-solution-product">
            <img
              src="/fitair/solution-product-effect.png"
              alt="FitAir 手机界面与日立应用图标的产品展示效果"
              loading="lazy"
            />
          </figure>
          <div className="fitair-v2-app-map" aria-label="FitAir App 信息架构">
            <header>
              <span>APP INFORMATION ARCHITECTURE</span>
              <strong>四个入口，覆盖一次完整运动体验。</strong>
            </header>
            <ol>
              {solutionArchitecture.map((branch) => (
                <li key={branch.number}>
                  <div className="fitair-v2-app-map-label">
                    <span>{branch.number}</span>
                    <strong>{branch.label}</strong>
                  </div>
                  <div className="fitair-v2-app-map-groups">
                    {branch.groups.map(([title, body]) => (
                      <div key={title}>
                        <strong>{title}</strong>
                        <span>{body}</span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div id="fitair-solution-details" className="fitair-v2-solution-walkthrough reveal">
          <header className="fitair-v2-solution-walkthrough-heading">
            <span>02 · INTERFACE WALKTHROUGH / 关键界面</span>
            <h3>按使用顺序阅读，而不是逐张浏览。</h3>
          </header>

          <div
            className="fitair-v2-solution-chapter-tabs"
            role="tablist"
            aria-label="高保真方案章节"
          >
            {solutionChapters.map((chapter, index) => (
              <button
                aria-selected={solutionChapterIndex === index}
                className={solutionChapterIndex === index ? "is-active" : ""}
                key={chapter.number}
                onClick={() => selectSolutionChapter(index)}
                role="tab"
                type="button"
              >
                <span>{chapter.number}</span>
                <strong>{chapter.label.split(" / ")[1]}</strong>
              </button>
            ))}
          </div>

          <article className="fitair-v2-solution-chapter" role="tabpanel">
            <div className="fitair-v2-solution-chapter-copy">
              <span>{selectedSolutionChapter.label}</span>
              <h4>{selectedSolutionChapter.title}</h4>
              <p>{selectedSolutionChapter.body}</p>
              <div className="fitair-v2-solution-screen-index">
                <strong>
                  {String(solutionScreenIndex + 1).padStart(2, "0")}
                  <i> / </i>
                  {String(selectedSolutionChapter.images.length).padStart(2, "0")}
                </strong>
                <span>界面顺序</span>
              </div>
            </div>

            <div className="fitair-v2-solution-screen-stage">
              <button
                aria-label="查看上一张界面"
                onClick={() => showAdjacentSolutionScreen(-1)}
                type="button"
              >
                ←
              </button>
              <figure key={`${solutionChapterIndex}-${solutionScreenIndex}`}>
                <img
                  src={selectedSolutionChapter.images[solutionScreenIndex]}
                  alt={`${selectedSolutionChapter.label.split(" / ")[1]}界面 ${
                    solutionScreenIndex + 1
                  }`}
                  loading="lazy"
                />
              </figure>
              <button
                aria-label="查看下一张界面"
                onClick={() => showAdjacentSolutionScreen(1)}
                type="button"
              >
                →
              </button>
            </div>

            <div className="fitair-v2-solution-screen-dots" aria-label="选择界面">
              {selectedSolutionChapter.images.map((image, index) => (
                <button
                  aria-label={`查看界面 ${index + 1}`}
                  aria-pressed={solutionScreenIndex === index}
                  className={solutionScreenIndex === index ? "is-active" : ""}
                  key={image}
                  onClick={() => setSolutionScreenIndex(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="fitair-v2-business fitair-v2-pad" id="fitair-business">
        <SectionHeading
          eyebrow="BUSINESS MODEL / 商业模式"
          intro="不以一件孤立硬件为终点，而以既有设备、软件服务与合作生态共同创造价值。"
        >
          把一次产品销售，
          <br />
          延长为持续的健康服务。
        </SectionHeading>
        <div className="fitair-v2-business-canvas reveal">
          <article className="fitair-v2-business-cell is-partners">
            <span>01 · KEY PARTNERS</span>
            <h3>关键伙伴</h3>
            <ul>
              <li>设备制造商</li>
              <li>健康监测设备企业</li>
              <li>运动专家</li>
              <li>零售伙伴</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-activities">
            <span>02 · KEY ACTIVITIES</span>
            <h3>关键活动</h3>
            <ul>
              <li>产品设计与研发</li>
              <li>数据分析与算法开发</li>
              <li>市场推广</li>
              <li>新产品开发</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-resources">
            <span>03 · KEY RESOURCES</span>
            <h3>关键资源</h3>
            <ul>
              <li>智能硬件研发</li>
              <li>软件与数据分析</li>
              <li>合作伙伴网络</li>
              <li>人力与资金</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-value">
            <span>04 · VALUE PROPOSITION</span>
            <h3>价值主张</h3>
            <figure>
              <img
                alt="进行平衡训练的人物线稿插画"
                src="/fitair/business-value.png"
              />
            </figure>
            <p>
              针对不同运动类型与用户状态，动态提供定制化理想环境，
              提升运动表现与训练舒适度。
            </p>
          </article>
          <article className="fitair-v2-business-cell is-relationships">
            <span>05 · CUSTOMER RELATIONSHIPS</span>
            <h3>客户关系</h3>
            <ul>
              <li>个性化服务</li>
              <li>运动数据追踪与反馈</li>
              <li>社区与品牌文化建设</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-channels">
            <span>06 · CHANNELS</span>
            <h3>渠道</h3>
            <ul>
              <li>自有渠道：日立官网与家电应用</li>
              <li>合作伙伴渠道</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-segments">
            <span>07 · CUSTOMER SEGMENTS</span>
            <h3>客户细分</h3>
            <figure>
              <img
                alt="跑步机训练人物线稿插画"
                src="/fitair/business-treadmill.png"
              />
              <figcaption>Z 世代健康先锋</figcaption>
            </figure>
            <figure>
              <img
                alt="力量训练人物线稿插画"
                src="/fitair/business-weightlifting.png"
              />
              <figcaption>Z 世代健身爱好者</figcaption>
            </figure>
          </article>
          <article className="fitair-v2-business-cell is-cost">
            <span>08 · COST STRUCTURE</span>
            <h3>成本结构</h3>
            <ul>
              <li>AI 模型开发</li>
              <li>基于日立既有设备能力的硬件开发</li>
              <li>软件开发</li>
              <li>市场推广、数据管理与分析</li>
              <li>管理成本</li>
            </ul>
          </article>
          <article className="fitair-v2-business-cell is-revenue">
            <span>09 · REVENUE STREAM</span>
            <h3>收入来源</h3>
            <ul>
              <li>产品直销：通过零售与线上平台销售空气调节硬件</li>
              <li>订阅模式：提供个性化环境数据分析与调节建议</li>
              <li>数据合作：为健康产品企业提供运动数据分析与健康管理支持</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="fitair-v2-future fitair-v2-pad" id="fitair-future">
        <SectionHeading eyebrow="FUTURE ROADMAP / 未来发展计划">
          先建立可信服务，
          <br />
          再扩展产品与全球健康生态。
        </SectionHeading>
        <div
          className="fitair-v2-roadmap reveal"
          ref={futureRoadmapRef}
          style={{ "--roadmap-progress": 0 } as CSSProperties}
        >
          <div className="fitair-v2-roadmap-ribbon" aria-hidden="true">
            {roadmapRibbonColors.map((color) => (
              <div
                className={`fitair-v2-roadmap-stripe is-${color}`}
                key={color}
              >
                {roadmapRibbonSegments.map((segment) => (
                  <span
                    className={`fitair-v2-roadmap-segment ${segment.className}`}
                    data-roadmap-segment
                    data-start={segment.start}
                    key={segment.className}
                  />
                ))}
              </div>
            ))}
          </div>

          <ol className="fitair-v2-roadmap-stages">
            <li
              className="fitair-v2-roadmap-stage is-first"
              data-roadmap-stage
              data-start="0.02"
            >
              <header>
                <span>01</span>
                <strong>NOW · 建立信任</strong>
              </header>
              <h3>健康认知与 App 介入</h3>
              <p>
                通过内容解释温度、湿度与空气如何影响训练；与运动教练及运动生理专家合作。
                将 FitAir 接入日立既有应用，并依据用户运动数据持续优化个性化服务。
              </p>
            </li>
            <li
              className="fitair-v2-roadmap-stage is-second"
              data-roadmap-stage
              data-start="0.22"
            >
              <header>
                <span>02</span>
                <strong>NEXT · 扩展体验</strong>
              </header>
              <h3>探索新的产品体验</h3>
              <p>
                在既有设备升级的基础上，继续探索呼吸灯、AI 运动教练与定制音频等产品方向，
                让环境状态更可见，训练支持更完整。
              </p>
            </li>
            <li
              className="fitair-v2-roadmap-stage is-third"
              data-roadmap-stage
              data-start="0.42"
            >
              <header>
                <span>03</span>
                <strong>FUTURE · 形成生态</strong>
              </header>
              <h3>建立跨行业健康生态</h3>
              <p>
                与全球运动品牌和健康服务机构形成战略合作，推进健康管理服务与公众健康倡议，
                并继续探索健康保险、企业健康管理等 B2B2C 机会。
              </p>
            </li>
          </ol>
        </div>
        <div className="fitair-v2-closing reveal">
          <span>HITACHI FITAIR</span>
          <p>The air no longer waits for instructions. It trains with you.</p>
        </div>
      </section>

      <a
        className="next-project fitair-v2-next"
        href={`/project/${project.nextSlug}`}
        onClick={(event) => navigate(event, `/project/${project.nextSlug}`)}
      >
        <div>
          <p>NEXT PROJECT →</p>
          <h2>{project.nextTitle}</h2>
        </div>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

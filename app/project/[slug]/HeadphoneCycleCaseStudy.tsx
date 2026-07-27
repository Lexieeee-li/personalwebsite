"use client";

import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { ProjectData } from "./ProjectDetailClient";

type Navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

function StakeholderIcon({ index }: { index: number }) {
  const sharedProps = {
    className: "headphone-stakeholder-icon",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  if (index === 0) {
    return (
      <svg {...sharedProps}>
        <circle cx="24" cy="15" r="7" />
        <path d="M11 40c1.5-9 6-13.5 13-13.5S35.5 31 37 40" />
        <path d="M14 30.5 8.5 34v6H14M34 30.5l5.5 3.5v6H34" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...sharedProps}>
        <circle cx="24" cy="14" r="6" />
        <circle cx="10.5" cy="20" r="4.5" />
        <circle cx="37.5" cy="20" r="4.5" />
        <path d="M13 40c1.2-9 4.8-13.5 11-13.5S33.8 31 35 40M3.5 40c.7-6.8 3-10.2 7-10.2 2.1 0 3.8.9 5 2.6M44.5 40c-.7-6.8-3-10.2-7-10.2-2.1 0-3.8.9-5 2.6" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...sharedProps}>
        <path d="m5 19 19-11 19 11" />
        <path d="M9 19h30v21H9zM15 24v11M24 24v11M33 24v11M5 40h38" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...sharedProps}>
        <path d="m24 8 5.2 8.4h-4.1c-5.8 0-9.1 2.2-11.1 6.6M40 27l-5 8.6-2-3.6c-2.8-5-6.2-7.2-12.3-7.2M9 33l9.8.2-2.1-3.5c-3-5.2-2.8-9.4.2-14.6" />
        <path d="m20.5 9.2 3.5-1.3 1.1 3.7M41 31l-1-3.8-3.7 1M10.6 36.5 9 33l3.7-1.2" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <rect x="9" y="9" width="30" height="30" rx="4" />
      <path d="M18 18h12v12H18zM4 18h5M4 30h5M39 18h5M39 30h5M18 4v5M30 4v5M18 39v5M30 39v5" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

const whySignals = [
  {
    value: "540M",
    label: "2024 年全球耳机出货量",
    note: "耳机正在成为高频更新的消费电子产品。",
  },
  {
    value: "≥30%",
    label: "组件中的可回收材料",
    note: "钢、塑料、铜和锌等材料仍有循环价值。",
  },
  {
    value: "2%",
    label: "进入官方回收渠道",
    note: "小型音频电子产品仍缺少清晰、便利的正式入口。",
  },
  {
    value: "49",
    label: "问卷参与者",
    note: "数据用于识别行为趋势，不代表总体统计结论。",
  },
];

const workshopSteps = [
  {
    number: "01",
    title: "Headphone Recycle / Remake",
    cn: "耳机回收与再造",
    image: "/headphone-cycle/p15-06.webp",
    note: "从闲置耳机与使用经历出发，重新理解物品的循环可能。",
  },
  {
    number: "02",
    title: "Name Your Piece",
    cn: "为物件命名",
    image: "/headphone-cycle/p15-05.webp",
    note: "通过命名和标签，让一副耳机从匿名物件变成可被记住的对象。",
  },
  {
    number: "03",
    title: "Brainstorming",
    cn: "共同发散",
    image: "/headphone-cycle/p15-02.webp",
    note: "围绕回收痛点、信任与非金钱激励展开共同讨论。",
  },
  {
    number: "04",
    title: "Story Listening",
    cn: "聆听故事",
    image: "/headphone-cycle/p15-08.webp",
    note: "聆听前任使用者留下的声音，观察情感信息如何改变价值判断。",
  },
  {
    number: "05",
    title: "Leave Your Sound",
    cn: "留下声音",
    image: "/headphone-cycle/p15-03.webp",
    note: "为下一位使用者录制一段可选择匿名保存的声音记忆。",
  },
  {
    number: "06",
    title: "Co-creation",
    cn: "共同创作",
    image: "/headphone-cycle/p15-04.webp",
    note: "把图像、文字与声音线索组合成可继续生长的物件档案。",
  },
  {
    number: "07",
    title: "Sound-Track Web / Wall",
    cn: "连接声音轨迹",
    image: "/headphone-cycle/p15-07.webp",
    note: "用线索连接选择与反馈，形成校园中的声音关系网络。",
  },
];

const findings = [
  {
    value: "100%",
    title: "需要可视化清洁",
    body: "参与者认为清洁与翻新过程的可见性，是建立二手耳机信任的关键。",
  },
  {
    value: "71%",
    title: "优先关注音质",
    body: "情感故事不能替代基础质量，声音表现与检测信息仍是首要判断。",
  },
  {
    value: "86%",
    title: "产生更强情感连接",
    body: "聆听前任使用者的音频故事后，参与者对耳机形成了更深的情感联系。",
  },
  {
    value: "64%",
    title: "期待可选择的校园连接",
    body: "社交需要匿名、可控和自愿，而不是强制公开身份或持续互动。",
  },
];

const circularCycles = [
  {
    key: "retain",
    number: "01",
    title: "Retain / 保留",
    body: "为每一副循环耳机建立唯一数字身份，保存声音故事与流转记录。",
  },
  {
    key: "repair",
    number: "02",
    title: "Repair / 修复",
    body: "公开检测、维护与翻新历史，让质量状态与处理过程可以被验证。",
  },
  {
    key: "remake",
    number: "03",
    title: "Remake / 再造",
    body: "通过 Life Ring 与录音机制，为旧物补充新的情感意义与表达方式。",
  },
  {
    key: "reuse",
    number: "04",
    title: "Reuse / 再使用",
    body: "让用户依据质量、主题与故事选择真正与自己产生共鸣的耳机。",
  },
  {
    key: "regenerate",
    number: "05",
    title: "Regenerate / 再生",
    body: "把无法继续使用的部件导向材料回收，让资源重新进入新的生产循环。",
  },
];

const stakeholders = [
  ["学生用户", "便利入口 · 清洁信任 · 质量信息 · 自主激励"],
  ["学生组织", "社区营造 · 可持续教育 · 活动运营"],
  ["学校管理", "参与度 · 环境影响 · 政策与合作稳定性"],
  ["回收伙伴", "稳定供给 · 质量保障 · 资源循环"],
  ["技术团队", "系统安全 · 用户隐私 · 体验与技术支持"],
];

const roadmap = [
  {
    time: "0–3 MONTHS",
    title: "Prototype Validation",
    cn: "原型验证",
    image: "/headphone-cycle/roadmap-community.webp",
    items: ["部署 1–2 个线下回收箱", "举办一次 Sound Market", "建立初步声音库与筛选、匹配系统", "收集用户反馈与流转数据"],
  },
  {
    time: "3–6 MONTHS",
    title: "Pilot Operation",
    cn: "校园试点",
    image: "/headphone-cycle/roadmap-pop-up.webp",
    items: ["形成标准化 Voice Marketplace 活动工具包", "与高校学生会及环保社团协作", "建立跨高校声音数据库与匹配系统"],
  },
  {
    time: "6–12 MONTHS",
    title: "Ecosystem Expansion",
    cn: "生态扩展",
    image: "/headphone-cycle/roadmap-market.webp",
    items: ["探索与商业空间或公共机构合作", "发展公共回收平台", "构想年度城市声音活动", "探索品牌与媒体合作"],
  },
];

export default function HeadphoneCycleCaseStudy({
  project,
  navigate,
}: {
  project: ProjectData;
  navigate: Navigate;
}) {
  const [activeWorkshop, setActiveWorkshop] = useState(0);
  const [activeCycle, setActiveCycle] = useState(0);
  const selectedWorkshop = workshopSteps[activeWorkshop];
  const selectedCycle = circularCycles[activeCycle];

  return (
    <div className="headphone-case">
      <section className="headphone-hero" id="headphone-top">
        <div className="headphone-hero-grid">
          <div className="headphone-hero-copy reveal">
            <p className="headphone-wordmark">SOUND—TRACK</p>
            <h1>
              Museum
              <br />
              <em>&amp; Lab</em>
            </h1>
            <p className="headphone-hero-cn">校园耳机循环系统</p>
          </div>
          <div className="headphone-hero-visual reveal" aria-hidden="true">
            <span className="headphone-orbit is-one" />
            <img className="headphone-hero-person" src="/headphone-cycle/hero-listener.webp" alt="" />
            <img className="headphone-hero-cable" src="/headphone-cycle/hero-cable.webp" alt="" />
          </div>
        </div>
        <div className="headphone-hero-footer">
          <strong>让声音、记忆与人重新连接，给耳机第二次生命。</strong>
          <p>Campus Headphone Circulation System</p>
          <a href="#headphone-why">SCROLL TO LISTEN ↓</a>
        </div>
      </section>

      <section className="headphone-why headphone-pad" id="headphone-why">
        <header className="headphone-heading reveal">
          <div>
            <h2>
              当耳机快速更新，
              <br />
              循环入口却仍然缺席。
            </h2>
            <p>从材料价值、消费习惯与正式回收缺口，重新判断一副闲置耳机的去向。</p>
          </div>
          <span>WHY HEADPHONES / 为什么是耳机</span>
        </header>
        <div className="headphone-signal-grid">
          {whySignals.map((signal, index) => (
            <article className="headphone-signal reveal" key={signal.value}>
              <span>0{index + 1}</span>
              <strong>{signal.value}</strong>
              <h3>{signal.label}</h3>
              <p>{signal.note}</p>
            </article>
          ))}
        </div>
        <div className="headphone-object-grid reveal">
          <div className="headphone-object-copy">
            <p>OBJECT IN QUESTION / 研究对象</p>
            <h3>
              小、私密、更新快，
              <br />
              却包含可以继续流动的材料与记忆。
            </h3>
          </div>
          <div className="headphone-object-media">
            <figure className="headphone-object-image is-exploded">
              <img src="/headphone-cycle/earbud-exploded.webp" alt="无线耳机组件拆解示意" />
              <figcaption>可拆解的材料结构</figcaption>
            </figure>
            <figure className="headphone-object-image is-photo">
              <img src="/headphone-cycle/headphone-user.webp" alt="年轻耳机使用者" />
              <figcaption>高频使用的私人设备</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="headphone-research headphone-pad" id="headphone-research">
        <header className="headphone-heading is-light reveal">
          <div>
            <h2>真正的障碍，是麻烦、低信任度。</h2>
            <p>问卷于 2026 年 3 月 13–20 日进行，共 49 人参与；结果仅用于识别趋势与障碍。</p>
          </div>
          <span>RESEARCH / 研究发现</span>
        </header>
        <div className="headphone-research-grid">
          <div className="headphone-unused reveal">
            <p>闲置耳机的去向 / RESPONDENTS</p>
            {[
              ["留在宿舍闲置", 37],
              ["直接丢弃", 15],
              ["转售", 8],
              ["送给他人", 6],
            ].map(([label, value]) => (
              <div className="headphone-bar-row" key={label}>
                <span>{label}</span>
                <i style={{ "--bar": `${Number(value) / 37}` } as CSSProperties} />
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="headphone-barriers reveal">
            {[
              ["78%", "流程麻烦"],
              ["44%", "缺乏认知"],
              ["41%", "缺少激励"],
              ["71%", "担心二手音质"],
            ].map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="headphone-hmw reveal">
          <span>HOW MIGHT WE</span>
          <h3>
            如何通过 <em className="headphone-keyword is-orange">非金钱激励</em>，
            <br />
            让学生愿意 <em className="headphone-keyword is-rose">持续参与</em> 校园耳机循环？
          </h3>
        </div>
      </section>

      <section className="headphone-terrain headphone-pad" id="headphone-terrain">
        <header className="headphone-heading reveal">
          <div>
            <h2>
              循环不是单点回收，
              <br />
              而是一组关系的重新编排。
            </h2>
          </div>
          <span>USER TERRAIN / 利益相关者</span>
        </header>
        <div className="headphone-terrain-map reveal">
          <div className="headphone-terrain-center">
            <span>SOUND—TRACK</span>
            <strong>Museum &amp; Lab</strong>
            <p>声音 · 记忆 · 人 · 第二次生命</p>
          </div>
          {stakeholders.map(([name, value], index) => (
            <article className={`is-${index + 1}`} key={name}>
              <div className="headphone-stakeholder-meta">
                <span>0{index + 1}</span>
                <StakeholderIcon index={index} />
              </div>
              <h3>{name}</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="headphone-workshop headphone-pad" id="headphone-workshop">
        <header className="headphone-heading reveal">
          <div>
            <h2>
              当物件开始说话，
              <br />
              人会不会更愿意让它继续流动？
            </h2>
            <p>2026.03.27 · 三小时共同创作工作坊 · 4–8 位核心学生参与者</p>
          </div>
          <span>CO-CREATION WORKSHOP / 共创工作坊</span>
        </header>
        <div className="headphone-workshop-media reveal">
          <figure>
            <img src="/headphone-cycle/workshop-photo-a.webp" alt="学生参与耳机循环共创工作坊" />
          </figure>
          <figure>
            <img src="/headphone-cycle/workshop-photo-b.webp" alt="共创工作坊讨论现场" />
          </figure>
          <div>
            <p>INSPIRATION / 多抓鱼</p>
            <h3>从“旧物交易”转向“物件故事与社区声誉”。</h3>
            <img src="/headphone-cycle/inspiration-duozhuayu.webp" alt="多抓鱼线下空间" />
          </div>
        </div>
        <div className="headphone-workshop-console reveal">
          <div className="headphone-workshop-tabs" role="tablist" aria-label="工作坊七个步骤">
            {workshopSteps.map((step, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeWorkshop === index}
                className={activeWorkshop === index ? "is-active" : ""}
                onClick={() => setActiveWorkshop(index)}
                key={step.number}
              >
                <span>{step.number}</span>
                {step.cn}
              </button>
            ))}
          </div>
          <div className="headphone-workshop-panel" role="tabpanel">
            <div>
              <span>STEP {selectedWorkshop.number}</span>
              <h3>{selectedWorkshop.title}</h3>
              <strong>{selectedWorkshop.cn}</strong>
              <p>{selectedWorkshop.note}</p>
            </div>
            <figure>
              <img src={selectedWorkshop.image} alt={`${selectedWorkshop.cn}步骤说明图`} />
            </figure>
          </div>
        </div>
      </section>

      <section className="headphone-findings headphone-pad" id="headphone-findings">
        <header className="headphone-heading is-light reveal">
          <div>
            <h2>
              情感可以驱动参与，
              <br />
              但信任必须先被看见。
            </h2>
            <p>工作坊与小规模原型反馈用于验证方向，不能视为长期行为成效。</p>
          </div>
          <span>WORKSHOP INSIGHTS / 工作坊洞察</span>
        </header>
        <div className="headphone-finding-grid">
          {findings.map((finding, index) => (
            <article className="reveal" key={finding.value}>
              <span>0{index + 1}</span>
              <strong>{finding.value}</strong>
              <h3>{finding.title}</h3>
              <p>{finding.body}</p>
            </article>
          ))}
        </div>
        <div className="headphone-evidence reveal">
          <figure>
            <img src="/headphone-cycle/workshop-map.webp" alt="工作坊声音与物件关系图" />
          </figure>
          <figure>
            <img src="/headphone-cycle/workshop-thread.webp" alt="参与者使用红线构建关系网络" />
          </figure>
        </div>
      </section>

      <section className="headphone-strategy headphone-pad" id="headphone-strategy">
        <header className="headphone-heading reveal">
          <div>
            <h2>
              把“回收一次”，
              <br />
              改写成可持续参与的体验。
            </h2>
          </div>
          <span>DESIGN STRATEGY / 设计策略</span>
        </header>
        <div className="headphone-principles reveal">
          <article>
            <span>01</span>
            <h3>Emotionally Engaging</h3>
            <p>用声音故事与物件档案建立情感参与，而不是只依赖现金回报。</p>
          </article>
          <article>
            <span>02</span>
            <h3>Visible Care</h3>
            <p>让清洁、检测、维修与翻新历史透明可查，先解决质量与卫生信任。</p>
          </article>
          <article>
            <span>03</span>
            <h3>Low Threshold</h3>
            <p>通过二维码、固定回收点、匿名模式与可选社交降低参与负担。</p>
          </article>
        </div>
        <div className="headphone-cycle reveal">
          <div className="headphone-cycle-tabs" role="tablist" aria-label="循环经济五个环节">
            {circularCycles.map((cycle, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCycle === index}
                className={activeCycle === index ? "is-active" : ""}
                onClick={() => setActiveCycle(index)}
                key={cycle.key}
              >
                <span>{cycle.number}</span>
                <strong>{cycle.title}</strong>
              </button>
            ))}
          </div>
          <div className="headphone-cycle-panel" role="tabpanel">
            <span>{selectedCycle.number} / CIRCULAR ECONOMY</span>
            <h3>{selectedCycle.title}</h3>
            <p>{selectedCycle.body}</p>
          </div>
        </div>
      </section>

      <section className="headphone-system" id="headphone-system">
        <div className="headphone-pad">
          <header className="headphone-heading is-light reveal">
            <div>
              <h2>
                一个线上记忆博物馆，
                <br />
                一场线下声音市场。
              </h2>
              <p>数字身份保存物件故事，线下活动完成清洁、试听、录音、共创与匹配。</p>
            </div>
            <span>SYSTEM MAP / 系统架构</span>
          </header>
          <div className="headphone-system-map reveal">
            <div className="headphone-system-users">
              <span>INPUT</span>
              <strong>学生 · 校友 · 教职员工</strong>
            </div>
            <div className="headphone-system-spine" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <article>
              <span>ONLINE</span>
              <h3>Sound Museum &amp; Lab</h3>
              <p>唯一数字身份 · 声音档案 · 预约回收 · 流转追踪 · 共创社区</p>
            </article>
            <article>
              <span>OFFLINE</span>
              <h3>Sound Market</h3>
              <p>回收箱 · 清洁维修 · 试听 · 录音 · 再造 · 自愿匹配</p>
            </article>
            <div className="headphone-system-partners">
              <span>SUPPORT</span>
              <strong>学校管理 · 学生组织 · 回收伙伴 · 技术团队</strong>
            </div>
          </div>
        </div>

        <div className="headphone-platform headphone-pad">
          <div className="headphone-platform-copy reveal">
            <span>ONLINE PLATFORM</span>
            <h2>让每一副耳机，都拥有可继续书写的 Life Ring。</h2>
            <p>
              平台为循环耳机建立唯一数字身份，把物理流转转化为可追踪、会增长的声音档案。
            </p>
            <ul>
              <li>Listen to the Life Rings / 聆听物件生命环</li>
              <li>Continue the Story / 继续书写故事</li>
              <li>Participate in the Value Cycle / 参与价值循环</li>
              <li>Join the Co-Creation Community / 加入共创社区</li>
            </ul>
          </div>
          <div className="headphone-phone-stack reveal">
            {[
              ["museum-home.webp", "Sound-Track 首页"],
              ["museum-object.webp", "耳机数字身份"],
              ["museum-booking.webp", "回收预约"],
              ["museum-life-rings.webp", "Life Rings 记录"],
            ].map(([src, alt], index) => (
              <img
                className={`is-${index + 1}`}
                src={`/headphone-cycle/${src}`}
                alt={alt}
                key={src}
              />
            ))}
          </div>
        </div>

        <div className="headphone-market headphone-pad">
          <header className="headphone-market-heading reveal">
            <span>OFFLINE POP-UP / SOUND MARKET</span>
            <h2>把回收、维护与相遇，放进一场可被听见的校园活动。</h2>
          </header>
          <img
            className="headphone-market-flow reveal"
            src="/headphone-cycle/freshman-new-voice-event.png"
            alt="Freshman New Voice Social Event 活动流程图"
          />
          <div className="headphone-market-moments reveal">
            <figure>
              <img src="/headphone-cycle/listening-bar.webp" alt="Sound Market 试听吧" />
              <figcaption>LISTEN / 试听前任使用者留下的声音</figcaption>
            </figure>
            <figure>
              <img src="/headphone-cycle/recording-booth.webp" alt="声音回应录制区" />
              <figcaption>REPLY / 录下回应或新的故事</figcaption>
            </figure>
            <figure>
              <img src="/headphone-cycle/match-meet.webp" alt="校园主题匹配与见面场景" />
              <figcaption>MATCH / 在自愿与匿名边界内连接</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="headphone-roadmap headphone-pad" id="headphone-roadmap">
        <header className="headphone-heading reveal">
          <div>
            <h2>
              先在校园验证，
              <br />
              再让城市听见。
            </h2>
            <p>以下为项目提出的发展计划，属于未来探索方向，并非已经实现的运营成效。</p>
          </div>
          <span>FUTURE PROPOSAL / 发展计划</span>
        </header>
        <div className="headphone-roadmap-list">
          {roadmap.map((phase, index) => (
            <article className="headphone-roadmap-step reveal" key={phase.time}>
              <div className="headphone-roadmap-index">
                <span>0{index + 1}</span>
                <strong>{phase.time}</strong>
              </div>
              <figure>
                <img src={phase.image} alt={`${phase.cn}阶段场景示意`} />
              </figure>
              <div>
                <span>{phase.title}</span>
                <h3>{phase.cn}</h3>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="headphone-closing">
        <div className="headphone-closing-title reveal">
          <span>SOUND—TRACK</span>
          <h2>
            A LOOP
            <br />
            WITH <em>EMOTION.</em>
          </h2>
        </div>
        <div className="headphone-closing-values">
          <article>
            <span>01</span>
            <strong>A Loop with Emotion</strong>
            <p>一条有情感的循环</p>
          </article>
          <article>
            <span>02</span>
            <strong>A Symbol of Campus Culture</strong>
            <p>一种校园文化的共同符号</p>
          </article>
          <article>
            <span>03</span>
            <strong>A Network of Memory &amp; Connection</strong>
            <p>一张由记忆与连接组成的网络</p>
          </article>
        </div>
      </section>

      <a
        className="next-project headphone-next-project"
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

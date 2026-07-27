"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import type { ProjectData } from "./ProjectDetailClient";

type Navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

const marketSignals = [
  {
    value: "¥300B",
    label: "2025 中国家庭旅游市场规模",
    note: "家庭旅行已经成为高频、长期的生活型消费。",
  },
  {
    value: "35%",
    label: "暑期亲子出游占比",
    note: "家庭的共同时间集中在有限的节假日窗口。",
  },
  {
    value: "44%",
    label: "短视频与社交媒体获取信息",
    note: "旅行决策正在进入更碎片、更社交的数字场景。",
  },
  {
    value: "72.5%",
    label: "家长为孩子购买过智能产品",
    note: "儿童智能手表成为独立的家庭数字入口。",
  },
  {
    value: "64%",
    label: "中国占全球儿童智能手表市场",
    note: "硬件普及为家庭会员服务提供了基础设施。",
  },
];

const researchFindings = [
  {
    ratio: "7 / 8",
    title: "周末线下亲子活动",
    body: "周末与节假日是家庭集中相处、共同外出的主要窗口。",
  },
  {
    ratio: "7 / 8",
    title: "短途周末出行",
    body: "家庭需要低门槛、可快速决定的活动，而不是复杂的旅行规划。",
  },
  {
    ratio: "6 / 8",
    title: "重视便利与性价比",
    body: "便利、清晰和即时回报，比炫耀型或高门槛体验更重要。",
  },
  {
    ratio: "4 / 8",
    title: "情感细节形成长期忠诚",
    body: "真正被记住的不是一次折扣，而是照顾家庭关系的服务细节。",
  },
];

const competitors = [
  {
    name: "QATAR",
    strength: "高价值体验与体育 IP",
    gap: "与中国家庭的日常数字场景连接有限",
  },
  {
    name: "SINGAPORE",
    strength: "Kris+ 生活方式钱包与东南亚商户网络",
    gap: "儿童与家庭共同成长机制仍有空间",
  },
  {
    name: "EMIRATES",
    strength: "完整家庭账户与儿童里程机制",
    gap: "服务重心仍集中在旅行前后",
  },
  {
    name: "CATHAY",
    strength: "行为奖励、生活方式平台与大湾区基础",
    gap: "缺少真正的家庭账户与本地家庭生态",
  },
];

const rhythms = {
  weekday: {
    number: "01",
    tab: "工作日",
    english: "TASK & REWARD",
    title: "把催促，变成彼此鼓励。",
    body:
      "家庭成员可以发布或领取仅对家庭可见的任务。完成记录经发布者确认或到时自动完成后，约定里程进入个人钱包，平台还可追加激励与赠送。",
    accent: "mint",
    steps: ["发布任务", "领取并完成", "上传与确认", "获得并赠送里程"],
    outcome: "日常互动成为可积累的家庭旅行资产。",
    image: "/cathay/weekday-flow.png",
    imageAlt: "国泰小星光工作日任务与奖励流程",
  },
  weekend: {
    number: "02",
    tab: "周末",
    english: "SPEND & EARN",
    title: "把周末选择，变成家庭共同决定。",
    body:
      "系统根据家庭过去的活动与平台使用记录，每周五更新定制活动清单。家庭可一键报名或领券，在线下完成体验后获得大额里程并汇入家庭共享池。",
    accent: "rose",
    steps: ["周五定制清单", "报名或领券", "线下家庭体验", "里程进入共享池"],
    outcome: "家庭、合作商户与国泰形成持续的三方价值循环。",
    image: "/cathay/weekend-experience.png",
    imageAlt: "国泰小星光周末家庭活动与里程体验",
  },
  holiday: {
    number: "03",
    tab: "假期",
    english: "ENGAGE & CELEBRATE",
    title: "把一次旅行，变成家庭里程碑。",
    body:
      "当家庭共享里程与活动次数达到门槛，官方家庭旅行会触发定制礼盒、祝福卡与线上线下活动，让长期互动在旅行时获得可见的仪式与回报。",
    accent: "apricot",
    steps: ["共同积累", "达到家庭门槛", "定制礼盒与祝福", "庆祝共同里程碑"],
    outcome: "会员权益从一次兑换，延伸为可被记住的家庭经历。",
    image: "/cathay/holiday-experience.png",
    imageAlt: "国泰小星光假期礼盒与家庭奖励体验",
  },
} as const;

type RhythmKey = keyof typeof rhythms;

const validationSignals = [
  ["87.5%", "对儿童通过手表积累旅行里程高度感兴趣"],
  ["63%", "担心儿童屏幕时间，需要家长控制"],
  ["75%", "将家庭积分共享列为最期待功能"],
  ["50%", "首次阅读时需要再次解释双路径机制"],
];

const businessCells = [
  {
    eyebrow: "VALUE CREATION",
    title: "家庭互动成为共同资产",
    body: "把任务、周末活动与假期庆祝连接成家庭的长期互动节奏。",
  },
  {
    eyebrow: "VALUE DELIVERY",
    title: "双账户与三种生活节奏",
    body: "家庭共享池负责连接，个人钱包保留每位成员的自主与成长。",
  },
  {
    eyebrow: "VALUE CAPTURE",
    title: "商户、家庭与国泰共赢",
    body: "通过活动导流、里程激励和平台合作，把家庭消费带入国泰生态。",
  },
  {
    eyebrow: "REVENUE 01",
    title: "商户费用与收入分成",
    body: "家庭友好型商户通过平台获得精准客群与周末活动流量。",
  },
  {
    eyebrow: "REVENUE 02",
    title: "里程兑换带动航空消费",
    body: "兑换过程可进一步带来票价差、升舱与附加服务消费。",
  },
  {
    eyebrow: "FEASIBILITY",
    title: "复用现有数字资产",
    body: "依托国泰 App、既有积分 IT 与成熟儿童手表接口，降低初期建设门槛。",
  },
];

const roadmap = [
  {
    number: "01",
    phase: "TRUST BUILDING",
    title: "让家庭先一起玩起来",
    accent: "mint",
    items: [
      "上线核心家庭账户、任务与奖励机制",
      "从现有会员中招募种子家庭",
      "与 2–3 个大湾区合作伙伴进行周末试点",
    ],
  },
  {
    number: "02",
    phase: "ECOSYSTEM GROWTH",
    title: "把互动连接成城市网络",
    accent: "rose",
    items: [
      "在一线城市拓展超过 50 个家庭友好场所",
      "推出首批家庭套票、假期线路与礼盒",
      "建立城市家庭俱乐部与月度线下活动",
    ],
  },
  {
    number: "03",
    phase: "LEGACY",
    title: "让会员关系陪伴家庭成长",
    accent: "coral",
    items: [
      "推出家庭联名卡与成长记录数字资产",
      "儿童成年后自然衔接个人会员体系",
      "向 B2B 与东南亚华人家庭市场延伸",
    ],
  },
];

export default function CathayCaseStudy({
  project,
  navigate,
}: {
  project: ProjectData;
  navigate: Navigate;
}) {
  const [activeRhythm, setActiveRhythm] = useState<RhythmKey>("weekday");
  const rhythm = rhythms[activeRhythm];

  return (
    <div className="cathay-case">
      <section className="cathay-hero" aria-labelledby="cathay-title">
        <div className="cathay-hero-orbit orbit-one" aria-hidden="true" />
        <div className="cathay-hero-orbit orbit-two" aria-hidden="true" />
        <div className="cathay-flight-path" aria-hidden="true">
          <i />
          <span>✦</span>
        </div>
        <div className="cathay-hero-meta">
          <span>PROJECT 02 / COMMERCIAL PROPOSAL</span>
          <span>FAMILY MEMBERSHIP ECOSYSTEM</span>
        </div>
        <div className="cathay-hero-title-wrap">
          <p className="cathay-kicker">CATHAY LITTLE STARLIGHT / 国泰小星光</p>
          <h1 id="cathay-title">
            <span>INTERACT.</span>
            <span>BOND.</span>
            <span>GO FURTHER.</span>
          </h1>
          <p className="cathay-hero-lead">
            一个把家庭日常互动转化为共同旅行资产的会员生态系统。
          </p>
        </div>
        <div className="cathay-hero-footer">
          <span>THE MORE YOU INTERACT, THE DEEPER THE BOND.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="cathay-context cathay-pad" id="cathay-context">
        <header className="cathay-section-heading reveal">
          <p>01 / FAMILY PERSONA · 家庭画像</p>
          <h2>
            温暖、忙碌，
            <br />
            但很少被表达。
          </h2>
        </header>
        <div className="cathay-persona-grid">
          <figure className="cathay-persona-photo reveal">
            <img
              src="/cathay/family-persona.png"
              alt="一组父母与孩子组成的目标家庭画像"
            />
          </figure>
          <div className="cathay-persona-copy reveal">
            <p className="cathay-label">A FAMILY WHO LOVES TO TRAVEL</p>
            <h3>真正缺少的，不是一次新的旅行。</h3>
            <p>
              工作日里，父母与孩子分别被工作和学习占据；周末偶尔外出，却常常各自行动。
              家庭珍贵的共同记忆大多来自旅行，而两次旅程之间，日常情感很容易被忙碌冲淡。
            </p>
            <div className="cathay-role-grid">
              <article>
                <div className="cathay-role-label is-mother">
                  <i className="cathay-role-icon" aria-hidden="true" />
                  <span>母亲</span>
                </div>
                <strong>承担规划与协调</strong>
                <p>希望减少信息负担，也希望家庭成员真正参与。</p>
              </article>
              <article>
                <div className="cathay-role-label is-father">
                  <i className="cathay-role-icon" aria-hidden="true" />
                  <span>父亲</span>
                </div>
                <strong>角色常常不清晰</strong>
                <p>需要一个自然、低门槛的共同参与入口。</p>
              </article>
              <article>
                <div className="cathay-role-label is-child">
                  <i className="cathay-role-icon" aria-hidden="true" />
                  <span>孩子</span>
                </div>
                <strong>缺少自主选择</strong>
                <p>智能手表为其提供了平行、独立的数字入口。</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="cathay-market cathay-pad" id="cathay-market">
        <div className="cathay-market-intro reveal">
          <p>02 / MARKET SIGNALS · 市场信号</p>
          <h2>家庭关系的长期价值，正在数字生活中显现。</h2>
          <p>
            国泰自 2021 年起由航空公司迈向高端旅行与生活方式品牌。
            对中国内地家庭而言，购物、教育、娱乐与社交比飞行更高频，也让会员关系有机会延续十年以上。
          </p>
        </div>
        <div className="cathay-signal-grid">
          {marketSignals.map((signal, index) => (
            <article className="cathay-signal reveal" key={signal.value}>
              <span>0{index + 1}</span>
              <strong>{signal.value}</strong>
              <h3>{signal.label}</h3>
              <p>{signal.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cathay-research cathay-pad" id="cathay-research">
        <header className="cathay-section-heading is-compact reveal">
          <p>03 / RESEARCH · 研究与竞品</p>
          <h2>从 8 组家庭的日常，找到航空会员之外的入口。</h2>
        </header>
        <div className="cathay-research-evidence">
          <figure className="cathay-probes reveal">
            <img src="/cathay/research-probes.png" alt="8 组家庭生活探针与研究记录" />
            <figcaption>生活探针 · 半结构化访谈 · 一线城市中产家庭</figcaption>
          </figure>
          <div className="cathay-findings">
            {researchFindings.map((finding) => (
              <article className="cathay-finding reveal" key={finding.title}>
                <strong>{finding.ratio}</strong>
                <div>
                  <h3>{finding.title}</h3>
                  <p>{finding.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="cathay-competitor-table reveal" role="table" aria-label="航空公司家庭服务对比">
          <div className="cathay-competitor-row is-head" role="row">
            <span role="columnheader">AIRLINE</span>
            <span role="columnheader">STRENGTH</span>
            <span role="columnheader">UNMET SPACE</span>
          </div>
          {competitors.map((competitor) => (
            <div className="cathay-competitor-row" role="row" key={competitor.name}>
              <strong role="cell">{competitor.name}</strong>
              <span role="cell">{competitor.strength}</span>
              <span role="cell">{competitor.gap}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cathay-opportunity" id="cathay-opportunity">
        <div className="cathay-opportunity-question reveal">
          <p>04 / OPPORTUNITY · 机会定义</p>
          <h2>
            如何把国泰会员权益，
            <br />
            延伸到中国家庭已经喜爱的日常活动中？
          </h2>
        </div>
        <div className="cathay-shift reveal">
          <div className="cathay-shift-line is-before">
            <span>现有逻辑</span>
            <strong>消费</strong>
            <i>→</i>
            <strong>积累</strong>
            <i>→</i>
            <strong>兑换</strong>
          </div>
          <div className="cathay-shift-arrow" aria-hidden="true">↓</div>
          <div className="cathay-shift-line is-after">
            <span>机会转向</span>
            <strong>互动</strong>
            <i>→</i>
            <strong>积累</strong>
            <i>→</i>
            <strong>连接</strong>
          </div>
        </div>
        <div className="cathay-opportunity-principles">
          {[
            ["GAMEFUL TASKS", "把催促转化为鼓励，让孩子获得自主感。"],
            ["PARALLEL ENTRY", "通过儿童智能手表进入孩子的数字世界。"],
            ["FAMILY POOL", "把家庭成员的互动与消费汇入共同资产。"],
            ["WEEKEND NETWORK", "以活动平台连接家庭、商户与国泰。"],
          ].map(([title, body], index) => (
            <article className="reveal" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cathay-validation cathay-pad" id="cathay-validation">
        <header className="cathay-section-heading reveal">
          <p>05 / CONCEPT TEST · 概念验证</p>
          <h2>
            家庭想共享里程，
            <br />
            也需要更清楚的控制权。
          </h2>
        </header>
        <div className="cathay-validation-grid">
          {validationSignals.map(([value, label]) => (
            <article className="reveal" key={value}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
        <div className="cathay-validation-note reveal">
          <p>
            低保真测试覆盖 8 个一线城市中产家庭；家长 30–45 岁、儿童 6–12 岁，
            且过去一年至少有一次国际或区域航班经历。
          </p>
          <div>
            <span>迭代 01</span>
            <strong>加入家长控制与“屏幕 → 任务”转换</strong>
          </div>
          <div>
            <span>迭代 02</span>
            <strong>简化双路径标签，把家庭账户前置</strong>
          </div>
        </div>
      </section>

      <section className="cathay-rhythms cathay-pad" id="cathay-solution">
        <header className="cathay-section-heading is-light reveal">
          <p>06 / FINAL SOLUTION · 最终方案</p>
          <h2>
            一套会员系统，
            <br />
            跟随家庭的三种生活节奏。
          </h2>
        </header>
        <div className="cathay-rhythm-tabs" role="tablist" aria-label="选择家庭生活节奏">
          {(Object.keys(rhythms) as RhythmKey[]).map((key) => (
            <button
              className={activeRhythm === key ? "is-active" : ""}
              key={key}
              onClick={() => setActiveRhythm(key)}
              role="tab"
              aria-selected={activeRhythm === key}
              aria-controls="cathay-rhythm-panel"
            >
              <span>{rhythms[key].number}</span>
              <strong>{rhythms[key].tab}</strong>
              <i>{rhythms[key].english}</i>
            </button>
          ))}
        </div>
        <div
          className={`cathay-rhythm-panel is-${rhythm.accent}`}
          id="cathay-rhythm-panel"
          role="tabpanel"
          key={activeRhythm}
        >
          <div className="cathay-rhythm-copy">
            <p>{rhythm.english}</p>
            <h3>{rhythm.title}</h3>
            <p>{rhythm.body}</p>
            <ol>
              {rhythm.steps.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <strong className="cathay-rhythm-outcome">{rhythm.outcome}</strong>
          </div>
          <figure>
            <img src={rhythm.image} alt={rhythm.imageAlt} />
          </figure>
        </div>
      </section>

      <section className="cathay-system cathay-pad" id="cathay-system">
        <header className="cathay-section-heading reveal">
          <p>07 / SYSTEM · 家庭会员系统</p>
          <h2>
            家庭共享池负责连接，
            <br />
            个人钱包保留自主。
          </h2>
        </header>
        <div className="cathay-account-diagram reveal" aria-label="家庭主账户与个人钱包结构">
          <div className="cathay-account-person is-parent">
            <span>父母</span>
            <strong>发布 / 确认 / 分配</strong>
          </div>
          <div className="cathay-account-person is-child">
            <span>孩子</span>
            <strong>领取 / 完成 / 成长</strong>
          </div>
          <div className="cathay-family-pool">
            <span>FAMILY MASTER ACCOUNT</span>
            <strong>家庭共享里程池</strong>
            <i>互动、消费与平台奖励共同汇入</i>
          </div>
          <div className="cathay-wallet is-one">
            <span>INDIVIDUAL WALLET 01</span>
            <strong>个人里程</strong>
          </div>
          <div className="cathay-wallet is-two">
            <span>INDIVIDUAL WALLET 02</span>
            <strong>成长记录</strong>
          </div>
        </div>
        <figure className="cathay-system-map reveal">
          <img
            src="/cathay/system-map.png"
            alt="连接家庭账户、国泰平台、商户与会员商店的系统地图"
          />
          <figcaption>
            <span>SYSTEM MAP / BOND, EARN & CELEBRATE</span>
            <p>
              工作日的家庭任务、周末的商户活动与假期的里程奖励，
              通过家庭账户、国泰平台与会员商店形成信息、积分、商品与资金流。
            </p>
          </figcaption>
        </figure>
      </section>

      <section className="cathay-product cathay-pad" id="cathay-product">
        <header className="cathay-section-heading is-compact reveal">
          <p>08 / PRODUCT EXPERIENCE · 产品体验</p>
          <h2>从家庭建档，到每一次共同完成。</h2>
        </header>
        <div className="cathay-product-feature">
          <div className="cathay-product-copy reveal">
            <p>PRIMARY ENTRY / CATHAY APP</p>
            <h3>同一套系统，服务家长与孩子不同的参与方式。</h3>
            <ul>
              <li>家庭主账户、成员权限与里程分配</li>
              <li>任务发布、完成确认与个人成长记录</li>
              <li>周末活动、兑换商城与家庭共享池</li>
            </ul>
          </div>
          <figure className="cathay-interface-atlas reveal">
            <img src="/cathay/interface-atlas.jpg" alt="国泰小星光高保真移动端界面总览" />
          </figure>
        </div>
        <div className="cathay-watch-feature">
          <figure className="reveal">
            <img src="/cathay/watch-ui.jpg" alt="儿童智能手表端国泰小星光界面" />
          </figure>
          <div className="reveal">
            <p>PARALLEL ENTRY / SMART WATCH</p>
            <h3>让孩子领取任务、提交记录，也拥有自己的里程感。</h3>
            <p>
              儿童手表并不是缩小版 App，而是一个受家长控制、围绕任务完成与即时激励设计的独立入口。
            </p>
          </div>
        </div>
      </section>

      <section className="cathay-business cathay-pad" id="cathay-business">
        <header className="cathay-section-heading is-light reveal">
          <p>09 / BUSINESS MODEL · 商业模式</p>
          <h2>
            把家庭情感连接，
            <br />
            转化为可持续的生态价值。
          </h2>
        </header>
        <div className="cathay-business-grid">
          {businessCells.map((cell) => (
            <article className="reveal" key={cell.eyebrow}>
              <span>{cell.eyebrow}</span>
              <h3>{cell.title}</h3>
              <p>{cell.body}</p>
            </article>
          ))}
        </div>
        <div className="cathay-ecosystem reveal">
          <span>KEY ECOSYSTEM</span>
          <div>
            <strong>国泰 App 与会员积分体系</strong>
            <strong>家庭友好型商户与场所</strong>
            <strong>儿童智能手表生态</strong>
            <strong>家庭与航空旅行服务</strong>
          </div>
        </div>
      </section>

      <section className="cathay-future cathay-pad" id="cathay-future">
        <header className="cathay-section-heading reveal">
          <p>10 / DEVELOPMENT PLAN · 发展计划</p>
          <h2>
            从一起玩，
            <br />
            到一起成长。
          </h2>
        </header>
        <div className="cathay-roadmap">
          {roadmap.map((phase) => (
            <article className={`cathay-roadmap-step is-${phase.accent} reveal`} key={phase.number}>
              <div className="cathay-roadmap-label">
                <span>{phase.number}</span>
                <strong>{phase.phase}</strong>
              </div>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="cathay-closing reveal">
          <p>THE MORE YOU INTERACT, THE DEEPER THE BOND.</p>
          <h2>
            让会员关系，
            <br />
            成为家庭共同走过的路。
          </h2>
        </div>
      </section>

      <a
        className="next-project cathay-next-project"
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

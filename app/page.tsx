"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    slug: "ai-hardware",
    number: "01",
    title: "FitAir AI 智能硬件",
    en: "FitAir",
    role: "产品定义 / 系统架构 / 原型验证",
    tone: "mint",
    image: "/fitair/hero-athlete.png",
  },
  {
    slug: "cathay-pacific",
    number: "02",
    title: "国泰航空家庭会员生态系统",
    en: "Cathay Ecosystem",
    role: "产品策略 / 解决方案 / 团队 Leader",
    tone: "rose",
    image: "/cathay/family-persona.jpg",
  },
  {
    slug: "headphone-cycle",
    number: "03",
    title: "Sound-Track 耳机循环系统",
    en: "Sound-Track",
    role: "产品策略 / 体验设计 / 团队 Leader",
    tone: "coral",
    image: "/headphone-cycle/hero-listener.webp",
  },
];

const education = [
  {
    date: "2025.09 — 2026.12",
    school: "香港理工大学",
    degree: "创新商业设计硕士 · GPA 3.75 / 4.30",
    detail: "产品设计、用户行为分析与交互框架开发",
  },
  {
    date: "2023.09 — 2025.08",
    school: "香港大学",
    degree: "风景园林硕士 · GPA 3.53 / 4.30",
    detail: "获 2025 香港景观设计师学会杰出奖",
  },
  {
    date: "2019.09 — 2023.06",
    school: "北京林业大学",
    degree: "风景园林学士 · GPA 3.87 / 4.00",
    detail: "211 / 双一流",
  },
];

const experience = [
  {
    date: "2025.12 — 2026.02",
    company: "东信时代",
    fullCompany: "东信时代（深圳市英赛人工智能科技有限公司）",
    role: "AI 产品实习生 · 深圳",
    detail: "面向海外 AI 视频生成产品，负责种子用户招募、运营 SOP、反馈体系与增长功能设计。",
    scope: "AI 视频生成产品（海外市场）｜团队由 3 名产品经理、2 名体验设计师及约 30 名研发组成，向产品经理汇报。",
    outputs: ["种子用户招募与运营 SOP", "公测反馈追踪体系与版本立项", "消息通知、表单与邀请增长机制"],
    metrics: ["113 名合格用户", "注册转化 5% → 40%", "沟通 30min → 5min", "内测评分 76.1 → 81.4"],
    highlights: [
      {
        title: "种子用户招募",
        body: "围绕海外内容营销运营者制定“品类合适、有成片产出、回复及时”的招募标准，一个月内招募 113 名合格用户，超过原定 100 人目标；通过准入筛选和私信邀约，将注册转化率由初期 5% 提升至 40%。",
      },
      {
        title: "运营 SOP",
        body: "把四周运营节奏拆分为注册引导、反馈回收、促活与访谈邀约，建立分阶段标准话术，使单个用户的日均沟通时间从约 30 分钟降至 5 分钟。",
      },
      {
        title: "反馈体系与版本立项",
        body: "搭建公测反馈追踪体系，整理 178 条结构化反馈并建立“问题—类型—归因”三级标签，识别生成时长不透明、列表缺少视频预览等全局问题，推动 v1.2.1 立项；上线后内测总分由 76.1 升至 81.4。",
      },
      {
        title: "功能与增长设计",
        body: "独立完成消息通知与表单模块方案，推进研发落地并支持 7 种产品语言；同时梳理用户邀请机制与运营侧批量生成功能，完成方案、交互和研发对接。",
      },
    ],
  },
  {
    date: "2025.09 — 2025.11",
    company: "博世集团 · 日立冷气",
    fullCompany: "博世集团－日立冷气",
    role: "产品设计实习生 · 香港",
    detail: "从用户研究到系统架构与高保真原型，参与“AI 动态温控”产品概念的 0–1 定义与验证。",
    scope: "“AI 动态温控”产品概念 0–1 定义｜交付概念架构、解决方案文档与高保真原型。",
    outputs: ["18 位 Gen Z 用户访谈", "感知—决策—执行三层系统架构", "高保真原型与订阅意愿验证"],
    metrics: ["18 位用户深访", "100 份有效问卷", "75% 愿意或可能订阅", "覆盖 3 个运动阶段"],
    highlights: [
      {
        title: "产品定义",
        body: "通过 18 位 Gen Z 用户半结构化访谈与文献调研，发现居家运动的核心问题是健身成本高、热舒适感不佳，以及温控需求会随运动类型、生理周期和身体状态变化，但空调设置仍然静态。",
      },
      {
        title: "系统架构",
        body: "主导“感知—决策—执行”三层架构：融合手表体征、环境传感和用户输入，判断运动阶段、类型与生理周期；结合运动科学知识库和偏好学习生成指令，并通过日立云 API 联动全屋设备。",
      },
      {
        title: "服务参数",
        body: "基于文献将居家运动拆分为有氧、力量与拉伸三类，覆盖热身、运动与恢复三个阶段，并独立整理环境与身体指标参数表，为原型和控制逻辑提供依据。",
      },
      {
        title: "概念验证",
        body: "协同设计与研发团队完成可行性评估，并回收 100 份有效定量问卷；75% 的受访者表示愿意或可能愿意为该服务订阅付费。",
      },
    ],
  },
  {
    date: "2025.06 — 2025.09",
    company: "上海响铃铛科技",
    fullCompany: "上海响铃铛科技有限公司",
    role: "产品实习生 · 上海",
    detail: "为无障碍社交餐饮产品搭建设计系统与核心模块，推动关键任务完成率由 68% 提升至 89%。",
    scope: "面向美国市场的社交餐饮产品，处于 0–1 阶段｜团队由 1 名产品、5 名研发与本人组成。",
    outputs: ["公司级组件库与无障碍规范", "四个核心产品模块", "两轮关键任务可用性测试"],
    metrics: ["4 个核心模块", "2 轮可用性测试", "完成率 68% → 89%", "统一多州无障碍标准"],
    highlights: [
      {
        title: "设计系统从零搭建",
        body: "独立完成组件库，依据品牌规范搭建第一版设计系统；针对美国各州在字号、对比度等 Accessibility 标准上的差异，按最高标准统一组件规则。",
      },
      {
        title: "核心模块设计",
        body: "独立负责登录注册、好友聊天、活动创建与餐厅推荐四个模块，交付低／高保真原型及交互文档，形成“发现—讨论—决策—社交餐饮”的闭环。",
      },
      {
        title: "可用性迭代",
        body: "围绕“注册→创建活动→邀请好友→完成发布”开展两轮测试，任务完成率从 68%（17/25）提升至 89%（25/28）。",
      },
      {
        title: "关键改动",
        body: "将活动创建按钮从发现页文章区移至首页右上方，并命名为 “Launch Event”；同时将三步创建表单整合为单页，降低操作中断。",
      },
    ],
  },
];

const navItems = [
  { id: "about", number: "01", label: "关于我", en: "ABOUT" },
  { id: "experience", number: "02", label: "工作经历", en: "EXPERIENCE" },
  { id: "projects", number: "03", label: "个人项目", en: "PROJECTS" },
  { id: "contact", number: "04", label: "联系我", en: "CONTACT" },
];

export default function Home() {
  const [active, setActive] = useState("about");
  const [leaving, setLeaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const activeExperience =
    selectedExperience === null ? null : experience[selectedExperience];

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains("contact-outro")) {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
            return;
          }

          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    let sectionFrame = 0;
    const updateActiveSection = () => {
      if (sectionFrame) return;
      sectionFrame = window.requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.38;
        const current = navItems.find(({ id }) => {
          const section = document.getElementById(id);
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= readingLine && rect.bottom > readingLine;
        });

        if (current) setActive(current.id);
        sectionFrame = 0;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const onMove = (event: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      const target = event.target as HTMLElement;
      const project = target.closest("[data-project-card]");
      const interactive = target.closest("a, button");
      cursor.textContent = project ? "OPEN" : interactive ? "↗" : "";
      cursor.classList.toggle("is-project", Boolean(project));
      cursor.classList.toggle("is-active", Boolean(project || interactive));
    };
    const onLeave = () => cursor?.classList.remove("is-active", "is-project");

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      revealObserver.disconnect();
      window.cancelAnimationFrame(sectionFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (selectedExperience === null) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedExperience(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedExperience]);

  const openProject = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLeaving(true);
    window.setTimeout(() => {
      window.location.href = `/project/${slug}`;
    }, 480);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("liziyuan_719@163.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className={`site-shell ${leaving ? "is-leaving" : ""}`}>
      <div className="intro-wipe" aria-hidden="true">
        <span>PORTFOLIO / 2026</span>
      </div>
      <div className="page-transition" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true" />

      <aside className="side-tag" aria-hidden="true">
        <strong>W.</strong>
        <span>Portfolio</span>
      </aside>

      <nav className="rail-nav" aria-label="页面导航">
        {navItems.map((item) => (
          <a
            className={`rail rail-${item.id} ${active === item.id ? "is-active" : ""}`}
            href={`#${item.id}`}
            key={item.id}
            aria-current={active === item.id ? "location" : undefined}
          >
            <span className="rail-en">
              ({item.number}) {item.en}
            </span>
            <span className="rail-cn">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="page-content">
        <header className="hero">
          <div className="hero-kicker">
            <span>Product design portfolio</span>
            <span>Shenzhen · 2026</span>
          </div>
          <div className="hero-band" aria-label="个人作品集">
            <div className="hero-track">
              <span>PORTFOLIO FOR THE CURIOUS. </span>
              <span aria-hidden="true">PORTFOLIO FOR THE CURIOUS. </span>
            </div>
          </div>
          <div className="hero-foot">
            <p>(ideas made visible)</p>
            <a href="#about" aria-label="向下浏览">
              <span>SCROLL TO EXPLORE</span>
              <span className="down-arrow">↓</span>
            </a>
          </div>
        </header>

        <section className="section about-section" id="about">
          <div className="section-index reveal">
            <span>(01)</span>
            <span>ABOUT / 关于我</span>
          </div>
          <div className="about-grid">
            <div className="about-copy reveal">
              <p className="eyebrow">A little context</p>
              <h1>
                你好，我是
                <br />
                <em>李子园</em>。
              </h1>
              <p className="lead">
                我是一名产品设计与产品解决方案方向的设计者，拥有创新商业设计与风景园林的跨学科背景，专注用户研究、产品策略、交互框架与系统化方案设计。
              </p>
              <div className="micro-list">
                <span>产品策略</span>
                <span>用户研究</span>
                <span>交互设计</span>
              </div>
            </div>
            <figure className="portrait-frame reveal">
              <img
                src="/profile.jpg"
                alt="李子园的个人肖像"
                width="1200"
                height="1800"
              />
              <figcaption>
                <span>PORTRAIT / LI ZIYUAN</span>
                <span>PRODUCT DESIGN</span>
              </figcaption>
            </figure>
            <div className="about-note reveal">
              <span className="note-mark">✳</span>
              <p>
                “从真实行为中发现问题，用研究、原型与验证把复杂系统转化为可落地的产品体验。”
              </p>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-index reveal">
            <span>(02)</span>
            <span>EXPERIENCE / 工作经历</span>
          </div>
          <div className="experience-intro reveal">
            <figure className="academic-portrait">
              <img
                src="/academic-portrait.jpg"
                alt="身穿学术服的个人肖像"
                width="1024"
                height="1536"
              />
              <figcaption>
                <span>ACADEMIC PORTRAIT / 2026</span>
                <span>HONG KONG</span>
              </figcaption>
            </figure>
            <div>
              <p>Selected experience</p>
              <h2>经历不是列表，<br />是持续累积的方法。</h2>
            </div>
          </div>
          <div className="experience-split">
            <aside className="academic-block reveal">
              <div className="experience-block-title">
                <span>ACADEMIC</span>
                <strong>学术经历</strong>
              </div>
              <div className="academic-list">
                {education.map((item) => (
                  <article className="academic-entry" key={item.school}>
                    <span>{item.date}</span>
                    <div>
                      <h3>{item.school}</h3>
                      <p>{item.degree}</p>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </aside>
            <div className="work-block">
              <div className="experience-block-title reveal">
                <span>PROFESSIONAL</span>
                <strong>工作经历</strong>
              </div>
              <div className="experience-list">
                {experience.map((item, index) => (
                  <button
                    aria-controls="experience-detail-dialog"
                    aria-haspopup="dialog"
                    className="experience-row reveal"
                    key={item.company}
                    onClick={() => setSelectedExperience(index)}
                    type="button"
                  >
                    <span className="row-no">0{index + 1}</span>
                    <span className="row-date">{item.date}</span>
                    <span className="row-company">
                      <strong>{item.company}</strong>
                      <span>{item.role}</span>
                    </span>
                    <span className="row-description">{item.detail}</span>
                    <span className="row-plus" aria-hidden="true">＋</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-index reveal">
            <span>(03)</span>
            <span>PROJECTS / 个人项目</span>
          </div>
          <div className="projects-heading reveal">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>三个项目，<br />三种观察世界的方式。</h2>
            </div>
            <p>
              三项实践覆盖 AI 智能硬件、家庭会员生态与校园循环服务，从用户研究到系统架构、原型验证与体验落地。
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <a
                className={`project-card project-${index + 1} reveal`}
                data-project-card
                href={`/project/${project.slug}`}
                key={project.slug}
                onClick={(event) => openProject(event, project.slug)}
              >
                <div className={`project-visual tone-${project.tone}`}>
                  <img
                    aria-hidden="true"
                    className="project-visual-image"
                    src={project.image}
                    alt=""
                  />
                  <span className="visual-index">{project.number}</span>
                  <span className="visual-word">{project.en}</span>
                  <div className="visual-shape" />
                </div>
                <div className="project-meta">
                  <div>
                    <p>{project.role}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <span>{project.number} / 03</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-index reveal">
            <span>(04)</span>
            <span>CONTACT / 联系我</span>
          </div>
          <div className="contact-stage">
            <div className="contact-copy-column reveal">
              <div className="contact-headline">
                <p>Start a conversation</p>
                <h2>
                  一起做些
                  <br />
                  <em>值得停留</em>
                  <br />
                  的事情。
                </h2>
              </div>
              <div className="contact-methods">
                <div className="contact-method">
                    <span className="contact-icon" aria-hidden="true">↗</span>
                  <div>
                    <span>PHONE / 电话</span>
                    <strong>+86 189 9268 3303</strong>
                  </div>
                </div>
                <button className="contact-method" type="button" onClick={copyEmail}>
                  <span className="contact-icon" aria-hidden="true">@</span>
                  <div>
                    <span>EMAIL / 邮箱</span>
                    <strong>{copied ? "已复制到剪贴板" : "liziyuan_719@163.com"}</strong>
                  </div>
                </button>
                <div className="contact-method">
                  <span className="contact-icon" aria-hidden="true">○</span>
                  <div>
                    <span>BASE / 所在地</span>
                    <strong>深圳 · 可接受上海 / 北京</strong>
                  </div>
                </div>
              </div>
              <p className="contact-invitation">
                如果你正在寻找产品实习生或产品解决方案实习生，欢迎联系我交流 AI 产品、智能健康家居与体验设计相关机会。
              </p>
            </div>

            <form
              className="contact-form reveal"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                window.setTimeout(() => setSent(false), 2200);
              }}
            >
              <div className="form-intro">
                <span>PROJECT ENQUIRY / 项目沟通</span>
                <p>以下为演示表单，不会实际发送信息。</p>
              </div>
              <label className="form-field">
                <span>你的名字 *</span>
                <input name="name" placeholder="请填写名字" required />
              </label>
              <label className="form-field">
                <span>邮箱 *</span>
                <input name="email" type="email" placeholder="name@example.com" required />
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span>联系电话</span>
                  <input name="phone" placeholder="+86" />
                </label>
                <label className="form-field">
                  <span>所在组织</span>
                  <input name="company" placeholder="公司 / 团队名称" />
                </label>
              </div>
              <label className="form-field form-message">
                <span>想和我聊什么？</span>
                <textarea name="message" placeholder="简单描述项目、合作或想法……" rows={5} />
              </label>
              <label className="form-field form-select">
                <span>你从哪里了解到我？</span>
                <select name="source" defaultValue="">
                  <option value="" disabled>请选择一个选项</option>
                  <option value="portfolio">个人作品集</option>
                  <option value="friend">朋友推荐</option>
                  <option value="social">社交平台</option>
                  <option value="other">其他</option>
                </select>
              </label>
              <div className="form-submit-row">
                <p>提交仅用于展示交互反馈，后续可接入真实邮箱或表单服务。</p>
                <button type="submit">
                  <span>{sent ? "已记录（演示）" : "发送信息"}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>

            <div className="contact-outro reveal">
              <div className="contact-outro-main">
                <div className="hey-stack" aria-label="Hey">
                  <span aria-hidden="true">Hey</span>
                  <strong>Hey</strong>
                </div>
                <a className="lets-chat" href="mailto:liziyuan_719@163.com">
                  <span>let&apos;s chat</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <div className="social-links" aria-label="快速联系方式">
                  <a href="mailto:liziyuan_719@163.com">Email</a>
                  <a href="tel:+8618992683303">Phone</a>
                  <a href="#about">Shenzhen</a>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer-line reveal">
            <span>© 2026 LI ZIYUAN</span>
            <span>Product Strategy / Experience Design</span>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              BACK TO TOP ↑
            </a>
          </footer>
        </section>
      </div>

      {activeExperience ? (
        <div
          className="experience-modal"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedExperience(null);
          }}
          role="presentation"
        >
          <article
            aria-labelledby="experience-detail-title"
            aria-modal="true"
            className="experience-dialog"
            id="experience-detail-dialog"
            role="dialog"
          >
            <div className="experience-dialog-bar">
              <span>EXPERIENCE DETAIL / 0{selectedExperience! + 1}</span>
              <button
                aria-label="关闭经历详情"
                autoFocus
                onClick={() => setSelectedExperience(null)}
                type="button"
              >
                <span>CLOSE</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <header className="experience-dialog-header">
              <div>
                <span>{activeExperience.date}</span>
                <h2 id="experience-detail-title">{activeExperience.fullCompany}</h2>
                <p>{activeExperience.role}</p>
              </div>
              <p>{activeExperience.detail}</p>
            </header>

            <div className="experience-dialog-brief">
              <section>
                <span>PROJECT SCOPE / 工作范围</span>
                <p>{activeExperience.scope}</p>
              </section>
              <section>
                <span>KEY OUTPUTS / 关键交付</span>
                <ul>
                  {activeExperience.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="experience-dialog-highlights">
              <header>
                <span>RESPONSIBILITIES &amp; IMPACT</span>
                <strong>工作内容与成果</strong>
              </header>
              <div>
                {activeExperience.highlights.map((highlight, index) => (
                  <article key={highlight.title}>
                    <span>0{index + 1}</span>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <footer className="experience-dialog-metrics" aria-label="关键成果">
              {activeExperience.metrics.map((metric, index) => (
                <div key={metric}>
                  <span>0{index + 1}</span>
                  <strong>{metric}</strong>
                </div>
              ))}
            </footer>
          </article>
        </div>
      ) : null}
    </main>
  );
}

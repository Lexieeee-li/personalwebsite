"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    slug: "ai-hardware",
    number: "01",
    title: "AI 智能硬件",
    en: "AI Hardware",
    role: "策略 / 产品 / 体验",
    tone: "mint",
  },
  {
    slug: "cathay-pacific",
    number: "02",
    title: "国泰商业方案",
    en: "Commercial Proposal",
    role: "洞察 / 商业 / 服务",
    tone: "rose",
  },
  {
    slug: "headphone-cycle",
    number: "03",
    title: "耳机的循环",
    en: "The Headphone Loop",
    role: "研究 / 叙事 / 系统",
    tone: "coral",
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

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -45% 0px", threshold: [0.05, 0.25, 0.55] },
    );

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

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
      sectionObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const openProject = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLeaving(true);
    window.setTimeout(() => {
      window.location.href = `/project/${slug}`;
    }, 480);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("hello@yourname.com");
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
            <span>Creative portfolio</span>
            <span>Shanghai · 2026</span>
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
                <em>你的名字</em>。
              </h1>
              <p className="lead">
                这里放一段简短的自我介绍：你的专业方向、关注议题，以及你希望通过设计解决的问题。
              </p>
              <div className="micro-list">
                <span>策略思考</span>
                <span>体验设计</span>
                <span>品牌叙事</span>
              </div>
            </div>
            <figure className="portrait-frame reveal">
              <img
                src="/profile.jpg"
                alt="个人照片占位，可替换"
                width="1200"
                height="1800"
              />
              <figcaption>
                <span>PORTRAIT / 2026</span>
                <span>可替换图片</span>
              </figcaption>
            </figure>
            <div className="about-note reveal">
              <span className="note-mark">✳</span>
              <p>
                “在这里放一句能代表你工作方式或价值观的话。”
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
            <p>Selected experience</p>
            <h2>经历不是列表，<br />是持续累积的方法。</h2>
          </div>
          <div className="experience-list">
            {[
              ["2025 — NOW", "公司 / 团队名称", "职位名称", "一句话说明你的职责与贡献范围。"],
              ["2023 — 2025", "公司 / 团队名称", "职位名称", "一句话说明你的职责与贡献范围。"],
              ["2021 — 2023", "学校 / 组织名称", "角色名称", "一句话说明这段经历带来的方法或能力。"],
            ].map((item, index) => (
              <article className="experience-row reveal" key={item[0]}>
                <span className="row-no">0{index + 1}</span>
                <span className="row-date">{item[0]}</span>
                <div>
                  <h3>{item[1]}</h3>
                  <p>{item[2]}</p>
                </div>
                <p className="row-description">{item[3]}</p>
                <span className="row-plus" aria-hidden="true">＋</span>
              </article>
            ))}
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
              以下内容使用通用项目文案与视觉占位。点击任一项目进入详情页，后续可替换为你的完整材料。
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
          <div className="contact-main reveal">
            <p>Have an idea?</p>
            <h2>让我们从一句<br />“你好”开始。</h2>
            <button className="email-button" type="button" onClick={copyEmail}>
              <span>{copied ? "已复制到剪贴板" : "hello@yourname.com"}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <footer className="footer-line reveal">
            <span>© 2026 YOUR NAME</span>
            <span>可替换的社交链接 / 城市 / 时区</span>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              BACK TO TOP ↑
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}

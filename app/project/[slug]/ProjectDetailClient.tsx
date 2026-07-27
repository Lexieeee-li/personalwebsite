"use client";

import { useEffect, useState } from "react";
import AiHardwareCaseStudy from "./AiHardwareCaseStudy";
import CathayCaseStudy from "./CathayCaseStudy";
import HeadphoneCycleCaseStudy from "./HeadphoneCycleCaseStudy";

function publicPath(href: string) {
  if (
    window.location.hostname.endsWith(".github.io") &&
    window.location.pathname.startsWith("/personalwebsite") &&
    href.startsWith("/")
  ) {
    return `/personalwebsite${href}`;
  }

  return href;
}

export type ProjectData = {
  slug: string;
  number: string;
  title: string;
  en: string;
  tone: string;
  tags: string;
  statement: string;
  nextSlug: string;
  nextTitle: string;
};

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-chart-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll(".headphone-unused")
      .forEach((el) => chartObserver.observe(el));

    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const onMove = (event: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      const target = event.target as HTMLElement;
      const interactive = target.closest("a");
      cursor.textContent = interactive ? "↗" : "";
      cursor.classList.toggle("is-active", Boolean(interactive));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      observer.disconnect();
      chartObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLeaving(true);
    window.setTimeout(() => {
      window.location.href = publicPath(href);
    }, 420);
  };

  return (
    <main className={`detail-page ${leaving ? "is-leaving" : ""}`}>
      <div className="intro-wipe" aria-hidden="true">
        <span>PROJECT / {project.number}</span>
      </div>
      <div className="custom-cursor" aria-hidden="true" />

      <nav className="rail-nav" aria-label="返回首页区块">
        {[
          ["about", "01", "ABOUT"],
          ["experience", "02", "EXPERIENCE"],
          ["projects", "03", "PROJECTS"],
          ["contact", "04", "CONTACT"],
        ].map(([id, number, label]) => (
          <a
            className={`rail rail-${id} ${id === "projects" ? "is-active" : ""}`}
            href={`/#${id}`}
            key={id}
            onClick={(event) => navigate(event, `/#${id}`)}
          >
            <span className="rail-en">({number}) {label}</span>
            <span className="rail-cn">返回首页</span>
          </a>
        ))}
      </nav>

      <header className="detail-topbar">
        <a className="detail-back" href="/#projects" onClick={(event) => navigate(event, "/#projects")}>
          <span>←</span> 返回项目列表
        </a>
        <span>SELECTED WORK / {project.slug === "ai-hardware" ? "2025" : "2026"}</span>
      </header>

      {project.slug === "ai-hardware" ? (
        <AiHardwareCaseStudy project={project} navigate={navigate} />
      ) : project.slug === "cathay-pacific" ? (
        <CathayCaseStudy project={project} navigate={navigate} />
      ) : project.slug === "headphone-cycle" ? (
        <HeadphoneCycleCaseStudy project={project} navigate={navigate} />
      ) : (
        <>
      <section className={`detail-hero ${project.tone}`}>
        <div className="detail-kicker">
          <span>PROJECT ({project.number})</span>
          <span>{project.tags}</span>
        </div>
        <h1 className="detail-title">{project.title}</h1>
        <div className="detail-subtitle">
          <span>{project.en}</span>
          <span>{project.statement}</span>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-section-header reveal">
          <span>(01) 项目概览</span>
          <h2>在这里讲清楚问题，<br />以及你如何重新定义它。</h2>
        </div>
        <div className="detail-brief-grid reveal">
          <div className="brief-item">
            <span>背景 / CONTEXT</span>
            <p>用 2–3 句话补充项目背景、面向的人群与当时的限制条件。</p>
          </div>
          <div className="brief-item">
            <span>角色 / ROLE</span>
            <p>补充你的具体角色、负责范围，以及与谁一起完成。</p>
          </div>
          <div className="brief-item">
            <span>结果 / OUTCOME</span>
            <p>补充可以量化的结果、交付物，或项目带来的关键变化。</p>
          </div>
        </div>
      </section>

      <section className="detail-gallery" aria-label="项目图片占位">
        <div className="gallery-placeholder reveal">
          <span>01 / 主视觉或方案图占位</span>
        </div>
        <div className="gallery-placeholder small reveal">
          <span>02 / 过程或细节图占位</span>
        </div>
      </section>

      <section className="detail-section process-section">
        <div className="detail-section-header reveal">
          <span>(02) 过程方法</span>
          <h2>从模糊的问题，<br />走向清晰的判断。</h2>
        </div>
        <div className="process-list">
          {[
            ["01", "发现 / Discover", "放置研究方法、关键访谈或资料分析的摘要。"],
            ["02", "定义 / Define", "放置洞察聚类、问题定义或策略原则的摘要。"],
            ["03", "设计 / Design", "放置方案迭代、原型测试或视觉系统的摘要。"],
            ["04", "交付 / Deliver", "放置最终成果、验证结果与后续计划的摘要。"],
          ].map((item) => (
            <div className="process-row reveal" key={item[0]}>
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <a
        className="next-project"
        href={`/project/${project.nextSlug}`}
        onClick={(event) => navigate(event, `/project/${project.nextSlug}`)}
      >
        <div>
          <p>NEXT PROJECT →</p>
          <h2>{project.nextTitle}</h2>
        </div>
        <span aria-hidden="true">↗</span>
      </a>
        </>
      )}
    </main>
  );
}

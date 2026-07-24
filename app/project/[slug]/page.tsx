import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient, { type ProjectData } from "./ProjectDetailClient";

const projects: Record<string, ProjectData> = {
  "ai-hardware": {
    slug: "ai-hardware",
    number: "01",
    title: "AI 智能硬件",
    en: "AI Hardware",
    tone: "tone-mint",
    tags: "策略 / 产品 / 体验",
    statement: "一个关于智能技术如何进入日常生活的项目骨架。",
    nextSlug: "cathay-pacific",
    nextTitle: "国泰商业方案",
  },
  "cathay-pacific": {
    slug: "cathay-pacific",
    number: "02",
    title: "国泰商业方案",
    en: "Commercial Proposal",
    tone: "tone-rose",
    tags: "洞察 / 商业 / 服务",
    statement: "一个将用户洞察转化为商业体验机会的项目骨架。",
    nextSlug: "headphone-cycle",
    nextTitle: "耳机的循环",
  },
  "headphone-cycle": {
    slug: "headphone-cycle",
    number: "03",
    title: "耳机的循环",
    en: "The Headphone Loop",
    tone: "tone-coral",
    tags: "研究 / 叙事 / 系统",
    statement: "一个从物品生命周期出发观察消费与循环的项目骨架。",
    nextSlug: "ai-hardware",
    nextTitle: "AI 智能硬件",
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.statement,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}

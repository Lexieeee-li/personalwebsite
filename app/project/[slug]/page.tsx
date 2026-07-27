import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient, { type ProjectData } from "./ProjectDetailClient";

const projects: Record<string, ProjectData> = {
  "ai-hardware": {
    slug: "ai-hardware",
    number: "01",
    title: "Hitachi FitAir",
    en: "The Air That Trains With You",
    tone: "tone-mint",
    tags: "策略 / 产品 / 体验",
    statement: "面向 Z 世代居家运动者的 AI 驱动智能环境生态系统。",
    nextSlug: "cathay-pacific",
    nextTitle: "国泰商业方案",
  },
  "cathay-pacific": {
    slug: "cathay-pacific",
    number: "02",
    title: "国泰小星光",
    en: "Cathay Little Starlight",
    tone: "tone-rose",
    tags: "洞察 / 商业 / 服务",
    statement: "一个把家庭日常互动转化为共同旅行资产的会员生态系统。",
    nextSlug: "headphone-cycle",
    nextTitle: "耳机的循环",
  },
  "headphone-cycle": {
    slug: "headphone-cycle",
    number: "03",
    title: "Sound-Track Museum & Lab",
    en: "Campus Headphone Circulation System",
    tone: "tone-coral",
    tags: "研究 / 叙事 / 系统",
    statement: "以声音故事、可视化清洁与数字身份驱动的校园耳机循环系统。",
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

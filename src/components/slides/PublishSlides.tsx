import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { ChromeFrame } from "@/components/brand/ChromeFrame";
import { SlideShell } from "./SlideShell";

const PUBLISHED_URL_KEY = "chora_published_url";

function getPublishedUrl() {
  return typeof window !== "undefined" ? localStorage.getItem(PUBLISHED_URL_KEY) || "https://exemplo.lovable.app" : "";
}

export function PublishUrl() {
  const [url] = useState(getPublishedUrl);
  return (
    <SlideShell>
      <div className="space-y-8">
        <p className="eyebrow">no ar.</p>
        <ChromeFrame url={url} className="w-[min(80vw,900px)]">
          <div className="flex items-center justify-center bg-bege p-16">
            <p className="overflow-hidden whitespace-nowrap font-display text-4xl md:text-6xl text-preto animate-typewriter border-r-4 border-preto pr-2 animate-blink">{url}</p>
          </div>
        </ChromeFrame>
      </div>
    </SlideShell>
  );
}

export function PublishQr() {
  const [url] = useState(getPublishedUrl);
  return (
    <SlideShell>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]">
          <QRCodeSVG value={url} size={360} level="M" />
        </div>
        <div className="text-left">
          <p className="eyebrow mb-3">aponta o celular</p>
          <p className="font-display text-7xl leading-none">acesso<br />direto.</p>
          <p className="mt-6 font-mono text-lg opacity-60">{url}</p>
        </div>
      </div>
    </SlideShell>
  );
}

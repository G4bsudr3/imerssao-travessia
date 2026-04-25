// Preload de todos os assets visuais usados nos slides.
// Roda uma vez no boot da apresentação para garantir que, quando
// cada slide entra em tela, a imagem já está no cache do browser.

import frattzCrianca from "@/assets/frattz-crianca.jpg";
import frattzPhoto from "@/assets/frattz-jovem.jpeg";
import frattzAmbassador from "@/assets/frattz-ambassador.jpg";
import frattzSpeaker from "@/assets/frattz-speaker.jpg";
import navalPhoto from "@/assets/naval-ravikant.jpg";
import nachesLogo from "@/assets/naches-logo-new.png";
import nachesLogoOld from "@/assets/naches-logo.png";
import lovableLogo from "@/assets/lovable-logo-icon.png";
import workshopImg from "@/assets/workshop-nexti-presenting.jpeg";
import megazordMp4 from "@/assets/megazord.mp4";
import megazordWebm from "@/assets/megazord.webm";

const SLIDE_IMAGES = [
  frattzCrianca,
  frattzPhoto,
  frattzAmbassador,
  frattzSpeaker,
  navalPhoto,
  nachesLogo,
  nachesLogoOld,
  lovableLogo,
  workshopImg,
];

const SLIDE_VIDEOS = [
  { src: megazordWebm, type: "video/webm" },
  { src: megazordMp4, type: "video/mp4" },
];

let started = false;

export function preloadSlideAssets() {
  if (started || typeof window === "undefined") return;
  started = true;

  // Imagens: baixa em paralelo via cache do browser
  for (const src of SLIDE_IMAGES) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }

  // Vídeos: usa <link rel="preload" as="video"> pra puxar pro cache
  // sem precisar montar um <video> escondido.
  for (const v of SLIDE_VIDEOS) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = v.src;
    link.type = v.type;
    document.head.appendChild(link);
  }
}

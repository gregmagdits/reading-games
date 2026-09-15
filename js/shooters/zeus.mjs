import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"zeus", label:"Zeus", icon:"⚡", scene:"zeus-scene", projectile:"lightning", pivot:".zeus-pivot", aim:".zeus-arm", lengthAxis:"width", lengthOffset:2, artwork:`<div class="zeus-figure"><div class="zeus-cloud-base"></div><div class="zeus-head"><span class="zeus-eye zeus-eye-left"></span><span class="zeus-eye zeus-eye-right"></span></div><div class="zeus-body"></div><div class="zeus-arm"><div class="zeus-sleeve"></div><div class="zeus-hand"></div><div class="zeus-ready-bolt"></div></div></div><div class="zeus-pivot"></div>`, style:`[data-shooter-root="zeus"]{position:absolute;inset:0}[data-shooter-root="zeus"][hidden]{display:none}
.arena.zeus-scene {
        background:
          radial-gradient(circle at 74% 14%, rgba(255, 244, 184, 0.9) 0 38px, rgba(255, 244, 184, 0) 39px),
          radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.86) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 48% 9%, rgba(255, 255, 255, 0.76) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 64% 26%, rgba(255, 255, 255, 0.82) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #0b1838 0%, #1b3f6e 58%, #62799a 77%, #24434b 100%);
      }


      .arena.zeus-scene .scene-visual {
        opacity: 0.92;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20540%20320%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M76%20231C116%20188%20170%20176%20226%20190C271%20201%20322%20195%20371%20171C411%20151%20456%20166%20474%20206C442%20193%20417%20195%20384%20214C333%20244%20276%20251%20216%20236C166%20224%20121%20226%2076%20231Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M359%20167C374%20120%20406%2083%20460%2050C458%20103%20434%20144%20388%20179Z%22%20fill%3D%22%23e5f6ff%22%2F%3E%3Cpath%20d%3D%22M334%20178C328%20128%20348%2084%20394%2041C406%2099%20387%20146%20345%20185Z%22%20fill%3D%22%23d9f0ff%22%2F%3E%3Cpath%20d%3D%22M93%20225C64%20226%2043%20216%2031%20196C55%20194%2078%20199%20103%20213Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M456%20201C476%20185%20498%20181%20521%20190C506%20210%20485%20218%20460%20212Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M412%20176C409%20150%20420%20130%20445%20119C445%20145%20436%20164%20418%20179Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M158%20233L134%20296H166L194%20238Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M252%20245L249%20302H281L289%20243Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M340%20232L350%20296H381L374%20219Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M126%20211C126%20184%20141%20162%20171%20144%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M187%20183C196%20161%20213%20147%20239%20141%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M424%20162C446%20163%20462%20171%20474%20186%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%22448%22%20cy%3D%22150%22%20r%3D%225%22%20fill%3D%22%2317202a%22%2F%3E%3Cpath%20d%3D%22M465%20142C482%20129%20498%20130%20514%20145%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M168%20194C210%20213%20277%20213%20337%20192%22%20fill%3D%22none%22%20stroke%3D%22%23b9c7d4%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M366%20174C391%20154%20411%20134%20426%20111%22%20fill%3D%22none%22%20stroke%3D%22%23b9c7d4%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M342%20173C356%20134%20371%20104%20389%2082%22%20fill%3D%22none%22%20stroke%3D%22%23b9c7d4%22%20stroke-width%3D%225%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: calc(50% + min(220px, 22vw)) calc(100% - 92px);
        background-size: clamp(220px, 38vw, 430px) auto;
      }


      .lightning-bolt-shot {
        position: absolute;
        left: 0;
        top: 0;
        height: 42px;
        background: linear-gradient(90deg, #ffffff 0%, #ffef6e 22%, #ffd029 58%, #68e1fd 100%);
        clip-path: polygon(0 44%, 9% 12%, 16% 43%, 28% 8%, 34% 42%, 49% 4%, 55% 46%, 70% 16%, 76% 50%, 100% 39%, 79% 62%, 72% 94%, 62% 63%, 48% 98%, 42% 62%, 29% 91%, 23% 60%, 9% 84%);
        filter: drop-shadow(0 0 9px rgba(255, 239, 110, 0.92)) drop-shadow(0 0 18px rgba(104, 225, 253, 0.58));
        transform-origin: 0 50%;
        animation: lightning-bolt-flash 260ms ease-out forwards;
      }


      .lightning-bolt-shot::before {
        content: "";
        position: absolute;
        inset: 12px 8px;
        background: rgba(255, 255, 255, 0.88);
        clip-path: inherit;
      }


      .lightning-impact {
        position: absolute;
        left: 0;
        top: 0;
        width: 38px;
        height: 38px;
        background:
          radial-gradient(circle, #ffffff 0 18%, #ffef6e 19% 42%, rgba(255, 239, 110, 0) 43%);
        clip-path: polygon(50% 0, 60% 32%, 95% 18%, 70% 50%, 100% 62%, 62% 64%, 72% 100%, 50% 72%, 24% 100%, 38% 64%, 0 62%, 30% 50%, 5% 18%, 40% 32%);
        transform: translate(-50%, -50%);
        animation: lightning-impact-pop 250ms ease-out forwards;
      }


      .zeus-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(132px, 19vmin, 178px);
        height: clamp(154px, 23vmin, 204px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .zeus-cloud-base {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 122px;
        height: 42px;
        background:
          radial-gradient(circle at 18% 60%, #ffffff 0 27%, rgba(255, 255, 255, 0) 28%),
          radial-gradient(circle at 42% 42%, #ffffff 0 34%, rgba(255, 255, 255, 0) 35%),
          radial-gradient(circle at 68% 56%, #ffffff 0 28%, rgba(255, 255, 255, 0) 29%),
          radial-gradient(circle at 86% 70%, #dce7f1 0 24%, rgba(220, 231, 241, 0) 25%);
        filter: drop-shadow(0 4px 0 rgba(23, 32, 42, 0.24));
        transform: translateX(-50%);
        z-index: 1;
      }


      .zeus-head {
        position: absolute;
        left: 50%;
        bottom: 92px;
        width: clamp(50px, 7.2vmin, 66px);
        height: clamp(52px, 7.6vmin, 70px);
        border: 4px solid #17202a;
        border-radius: 46% 46% 54% 54%;
        background: var(--skin);
        transform: translateX(-50%);
        z-index: 5;
      }


      .zeus-head::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -17px;
        width: 116%;
        height: 32px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 999px 999px 20px 20px;
        background: #ffffff;
        transform: translateX(-50%);
      }


      .zeus-head::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -23px;
        width: 72%;
        height: 34px;
        border: 4px solid #17202a;
        border-top: 0;
        border-radius: 0 0 999px 999px;
        background: #ffffff;
        transform: translateX(-50%);
      }


      .zeus-eye {
        position: absolute;
        top: 42%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #17202a;
        z-index: 6;
      }


      .zeus-eye-left {
        left: 30%;
      }


      .zeus-eye-right {
        right: 30%;
      }


      .zeus-body {
        position: absolute;
        left: 50%;
        bottom: 30px;
        width: clamp(76px, 11vmin, 102px);
        height: clamp(82px, 12vmin, 112px);
        border: 4px solid #17202a;
        border-radius: 26px 26px 12px 12px;
        background:
          linear-gradient(130deg, transparent 0 42%, var(--zeus-gold) 43% 55%, transparent 56% 100%),
          linear-gradient(180deg, #ffffff, var(--zeus-robe));
        transform: translateX(-50%);
        z-index: 2;
      }


      .zeus-body::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -22px;
        width: 112%;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 10px;
        background: linear-gradient(90deg, #ffffff 0 45%, #17202a 46% 54%, #ffffff 55% 100%);
        transform: translateX(-50%);
      }


      .zeus-arm {
        position: absolute;
        left: calc(50% + 10px);
        bottom: 98px;
        width: clamp(108px, 16vmin, 148px);
        height: 30px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 12px 50%;
        z-index: 6;
      }


      .zeus-sleeve {
        position: absolute;
        left: 0;
        top: 6px;
        width: 58px;
        height: 19px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #ffffff, #dce7f1);
      }


      .zeus-hand {
        position: absolute;
        left: 48px;
        top: 3px;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 2;
      }


      .zeus-ready-bolt {
        position: absolute;
        left: 66px;
        top: -12px;
        width: 38px;
        height: 48px;
        background: linear-gradient(180deg, #ffffff, var(--zeus-gold) 45%, var(--zeus-blue));
        clip-path: polygon(52% 0, 23% 41%, 47% 41%, 30% 100%, 82% 31%, 56% 32%);
        filter: drop-shadow(0 0 8px rgba(255, 239, 110, 0.82));
        z-index: 3;
      }


      .zeus-pivot {
        position: absolute;
        left: calc(50% + 22px);
        bottom: 98px;
        width: 1px;
        height: 1px;
      }


      @keyframes lightning-bolt-flash {
        0% {
          opacity: 1;
          transform: var(--lightning-transform) scaleX(0.98) scaleY(0.92);
        }

        42% {
          opacity: 1;
          transform: var(--lightning-transform) scaleX(1.02) scaleY(1.06);
        }

        100% {
          opacity: 0;
          transform: var(--lightning-transform) scaleX(0.95) scaleY(0.86);
        }
      }


      @keyframes lightning-impact-pop {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2.15) rotate(28deg);
        }
      }
:root{--zeus-robe: #f8fafc;--zeus-gold: #f6c445;--zeus-blue: #4cc9f0; }` });

import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"firefighter", label:"Firefighter", icon:"🚒", scene:"firefighter-scene", projectile:"water", pivot:".firefighter-pivot", aim:".firefighter-arm", lengthAxis:"width", lengthOffset:12, artwork:`<div class="firefighter-figure"><div class="firefighter-helmet"></div><div class="firefighter-head"></div><div class="firefighter-body"></div><div class="firefighter-arm"><div class="firefighter-sleeve"></div><div class="firefighter-hand"></div><div class="fire-hose"></div></div></div><div class="firefighter-pivot"></div>`, style:`[data-shooter-root="firefighter"]{position:absolute;inset:0}[data-shooter-root="firefighter"][hidden]{display:none}
.arena.firefighter-scene {
        background:
          radial-gradient(circle at 15% 14%, rgba(255, 244, 184, 0.74) 0 32px, rgba(255, 244, 184, 0) 33px),
          radial-gradient(circle at 28% 17%, rgba(255, 255, 255, 0.76) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 47% 9%, rgba(255, 255, 255, 0.58) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 74% 20%, rgba(255, 255, 255, 0.7) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #101827 0%, #2d3140 54%, #5b4238 74%, #1f3d2e 100%);
      }


      .arena.firefighter-scene .scene-visual {
        opacity: 0.92;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20760%20430%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22flame%22%20x1%3D%220%22%20x2%3D%220%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff4a3%22%2F%3E%3Cstop%20offset%3D%220.42%22%20stop-color%3D%22%23ff9f1c%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d62828%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M0%20376C90%20352%20169%20352%20242%20376C332%20348%20432%20350%20520%20376C602%20354%20682%20354%20760%20376V430H0Z%22%20fill%3D%22%23233b2f%22%2F%3E%3Cpath%20d%3D%22M180%20364V186H580V364Z%22%20fill%3D%22%238b5a3c%22%2F%3E%3Cpath%20d%3D%22M151%20197L380%2080L609%20197Z%22%20fill%3D%22%235f3a28%22%2F%3E%3Cpath%20d%3D%22M218%20364V238H314V364Z%22%20fill%3D%22%233b251b%22%2F%3E%3Cpath%20d%3D%22M366%20364V246H486V364Z%22%20fill%3D%22%23c77c45%22%2F%3E%3Cpath%20d%3D%22M384%20264H468V330H384Z%22%20fill%3D%22%231f2937%22%2F%3E%3Cpath%20d%3D%22M191%20226H286M384%20226H536M188%20288H286M384%20288H536%22%20fill%3D%22none%22%20stroke%3D%22%235f3a28%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M224%20187C204%20149%20220%20113%20258%2091C255%20128%20285%20144%20292%20182Z%22%20fill%3D%22url(%23flame)%22%2F%3E%3Cpath%20d%3D%22M315%20186C286%20135%20313%2095%20358%2070C348%20122%20392%20135%20392%20186Z%22%20fill%3D%22url(%23flame)%22%2F%3E%3Cpath%20d%3D%22M450%20186C427%20143%20446%20104%20492%2084C484%20128%20526%20143%20523%20186Z%22%20fill%3D%22url(%23flame)%22%2F%3E%3Cpath%20d%3D%22M531%20210C508%20169%20523%20134%20560%20116C556%20153%20589%20171%20590%20210Z%22%20fill%3D%22url(%23flame)%22%2F%3E%3Cpath%20d%3D%22M255%2095C222%2070%20218%2040%20243%2021%22%20fill%3D%22none%22%20stroke%3D%22%235b6776%22%20opacity%3D%22.72%22%2F%3E%3Cpath%20d%3D%22M372%2072C345%2042%20352%2019%20390%2010%22%20fill%3D%22none%22%20stroke%3D%22%235b6776%22%20opacity%3D%22.72%22%2F%3E%3Cpath%20d%3D%22M502%2084C486%2054%20496%2030%20530%2020%22%20fill%3D%22none%22%20stroke%3D%22%235b6776%22%20opacity%3D%22.72%22%2F%3E%3Cpath%20d%3D%22M152%20364H608%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 28px);
        background-size: min(760px, 98vw) auto;
      }


      .water-stream-shot {
        position: absolute;
        left: 0;
        top: 0;
        height: 24px;
        border-radius: 999px;
        background:
          radial-gradient(circle at 14% 50%, rgba(255, 255, 255, 0.95) 0 6%, rgba(255, 255, 255, 0) 7%),
          repeating-radial-gradient(circle at 18% 50%, rgba(255, 255, 255, 0.82) 0 5px, rgba(255, 255, 255, 0) 6px 18px),
          linear-gradient(90deg, rgba(188, 235, 255, 0.94), var(--water-blue) 42%, rgba(88, 199, 255, 0.12));
        box-shadow: 0 0 14px rgba(88, 199, 255, 0.7), 0 0 26px rgba(188, 235, 255, 0.32);
        transform-origin: 0 50%;
        animation: water-stream-fade 320ms ease-out forwards;
      }


      .water-droplet {
        position: absolute;
        left: 0;
        top: 0;
        width: 12px;
        height: 12px;
        border-radius: 50% 50% 55% 45%;
        background: #bdefff;
        box-shadow: 0 0 10px rgba(88, 199, 255, 0.78);
        transform: translate(-50%, -50%);
        animation: water-droplet-pop 380ms ease-out forwards;
      }


      .firefighter-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(136px, 20vmin, 186px);
        height: clamp(154px, 23vmin, 204px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .firefighter-head {
        position: absolute;
        left: 50%;
        bottom: 92px;
        width: clamp(46px, 7vmin, 62px);
        height: clamp(46px, 7vmin, 62px);
        border: 4px solid #17202a;
        border-radius: 48% 48% 52% 52%;
        background: var(--skin);
        transform: translateX(-50%);
        z-index: 4;
      }


      .firefighter-head::before,
      .firefighter-head::after {
        content: "";
        position: absolute;
        top: 42%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #17202a;
      }


      .firefighter-head::before {
        left: 29%;
      }


      .firefighter-head::after {
        right: 29%;
      }


      .firefighter-helmet {
        position: absolute;
        left: 50%;
        bottom: 126px;
        width: clamp(76px, 11vmin, 104px);
        height: 28px;
        border: 4px solid #17202a;
        border-radius: 999px 999px 12px 12px;
        background: linear-gradient(180deg, #ff6b6b, var(--firefighter-coat));
        transform: translateX(-50%);
        z-index: 5;
      }


      .firefighter-helmet::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -22px;
        width: 44%;
        height: 30px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 24px 24px 8px 8px;
        background: linear-gradient(180deg, var(--firefighter-yellow), #f4a900);
        transform: translateX(-50%);
      }


      .firefighter-body {
        position: absolute;
        left: 50%;
        bottom: 28px;
        width: clamp(76px, 11vmin, 104px);
        height: clamp(82px, 12vmin, 112px);
        border: 4px solid #17202a;
        border-radius: 24px 24px 12px 12px;
        background:
          linear-gradient(90deg, transparent 0 45%, var(--firefighter-yellow) 46% 54%, transparent 55% 100%),
          linear-gradient(180deg, #ff595e, var(--firefighter-coat));
        transform: translateX(-50%);
        z-index: 2;
      }


      .firefighter-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 47%;
        width: 106%;
        height: 12px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: var(--firefighter-yellow);
        transform: translate(-50%, -50%);
      }


      .firefighter-body::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -22px;
        width: 112%;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 10px;
        background: linear-gradient(90deg, #2f3b4a 0 45%, #17202a 46% 54%, #2f3b4a 55% 100%);
        transform: translateX(-50%);
      }


      .firefighter-arm {
        position: absolute;
        left: calc(50% + 8px);
        bottom: 92px;
        width: clamp(116px, 17vmin, 158px);
        height: 30px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 12px 50%;
        z-index: 6;
      }


      .firefighter-sleeve {
        position: absolute;
        left: 0;
        top: 6px;
        width: 58px;
        height: 19px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #ff595e, var(--firefighter-coat));
      }


      .firefighter-hand {
        position: absolute;
        left: 46px;
        top: 3px;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 2;
      }


      .firefighter-pivot {
        position: absolute;
        left: calc(50% + 20px);
        bottom: 92px;
        width: 1px;
        height: 1px;
      }


      @keyframes water-stream-fade {
        0% {
          opacity: 1;
          transform: var(--water-transform) scaleX(0.96) scaleY(0.9);
        }

        58% {
          opacity: 0.95;
          transform: var(--water-transform) scaleX(1.02) scaleY(1.08);
        }

        100% {
          opacity: 0;
          transform: var(--water-transform) scaleX(0.88) scaleY(0.72);
        }
      }


      @keyframes water-droplet-pop {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) translate(var(--drop-x), var(--drop-y)) scale(0.4);
        }
      }
.fire-hose {
        position: absolute;
        left: 62px;
        top: 7px;
        width: 74px;
        height: 16px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #3d5a80, #1f3b5d);
        z-index: 3;
      }


      .fire-hose::before {
        content: "";
        position: absolute;
        right: -16px;
        top: -3px;
        width: 22px;
        height: 16px;
        border: 3px solid #17202a;
        border-radius: 8px 999px 999px 8px;
        background: linear-gradient(180deg, #dbe3ec, #65717d);
      }


      .fire-hose::after {
        content: "";
        position: absolute;
        left: -54px;
        top: 3px;
        width: 62px;
        height: 38px;
        border: 7px solid #243b55;
        border-top-color: transparent;
        border-right-color: transparent;
        border-radius: 50%;
        transform: rotate(17deg);
      }
:root{--firefighter-coat: #d62828;--firefighter-yellow: #ffd166;--water-blue: #58c7ff; }` });

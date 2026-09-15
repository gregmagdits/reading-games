import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"ninja", label:"Ninja", icon:"✦", scene:"ninja-scene", projectile:"ninja", pivot:".ninja-pivot", aim:".ninja-arm", lengthAxis:"width", lengthOffset:4, artwork:`<div class="ninja-figure"><div class="ninja-scarf"></div><div class="ninja-head"></div><div class="ninja-body"></div><div class="ninja-arm"><div class="ninja-sleeve"></div><div class="ninja-hand"></div><div class="ninja-ready-star"></div></div></div><div class="ninja-pivot"></div>`, style:`[data-shooter-root="ninja"]{position:absolute;inset:0}[data-shooter-root="ninja"][hidden]{display:none}
.arena.ninja-scene {
        background:
          radial-gradient(circle at 82% 13%, rgba(247, 244, 211, 0.9) 0 40px, rgba(247, 244, 211, 0) 41px),
          radial-gradient(circle at 22% 16%, rgba(255, 255, 255, 0.9) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 41% 9%, rgba(255, 255, 255, 0.75) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 62% 21%, rgba(255, 255, 255, 0.82) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #07111f 0%, #152033 57%, #223d43 78%, #10281f 100%);
      }


      .arena.ninja-scene .scene-visual {
        opacity: 0.9;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20240%20300%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M64%20116C73%2072%2096%2052%20120%2052C144%2052%20167%2072%20176%20116Z%22%20fill%3D%22%232f3a48%22%2F%3E%3Cpath%20d%3D%22M55%20119H185L171%20146H69Z%22%20fill%3D%22%23111827%22%2F%3E%3Cpath%20d%3D%22M82%20100C96%2088%20144%2088%20158%20100C151%20120%2089%20120%2082%20100Z%22%20fill%3D%22%23f1c27d%22%2F%3E%3Cpath%20d%3D%22M92%20111H148%22%2F%3E%3Ccircle%20cx%3D%22101%22%20cy%3D%22103%22%20r%3D%224%22%20fill%3D%22%2317202a%22%2F%3E%3Ccircle%20cx%3D%22139%22%20cy%3D%22103%22%20r%3D%224%22%20fill%3D%22%2317202a%22%2F%3E%3Cpath%20d%3D%22M83%20143H157L179%20246H61Z%22%20fill%3D%22%23263241%22%2F%3E%3Cpath%20d%3D%22M96%20147H144L134%20246H106Z%22%20fill%3D%22%23485563%22%2F%3E%3Cpath%20d%3D%22M61%20170L28%20216L50%20230L82%20184Z%22%20fill%3D%22%23263241%22%2F%3E%3Cpath%20d%3D%22M179%20170L212%20216L190%20230L158%20184Z%22%20fill%3D%22%23263241%22%2F%3E%3Cpath%20d%3D%22M72%20246H168L158%20278H82Z%22%20fill%3D%22%23111827%22%2F%3E%3Cpath%20d%3D%22M88%20246L78%20292H104L115%20246Z%22%20fill%3D%22%23202938%22%2F%3E%3Cpath%20d%3D%22M152%20246L162%20292H136L125%20246Z%22%20fill%3D%22%23202938%22%2F%3E%3Cpath%20d%3D%22M38%20251L200%2089%22%20fill%3D%22none%22%20stroke%3D%22%23d7dde7%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M187%2075L210%2052%22%20fill%3D%22none%22%20stroke%3D%22%23d6a23a%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M36%20251L52%20267%22%20fill%3D%22none%22%20stroke%3D%22%238a5a35%22%20stroke-width%3D%2211%22%2F%3E%3Cpath%20d%3D%22M88%20150H152%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M72%20176H168%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M70%20198H170%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: calc(50% + min(320px, 34vw)) calc(100% - 70px);
        background-size: clamp(132px, 18vw, 220px) auto;
      }


      .ninja-star-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 34px;
        height: 34px;
        background:
          radial-gradient(circle, #17202a 0 11%, #e5edf5 12% 22%, rgba(229, 237, 245, 0) 23%),
          linear-gradient(45deg, #d7dde7, #7b8794);
        clip-path: polygon(50% 0, 61% 32%, 95% 18%, 68% 50%, 95% 82%, 61% 68%, 50% 100%, 39% 68%, 5% 82%, 32% 50%, 5% 18%, 39% 32%);
        filter: drop-shadow(0 0 0 #17202a) drop-shadow(0 6px 9px rgba(0, 0, 0, 0.3));
        animation: ninja-star-flight 340ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .ninja-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(126px, 18vmin, 168px);
        height: clamp(142px, 21vmin, 188px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .ninja-head {
        position: absolute;
        left: 50%;
        bottom: 88px;
        width: clamp(50px, 7.4vmin, 66px);
        height: clamp(50px, 7.4vmin, 66px);
        border: 4px solid #17202a;
        border-radius: 45% 45% 52% 52%;
        background:
          linear-gradient(180deg, transparent 0 36%, #f1c27d 37% 61%, transparent 62%),
          var(--ninja-dark);
        transform: translateX(-50%);
        z-index: 4;
      }


      .ninja-head::before,
      .ninja-head::after {
        content: "";
        position: absolute;
        top: 45%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #17202a;
      }


      .ninja-head::before {
        left: 30%;
      }


      .ninja-head::after {
        right: 30%;
      }


      .ninja-scarf {
        position: absolute;
        left: calc(50% + 24px);
        bottom: 118px;
        width: 58px;
        height: 22px;
        background: linear-gradient(90deg, var(--ninja-accent), rgba(125, 211, 252, 0));
        clip-path: polygon(0 20%, 100% 0, 78% 48%, 100% 100%, 0 78%);
        transform: rotate(-14deg);
        z-index: 2;
      }


      .ninja-body {
        position: absolute;
        left: 50%;
        bottom: 28px;
        width: clamp(72px, 10vmin, 96px);
        height: clamp(78px, 11vmin, 104px);
        border: 4px solid #17202a;
        border-radius: 26px 26px 12px 12px;
        background:
          linear-gradient(90deg, transparent 0 44%, var(--ninja-accent) 45% 55%, transparent 56% 100%),
          linear-gradient(180deg, var(--ninja-mid), var(--ninja-dark));
        transform: translateX(-50%);
        z-index: 2;
      }


      .ninja-body::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -22px;
        width: 112%;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 10px;
        background: linear-gradient(90deg, var(--ninja-dark) 0 45%, #17202a 46% 54%, var(--ninja-dark) 55% 100%);
        transform: translateX(-50%);
      }


      .ninja-arm {
        position: absolute;
        left: calc(50% + 8px);
        bottom: 94px;
        width: clamp(100px, 15vmin, 138px);
        height: 28px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 12px 50%;
        z-index: 5;
      }


      .ninja-sleeve {
        position: absolute;
        left: 0;
        top: 6px;
        width: 62px;
        height: 18px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, var(--ninja-mid), var(--ninja-dark));
      }


      .ninja-hand {
        position: absolute;
        left: 54px;
        top: 4px;
        width: 22px;
        height: 22px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 2;
      }


      .ninja-ready-star {
        position: absolute;
        left: 72px;
        top: -1px;
        width: 30px;
        height: 30px;
        background:
          radial-gradient(circle, #17202a 0 12%, #e5edf5 13% 24%, rgba(229, 237, 245, 0) 25%),
          linear-gradient(45deg, #d7dde7, #7b8794);
        clip-path: polygon(50% 0, 61% 32%, 95% 18%, 68% 50%, 95% 82%, 61% 68%, 50% 100%, 39% 68%, 5% 82%, 32% 50%, 5% 18%, 39% 32%);
        filter: drop-shadow(0 0 0 #17202a);
        z-index: 3;
      }


      .ninja-pivot {
        position: absolute;
        left: calc(50% + 20px);
        bottom: 94px;
        width: 1px;
        height: 1px;
      }


      @keyframes ninja-star-flight {
        0% {
          opacity: 1;
          transform: var(--ninja-star-start-transform) rotate(0turn) scale(0.82);
        }

        100% {
          opacity: 0.96;
          transform: var(--ninja-star-end-transform) rotate(2.4turn) scale(1);
        }
      }
:root{--ninja-dark: #111827;--ninja-mid: #273243;--ninja-accent: #7dd3fc; }` });

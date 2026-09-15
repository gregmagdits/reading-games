import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"carpenter", label:"Carpenter", icon:"🔨", scene:"carpenter-scene", projectile:"glue", pivot:".carpenter-pivot", aim:".carpenter-arm", lengthAxis:"width", lengthOffset:20, artwork:`<div class="carpenter-figure"><div class="carpenter-hard-hat"></div><div class="carpenter-head"></div><div class="carpenter-body"></div><div class="carpenter-arm"><div class="carpenter-sleeve"></div><div class="carpenter-hand"></div><div class="glue-gun"><div class="glue-stick"></div></div></div></div><div class="carpenter-pivot"></div>`, style:`[data-shooter-root="carpenter"]{position:absolute;inset:0}[data-shooter-root="carpenter"][hidden]{display:none}
.arena.carpenter-scene {
        background:
          radial-gradient(circle at 15% 14%, rgba(255, 246, 184, 0.98) 0 42px, rgba(255, 246, 184, 0) 43px),
          linear-gradient(180deg, #73c9f4 0%, #bcecff 62%, #8fb36a 78%, #80613e 79%, #49351f 100%);
      }


      .arena.carpenter-scene .scene-visual {
        opacity: 0.96;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20440%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M88%20391H714%22%20stroke%3D%22%23634a2e%22%20stroke-width%3D%2224%22%2F%3E%3Cpath%20d%3D%22M142%20378V168M302%20378V100M472%20378V100M642%20378V168M142%20168L302%2098L472%2098L642%20168M302%2098L387%2046L472%2098M142%20250H642M142%20322H642M222%20134V378M387%2098V378M557%20134V378%22%20fill%3D%22none%22%20stroke%3D%22%23a9652c%22%20stroke-width%3D%2217%22%2F%3E%3Cpath%20d%3D%22M127%20175L300%2090L386%2037L478%2091L657%20175%22%20fill%3D%22none%22%20stroke%3D%22%23d0914d%22%20stroke-width%3D%2213%22%2F%3E%3Cpath%20d%3D%22M155%20263H289V365H155Z%22%20fill%3D%22%23d8aa70%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20d%3D%22M170%20278L274%20350M274%20278L170%20350%22%20fill%3D%22none%22%20stroke%3D%22%23a9652c%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M487%20127H630V237H487Z%22%20fill%3D%22%23e2b67c%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20d%3D%22M516%20142V222M558%20142V222M600%20142V222%22%20fill%3D%22none%22%20stroke%3D%22%23a9652c%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M680%20374L735%20216M653%20374L708%20216M666%20335H720M674%20300H728M686%20264H738%22%20fill%3D%22none%22%20stroke%3D%22%23d7dde7%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M56%20378H124M43%20356H116M678%20404H757%22%20fill%3D%22none%22%20stroke%3D%22%23d0914d%22%20stroke-width%3D%2214%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 14px);
        background-size: min(780px, 98vw) auto;
      }


      .glue-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 22px;
        border: 3px solid #17202a;
        border-radius: 54% 46% 58% 42%;
        background: radial-gradient(circle at 34% 28%, #ffffff 0 24%, var(--glue-white) 25% 66%, #d9d7c9 100%);
        box-shadow: 0 4px 8px rgba(23, 32, 42, 0.28);
        animation: glue-flight 340ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .glue-string {
        position: absolute;
        left: 0;
        top: 0;
        height: 7px;
        border-radius: 999px;
        background: linear-gradient(90deg, #ffffff, var(--glue-white) 65%, rgba(255, 253, 242, 0));
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.72);
        transform-origin: 0 50%;
        animation: glue-string-fade 300ms ease-out forwards;
      }


      .glue-splat {
        position: absolute;
        left: 0;
        top: 0;
        width: 42px;
        height: 42px;
        border: 3px solid #17202a;
        background: var(--glue-white);
        clip-path: polygon(50% 0, 61% 28%, 86% 12%, 76% 39%, 100% 50%, 75% 62%, 88% 88%, 61% 75%, 50% 100%, 38% 75%, 12% 88%, 25% 61%, 0 50%, 25% 38%, 12% 12%, 39% 28%);
        transform: translate(-50%, -50%);
        animation: glue-splat-pop 380ms ease-out forwards;
      }


      .carpenter-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(132px, 19vmin, 178px);
        height: clamp(150px, 22vmin, 202px);
        transform: translateX(-50%);
        z-index: 4;
      }


      .carpenter-head {
        position: absolute;
        left: 50%;
        top: 30px;
        width: 62px;
        height: 62px;
        border: 4px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        transform: translateX(-50%);
        z-index: 3;
      }


      .carpenter-head::before,
      .carpenter-head::after {
        content: "";
        position: absolute;
        top: 23px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #17202a;
      }


      .carpenter-head::before {
        left: 16px;
      }


      .carpenter-head::after {
        right: 16px;
      }


      .carpenter-hard-hat {
        position: absolute;
        left: 50%;
        top: 2px;
        width: 78px;
        height: 47px;
        border: 4px solid #17202a;
        border-radius: 48px 48px 12px 12px;
        background: linear-gradient(180deg, #ffe26b, #f2aa17);
        transform: translateX(-50%);
        z-index: 5;
      }


      .carpenter-hard-hat::before {
        content: "";
        position: absolute;
        left: -12px;
        bottom: -7px;
        width: 94px;
        height: 13px;
        border: 4px solid #17202a;
        border-radius: 999px;
        background: #f6c445;
      }


      .carpenter-body {
        position: absolute;
        left: 50%;
        bottom: 2px;
        width: 94px;
        height: 108px;
        border: 4px solid #17202a;
        border-radius: 38px 38px 12px 12px;
        background: linear-gradient(90deg, #f4b24e 0 20%, var(--carpenter-blue) 21% 79%, #f4b24e 80% 100%);
        transform: translateX(-50%);
        z-index: 1;
      }


      .carpenter-body::after {
        content: "";
        position: absolute;
        left: -10px;
        bottom: 14px;
        width: 106px;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 8px;
        background:
          radial-gradient(circle at 20% 50%, #d7dde7 0 5px, transparent 6px),
          radial-gradient(circle at 78% 50%, #d7dde7 0 5px, transparent 6px),
          linear-gradient(180deg, #96602f, #5b341f);
      }


      .carpenter-arm {
        position: absolute;
        left: calc(50% + 10px);
        bottom: 82px;
        width: clamp(108px, 16vmin, 146px);
        height: 34px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 10px 50%;
        z-index: 6;
      }


      .carpenter-sleeve {
        position: absolute;
        left: 0;
        top: 7px;
        width: 45px;
        height: 21px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: var(--carpenter-blue);
      }


      .carpenter-hand {
        position: absolute;
        left: 37px;
        top: 4px;
        width: 25px;
        height: 25px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 3;
      }


      .glue-gun {
        position: absolute;
        left: 54px;
        top: 3px;
        width: 72px;
        height: 26px;
        border: 3px solid #17202a;
        border-radius: 9px 18px 8px 8px;
        background: linear-gradient(180deg, #ff8c42, #df5d1e);
      }


      .glue-gun::before {
        content: "";
        position: absolute;
        left: 16px;
        top: 18px;
        width: 20px;
        height: 30px;
        border: 3px solid #17202a;
        border-radius: 4px 4px 10px 10px;
        background: #4b5563;
        transform: rotate(-13deg);
      }


      .glue-gun::after {
        content: "";
        position: absolute;
        right: -24px;
        top: 7px;
        width: 25px;
        height: 8px;
        border: 3px solid #17202a;
        border-left: 0;
        border-radius: 0 999px 999px 0;
        background: #d7dde7;
      }


      .glue-stick {
        position: absolute;
        left: 45px;
        top: -8px;
        width: 48px;
        height: 9px;
        border: 2px solid #17202a;
        border-radius: 999px;
        background: rgba(255, 253, 242, 0.9);
      }


      .carpenter-pivot {
        position: absolute;
        left: calc(50% + 20px);
        bottom: 82px;
        width: 1px;
        height: 1px;
      }


      @keyframes glue-flight {
        0% {
          opacity: 1;
          transform: var(--glue-start-transform) rotate(0turn) scale(0.72);
        }

        100% {
          opacity: 0.98;
          transform: var(--glue-end-transform) rotate(0.45turn) scale(1);
        }
      }


      @keyframes glue-string-fade {
        0% {
          opacity: 0.95;
          transform: var(--glue-string-transform) scaleX(0.3);
        }

        100% {
          opacity: 0;
          transform: var(--glue-string-transform) scaleX(1);
        }
      }


      @keyframes glue-splat-pop {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.45) rotate(-16deg);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.45) rotate(12deg);
        }
      }
:root{--carpenter-blue: #2878b8;--glue-white: #fffdf2; }` });

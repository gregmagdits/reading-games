import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"garbagecan", label:"Garbage Can", icon:"🗑️", scene:"garbage-scene", projectile:"garbage", pivot:".garbagecan-pivot", aim:".garbagecan-launcher", lengthAxis:"width", lengthOffset:8, artwork:`<div class="garbagecan-figure"><div class="garbagecan-body"></div><div class="garbagecan-wheel garbagecan-wheel-left"></div><div class="garbagecan-wheel garbagecan-wheel-right"></div><div class="garbagecan-launcher"><div class="garbagecan-lid"></div><div class="garbage-ready-trash"></div></div></div><div class="garbagecan-pivot"></div>`, style:`[data-shooter-root="garbagecan"]{position:absolute;inset:0}[data-shooter-root="garbagecan"][hidden]{display:none}
.arena.garbage-scene {
        background:
          radial-gradient(circle at 14% 13%, rgba(255, 246, 184, 0.96) 0 38px, rgba(255, 246, 184, 0) 39px),
          linear-gradient(180deg, #78c9ee 0%, #c7efff 64%, #72955e 79%, #59606a 80%, #303740 100%);
      }


      .arena.garbage-scene .scene-visual {
        opacity: 0.98;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20860%20460%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M0%20382H860V460H0Z%22%20fill%3D%22%23454d56%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M38%20418H184M258%20418H404M478%20418H624M698%20418H822%22%20fill%3D%22none%22%20stroke%3D%22%23f5d76e%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M108%20340V176H556V340Z%22%20fill%3D%22%233f8f4f%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M142%20176L178%20114H522L556%20176Z%22%20fill%3D%22%2357a866%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M556%20340V216H704L770%20272V340Z%22%20fill%3D%22%23f2b134%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M704%20216H738L770%20272H704Z%22%20fill%3D%22%23bcecff%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20d%3D%22M584%20236H684V296H584Z%22%20fill%3D%22%23d8f3ff%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20d%3D%22M116%20214H548M116%20266H548M116%20318H548%22%20fill%3D%22none%22%20stroke%3D%22%23245b35%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M126%20196L166%20326M210%20182L244%20326M292%20182L324%20326M374%20182L406%20326M456%20182L490%20326%22%20fill%3D%22none%22%20stroke%3D%22%235fb06d%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M88%20340H784V370H88Z%22%20fill%3D%22%23303740%22%20stroke-width%3D%229%22%2F%3E%3Ccircle%20cx%3D%22212%22%20cy%3D%22364%22%20r%3D%2252%22%20fill%3D%22%23222a31%22%20stroke-width%3D%229%22%2F%3E%3Ccircle%20cx%3D%22212%22%20cy%3D%22364%22%20r%3D%2222%22%20fill%3D%22%23aab4bf%22%20stroke-width%3D%227%22%2F%3E%3Ccircle%20cx%3D%22672%22%20cy%3D%22364%22%20r%3D%2252%22%20fill%3D%22%23222a31%22%20stroke-width%3D%229%22%2F%3E%3Ccircle%20cx%3D%22672%22%20cy%3D%22364%22%20r%3D%2222%22%20fill%3D%22%23aab4bf%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20d%3D%22M576%20312H612%22%20fill%3D%22none%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M754%20288H790V316H754Z%22%20fill%3D%22%23ef476f%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M332%20138C354%20118%20388%20118%20410%20138C392%20131%20374%20134%20360%20148C350%20139%20340%20136%20332%20138Z%22%20fill%3D%22%23ffffff%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M64%20350L90%20260H120M70%20310H112%22%20fill%3D%22none%22%20stroke%3D%22%2389945a%22%20stroke-width%3D%2211%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 4px);
        background-size: min(860px, 100vw) auto;
      }


      .garbage-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 38px;
        height: 38px;
        filter: drop-shadow(0 5px 7px rgba(23, 32, 42, 0.32));
        animation: garbage-flight 430ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .garbage-paper {
        border: 3px solid #17202a;
        background: linear-gradient(135deg, #ffffff, #cbd5e1);
        clip-path: polygon(12% 10%, 43% 2%, 62% 17%, 91% 13%, 98% 48%, 82% 72%, 88% 96%, 52% 88%, 24% 100%, 18% 75%, 0 58%, 10% 34%);
      }


      .garbage-can-shot {
        width: 30px;
        height: 42px;
        border: 3px solid #17202a;
        border-radius: 8px 8px 12px 12px;
        background: linear-gradient(90deg, #aeb8c4, #eef2f7 48%, #7b8794);
      }


      .garbage-can-shot::before {
        content: "";
        position: absolute;
        left: -5px;
        top: -7px;
        width: 34px;
        height: 8px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: #d7dde7;
      }


      .garbage-impact {
        position: absolute;
        left: 0;
        top: 0;
        width: 54px;
        height: 42px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 25% 58%, rgba(211, 223, 198, 0.88) 0 22%, transparent 23%),
          radial-gradient(circle at 55% 35%, rgba(177, 194, 161, 0.9) 0 28%, transparent 29%),
          radial-gradient(circle at 78% 61%, rgba(133, 151, 119, 0.82) 0 22%, transparent 23%);
        transform: translate(-50%, -50%);
        animation: garbage-impact-pop 390ms ease-out forwards;
      }


      .garbagecan-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(142px, 21vmin, 190px);
        height: clamp(142px, 21vmin, 192px);
        transform: translateX(-50%);
        z-index: 4;
      }


      .garbagecan-body {
        position: absolute;
        left: 50%;
        bottom: 10px;
        width: 112px;
        height: 126px;
        border: 5px solid #17202a;
        border-radius: 12px 12px 28px 28px;
        background:
          repeating-linear-gradient(90deg, transparent 0 18px, rgba(23, 32, 42, 0.14) 19px 23px),
          linear-gradient(145deg, #65ad70, var(--garbage-green) 55%, var(--garbage-dark));
        transform: translateX(-50%);
        box-shadow: inset 0 -12px 0 rgba(23, 32, 42, 0.12), 0 9px 0 rgba(23, 32, 42, 0.14);
      }


      .garbagecan-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 30px;
        width: 52px;
        height: 44px;
        border: 4px solid rgba(235, 249, 231, 0.82);
        border-radius: 50%;
        transform: translateX(-50%);
      }


      .garbagecan-body::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 42px;
        width: 30px;
        height: 20px;
        background: rgba(235, 249, 231, 0.82);
        clip-path: polygon(0 0, 100% 0, 82% 100%, 18% 100%);
        transform: translateX(-50%);
      }


      .garbagecan-wheel {
        position: absolute;
        bottom: 1px;
        width: 34px;
        height: 34px;
        border: 5px solid #17202a;
        border-radius: 50%;
        background: radial-gradient(circle, #9ca3af 0 20%, #303740 21% 100%);
        z-index: 3;
      }


      .garbagecan-wheel-left {
        left: 25px;
      }


      .garbagecan-wheel-right {
        right: 25px;
      }


      .garbagecan-launcher {
        position: absolute;
        left: calc(50% + 2px);
        bottom: 128px;
        width: clamp(100px, 15vmin, 136px);
        height: 48px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 12px 50%;
        z-index: 6;
      }


      .garbagecan-lid {
        position: absolute;
        left: -12px;
        top: 10px;
        width: 104px;
        height: 24px;
        border: 5px solid #17202a;
        border-radius: 999px 999px 12px 12px;
        background: linear-gradient(180deg, #76bb7e, var(--garbage-dark));
      }


      .garbagecan-lid::before {
        content: "";
        position: absolute;
        left: 31px;
        top: -17px;
        width: 34px;
        height: 15px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 16px 16px 0 0;
      }


      .garbage-ready-trash {
        position: absolute;
        right: 1px;
        top: 0;
        width: 42px;
        height: 42px;
        border: 3px solid #17202a;
        background: linear-gradient(135deg, #ffffff, #aeb8c4);
        clip-path: polygon(8% 13%, 34% 0, 59% 16%, 88% 9%, 100% 42%, 84% 68%, 91% 94%, 55% 86%, 27% 100%, 19% 75%, 0 57%, 12% 34%);
      }


      .garbagecan-pivot {
        position: absolute;
        left: calc(50% + 14px);
        bottom: 128px;
        width: 1px;
        height: 1px;
      }


      @keyframes garbage-flight {
        0% {
          opacity: 1;
          transform: var(--garbage-start-transform) rotate(0turn) scale(0.72);
        }

        52% {
          transform: var(--garbage-mid-transform) rotate(0.8turn) scale(1.08);
        }

        100% {
          opacity: 0.98;
          transform: var(--garbage-end-transform) rotate(1.55turn) scale(1);
        }
      }


      @keyframes garbage-impact-pop {
        0% {
          opacity: 0.92;
          transform: translate(-50%, -50%) scale(0.4);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.8);
        }
      }
.garbage-banana {
        border: 8px solid var(--book-gold);
        border-top-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        transform: rotate(20deg);
      }
:root{--garbage-green: #3f8f4f;--garbage-dark: #245b35; }` });

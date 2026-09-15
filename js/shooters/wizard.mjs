import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"wizard", label:"Wizard", icon:"✶", scene:"wizard-scene", projectile:"sparkles", pivot:".wizard-pivot", aim:".wizard-arm", lengthAxis:"width", lengthOffset:10, artwork:`<div class="wizard-figure"><div class="wizard-hat"></div><div class="wizard-head"></div><div class="wizard-beard"></div><div class="wizard-body"></div><div class="wizard-arm"><div class="wizard-sleeve"></div><div class="wizard-hand"></div><div class="magic-wand"></div></div></div><div class="wizard-pivot"></div>`, style:`[data-shooter-root="wizard"]{position:absolute;inset:0}[data-shooter-root="wizard"][hidden]{display:none}
.arena.wizard-scene {
        background:
          radial-gradient(circle at 78% 13%, rgba(255, 244, 184, 0.88) 0 38px, rgba(255, 244, 184, 0) 39px),
          radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.88) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 43% 9%, rgba(255, 255, 255, 0.72) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 63% 22%, rgba(255, 255, 255, 0.8) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #0c1130 0%, #263967 58%, #4a6473 77%, #254b36 100%);
      }


      .arena.wizard-scene .scene-visual {
        opacity: 0.94;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20820%20430%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M0%20370C86%20342%20168%20346%20248%20370C338%20340%20432%20344%20528%20370C628%20340%20724%20346%20820%20370V430H0Z%22%20fill%3D%22%2328513a%22%2F%3E%3Cpath%20d%3D%22M142%20368V202H224V368Z%22%20fill%3D%22%239aa7b6%22%2F%3E%3Cpath%20d%3D%22M520%20368V202H602V368Z%22%20fill%3D%22%239aa7b6%22%2F%3E%3Cpath%20d%3D%22M224%20368V158H520V368Z%22%20fill%3D%22%23cbd5e1%22%2F%3E%3Cpath%20d%3D%22M176%20202V136H200V164H224V136H248V202Z%22%20fill%3D%22%23dfe6ef%22%2F%3E%3Cpath%20d%3D%22M496%20202V136H520V164H544V136H568V202Z%22%20fill%3D%22%23dfe6ef%22%2F%3E%3Cpath%20d%3D%22M278%20158V100H304V128H332V100H358V158Z%22%20fill%3D%22%23eef2f7%22%2F%3E%3Cpath%20d%3D%22M386%20158V100H412V128H440V100H466V158Z%22%20fill%3D%22%23eef2f7%22%2F%3E%3Cpath%20d%3D%22M332%20368V266C332%20228%20412%20228%20412%20266V368Z%22%20fill%3D%22%235f3a28%22%2F%3E%3Cpath%20d%3D%22M362%20368V282C362%20266%20382%20266%20382%20282V368Z%22%20fill%3D%22%233b251b%22%2F%3E%3Cpath%20d%3D%22M372%20100V50L454%2074L372%2096Z%22%20fill%3D%22%237c3aed%22%2F%3E%3Cpath%20d%3D%22M142%20202H224M520%20202H602M224%20158H520%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M618%20258C653%20212%20718%20212%20748%20258C726%20248%20702%20250%20682%20270C660%20252%20638%20250%20618%20258Z%22%20fill%3D%22%234f9d45%22%2F%3E%3Cpath%20d%3D%22M682%20270C696%20290%20724%20294%20748%20278L780%20290L750%20248C728%20228%20700%20228%20682%20270Z%22%20fill%3D%22%233a7a35%22%2F%3E%3Cpath%20d%3D%22M742%20256L792%20230L782%20288Z%22%20fill%3D%22%233a7a35%22%2F%3E%3Cpath%20d%3D%22M666%20252L638%20230L650%20276Z%22%20fill%3D%22%2385c75a%22%2F%3E%3Ccircle%20cx%3D%22728%22%20cy%3D%22250%22%20r%3D%224%22%20fill%3D%22%2317202a%22%2F%3E%3Cpath%20d%3D%22M744%20264L760%20268%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M632%20292C672%20314%20724%20314%20768%20294%22%20fill%3D%22none%22%20stroke%3D%22%2385c75a%22%20stroke-width%3D%225%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 28px);
        background-size: min(820px, 98vw) auto;
      }


      .sparkle-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 26px;
        height: 26px;
        background:
          radial-gradient(circle, #ffffff 0 14%, var(--sparkle-gold) 15% 34%, rgba(255, 230, 109, 0) 35%);
        clip-path: polygon(50% 0, 60% 34%, 96% 18%, 66% 50%, 96% 82%, 60% 66%, 50% 100%, 40% 66%, 4% 82%, 34% 50%, 4% 18%, 40% 34%);
        filter: drop-shadow(0 0 9px rgba(255, 230, 109, 0.9)) drop-shadow(0 0 18px rgba(125, 211, 252, 0.58));
        animation: sparkle-flight 460ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .sparkle-trail {
        position: absolute;
        left: 0;
        top: 0;
        height: 14px;
        border-radius: 999px;
        background:
          repeating-radial-gradient(circle at 12% 50%, rgba(255, 255, 255, 0.95) 0 3px, rgba(255, 255, 255, 0) 4px 15px),
          linear-gradient(90deg, rgba(255, 230, 109, 0.92), rgba(125, 211, 252, 0.58), rgba(125, 211, 252, 0));
        box-shadow: 0 0 14px rgba(255, 230, 109, 0.6);
        transform-origin: 0 50%;
        animation: sparkle-trail-fade 360ms ease-out forwards;
      }


      .wand-flash {
        position: absolute;
        left: 0;
        top: 0;
        width: 34px;
        height: 34px;
        background:
          radial-gradient(circle, #ffffff 0 18%, var(--sparkle-gold) 19% 42%, rgba(255, 230, 109, 0) 43%);
        clip-path: polygon(50% 0, 60% 32%, 95% 18%, 70% 50%, 100% 62%, 62% 64%, 72% 100%, 50% 72%, 24% 100%, 38% 64%, 0 62%, 30% 50%, 5% 18%, 40% 32%);
        transform: translate(-50%, -50%);
        animation: wand-flash-pop 260ms ease-out forwards;
      }


      .wizard-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(126px, 18vmin, 170px);
        height: clamp(154px, 23vmin, 210px);
        transform: translateX(-50%);
        z-index: 4;
      }


      .wizard-hat {
        position: absolute;
        left: 50%;
        top: 0;
        width: 72px;
        height: 86px;
        border: 4px solid #17202a;
        background:
          radial-gradient(circle at 44% 30%, var(--sparkle-gold) 0 5%, rgba(255, 230, 109, 0) 6%),
          linear-gradient(180deg, #8b5cf6, var(--wizard-purple));
        clip-path: polygon(50% 0, 96% 100%, 4% 100%);
        transform: translateX(-50%) rotate(-5deg);
        z-index: 4;
      }


      .wizard-hat::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -11px;
        width: 92px;
        height: 20px;
        border: 4px solid #17202a;
        border-radius: 50%;
        background: linear-gradient(180deg, #a78bfa, var(--wizard-purple));
        transform: translateX(-50%);
      }


      .wizard-head {
        position: absolute;
        left: 50%;
        top: 62px;
        width: 58px;
        height: 58px;
        border: 4px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        transform: translateX(-50%);
        z-index: 3;
      }


      .wizard-head::before,
      .wizard-head::after {
        content: "";
        position: absolute;
        top: 22px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #17202a;
      }


      .wizard-head::before {
        left: 16px;
      }


      .wizard-head::after {
        right: 16px;
      }


      .wizard-beard {
        position: absolute;
        left: 50%;
        top: 98px;
        width: 62px;
        height: 58px;
        border: 4px solid #17202a;
        border-top: 0;
        border-radius: 0 0 36px 36px;
        background: linear-gradient(180deg, #f8fafc, #cbd5e1);
        transform: translateX(-50%);
        z-index: 2;
      }


      .wizard-body {
        position: absolute;
        left: 50%;
        bottom: 4px;
        width: 92px;
        height: 108px;
        border: 4px solid #17202a;
        border-radius: 42px 42px 14px 14px;
        background:
          radial-gradient(circle at 32% 36%, var(--sparkle-gold) 0 5%, rgba(255, 230, 109, 0) 6%),
          radial-gradient(circle at 68% 54%, #7dd3fc 0 5%, rgba(125, 211, 252, 0) 6%),
          linear-gradient(180deg, var(--wizard-blue), var(--wizard-purple));
        transform: translateX(-50%);
        z-index: 1;
      }


      .wizard-body::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -4px;
        width: 118px;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 50% 50% 10px 10px;
        background: linear-gradient(180deg, #8b5cf6, #4c1d95);
        transform: translateX(-50%);
      }


      .wizard-arm {
        position: absolute;
        left: calc(50% + 8px);
        bottom: 86px;
        width: clamp(112px, 16vmin, 150px);
        height: 30px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 10px 50%;
        z-index: 6;
      }


      .wizard-sleeve {
        position: absolute;
        left: 0;
        top: 6px;
        width: 50px;
        height: 19px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #8b5cf6, var(--wizard-purple));
      }


      .wizard-hand {
        position: absolute;
        left: 39px;
        top: 3px;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 2;
      }


      .magic-wand::after {
        content: "";
        position: absolute;
        right: -13px;
        top: 50%;
        width: 22px;
        height: 22px;
        background: var(--sparkle-gold);
        clip-path: polygon(50% 0, 62% 34%, 98% 18%, 68% 50%, 98% 82%, 62% 66%, 50% 100%, 38% 66%, 2% 82%, 32% 50%, 2% 18%, 38% 34%);
        filter: drop-shadow(0 0 8px rgba(255, 230, 109, 0.8));
        transform: translateY(-50%);
      }


      .wizard-pivot {
        position: absolute;
        left: calc(50% + 16px);
        bottom: 86px;
        width: 1px;
        height: 1px;
      }


      @keyframes sparkle-flight {
        0% {
          opacity: 1;
          transform: var(--sparkle-start-transform) rotate(0turn) scale(0.7);
        }

        48% {
          opacity: 1;
          transform: var(--sparkle-mid-transform) rotate(0.7turn) scale(1.12);
        }

        100% {
          opacity: 0.96;
          transform: var(--sparkle-end-transform) rotate(1.4turn) scale(1);
        }
      }


      @keyframes sparkle-trail-fade {
        0% {
          opacity: 0.95;
          transform: var(--sparkle-trail-transform) scaleX(0.35);
        }

        100% {
          opacity: 0;
          transform: var(--sparkle-trail-transform) scaleX(1);
        }
      }


      @keyframes wand-flash-pop {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(0turn) scale(0.45);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(0.35turn) scale(1.45);
        }
      }
.magic-wand {
        position: absolute;
        left: 58px;
        top: 12px;
        width: 82px;
        height: 7px;
        border: 2px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(90deg, #5b341f, #d6a23a);
        z-index: 3;
      }
:root{--wizard-purple: #6d28d9;--wizard-blue: #2563eb;--sparkle-gold: #ffe66d; }` });

import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"bow", label:"Bow", icon:"🏹", scene:"bow-scene", projectile:"arrow", pivot:".bow-pivot", aim:".bow-weapon", lengthAxis:"height", lengthOffset:-8, verticalAim:true, artwork:`<div class="bow-weapon"><div class="bow-arc"></div><div class="bow-string"></div><div class="bow-ready-arrow"></div><div class="bow-grip"></div></div><div class="bow-pivot"></div>`, style:`[data-shooter-root="bow"]{position:absolute;inset:0}[data-shooter-root="bow"][hidden]{display:none}
.bow-weapon {
        position: absolute;
        left: 50%;
        bottom: 26px;
        width: clamp(88px, 13vmin, 122px);
        height: clamp(124px, 18vmin, 164px);
        transform: translateX(-50%) rotate(0rad);
        transform-origin: 50% calc(100% - 14px);
        z-index: 3;
      }


      .bow-arc {
        position: absolute;
        left: 50%;
        top: 0;
        width: 54%;
        height: 100%;
        border: 8px solid var(--bow-dark);
        border-left: 0;
        border-radius: 0 999px 999px 0;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
        transform: translateX(-10%);
      }


      .bow-string {
        position: absolute;
        left: 50%;
        top: 8px;
        width: 4px;
        height: calc(100% - 16px);
        border-radius: 999px;
        background: #f8edc8;
        transform: translateX(-50%);
        box-shadow: 0 0 0 2px rgba(23, 32, 42, 0.18);
      }


      .bow-ready-arrow {
        position: absolute;
        left: 50%;
        top: 5px;
        width: 6px;
        height: calc(100% - 28px);
        border: 2px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #e3b46e, #734a2b);
        transform: translateX(-50%);
      }


      .bow-ready-arrow::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -15px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 18px solid #d6a23a;
        transform: translateX(-50%);
      }


      .bow-grip {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 38px;
        border: 4px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #c98442, var(--bow-wood));
        transform: translate(-50%, -50%);
      }


      .bow-pivot {
        position: absolute;
        left: 50%;
        bottom: 40px;
        width: 1px;
        height: 1px;
      }
.arrow-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 84px;
        height: 18px;
        animation: arrow-flight 360ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
        filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.26));
      }


      .arrow-shot::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 50%;
        width: 66px;
        height: 5px;
        border: 2px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(90deg, #f1c27d, #8a5a35);
        transform: translateY(-50%);
      }


      .arrow-shot::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        border-left: 18px solid #d6a23a;
        filter: drop-shadow(0 0 0 #17202a);
        transform: translateY(-50%);
      }


      .arrow-feather {
        position: absolute;
        left: 0;
        top: 50%;
        width: 18px;
        height: 18px;
        background:
          linear-gradient(135deg, transparent 0 42%, #ef476f 43% 100%),
          linear-gradient(45deg, transparent 0 42%, #70d6ff 43% 100%);
        transform: translateY(-50%);
      }


      @keyframes arrow-flight {
        0% {
          opacity: 1;
          transform: var(--arrow-start-transform) scale(0.92);
        }

        100% {
          opacity: 0.96;
          transform: var(--arrow-end-transform) scale(1);
        }
      }
:root{--bow-wood: #9b5a32;--bow-dark: #5b341f; }` });

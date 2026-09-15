import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"cowboy", label:"Cowboy", icon:"🤠", scene:"cowboy-scene", projectile:"bullet", pivot:".cowboy-pivot", aim:".cowboy-arm", lengthAxis:"width", lengthOffset:10, artwork:`<div class="cowboy-figure"><div class="cowboy-hat"></div><div class="cowboy-head"></div><div class="cowboy-body"></div><div class="cowboy-arm"><div class="cowboy-sleeve"></div><div class="cowboy-hand"></div><div class="six-shooter"></div></div></div><div class="cowboy-pivot"></div>`, style:`[data-shooter-root="cowboy"]{position:absolute;inset:0}[data-shooter-root="cowboy"][hidden]{display:none}
.bullet-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 11px;
        border: 2px solid #17202a;
        border-radius: 999px 70% 70% 999px;
        background: linear-gradient(90deg, #fef3c7, #d6a23a 54%, #8a5a12);
        box-shadow: 0 0 12px rgba(255, 239, 110, 0.74);
        animation: bullet-flight 230ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .six-shooter-flash {
        position: absolute;
        left: 0;
        top: 0;
        width: 34px;
        height: 34px;
        background:
          radial-gradient(circle, #ffffff 0 16%, #ffef6e 17% 38%, #ff7a1a 39% 62%, rgba(255, 122, 26, 0) 63%);
        clip-path: polygon(50% 0, 60% 32%, 95% 18%, 70% 50%, 100% 62%, 62% 64%, 72% 100%, 50% 72%, 24% 100%, 38% 64%, 0 62%, 30% 50%, 5% 18%, 40% 32%);
        transform: translate(-50%, -50%) rotate(var(--flash-rotation));
        animation: six-shooter-flash-fade 180ms ease-out forwards;
      }


      .cowboy-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(128px, 19vmin, 174px);
        height: clamp(144px, 21vmin, 190px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .cowboy-head {
        position: absolute;
        left: 50%;
        bottom: 88px;
        width: clamp(42px, 6.5vmin, 58px);
        height: clamp(42px, 6.5vmin, 58px);
        border: 4px solid #17202a;
        border-radius: 48% 48% 52% 52%;
        background: var(--skin);
        transform: translateX(-50%);
        z-index: 3;
      }


      .cowboy-head::before,
      .cowboy-head::after {
        content: "";
        position: absolute;
        top: 42%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #17202a;
      }


      .cowboy-head::before {
        left: 28%;
      }


      .cowboy-head::after {
        right: 28%;
      }


      .cowboy-hat {
        position: absolute;
        left: 50%;
        bottom: 126px;
        width: clamp(78px, 11vmin, 106px);
        height: 22px;
        border: 4px solid #17202a;
        border-radius: 999px;
        background: var(--cowboy-hat);
        transform: translateX(-50%);
        z-index: 4;
      }


      .cowboy-hat::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 9px;
        width: 48%;
        height: 32px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 22px 22px 8px 8px;
        background: linear-gradient(180deg, #b77944, var(--cowboy-hat));
        transform: translateX(-50%);
      }


      .cowboy-body {
        position: absolute;
        left: 50%;
        bottom: 32px;
        width: clamp(68px, 10vmin, 92px);
        height: clamp(66px, 10vmin, 88px);
        border: 4px solid #17202a;
        border-radius: 24px 24px 12px 12px;
        background:
          linear-gradient(90deg, transparent 0 46%, #ffffff 47% 53%, transparent 54% 100%),
          linear-gradient(180deg, #ff595e, var(--cowboy-shirt));
        transform: translateX(-50%);
        z-index: 2;
      }


      .cowboy-body::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -20px;
        width: 112%;
        height: 22px;
        border: 4px solid #17202a;
        border-radius: 10px;
        background: linear-gradient(90deg, var(--cowboy-denim) 0 45%, #17202a 46% 54%, var(--cowboy-denim) 55% 100%);
        transform: translateX(-50%);
      }


      .cowboy-arm {
        position: absolute;
        left: calc(50% + 18px);
        bottom: 92px;
        width: clamp(112px, 16vmin, 148px);
        height: 30px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 12px 50%;
        z-index: 5;
      }


      .cowboy-sleeve {
        position: absolute;
        left: 0;
        top: 7px;
        width: 52px;
        height: 17px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: var(--cowboy-shirt);
      }


      .cowboy-hand {
        position: absolute;
        left: 42px;
        top: 4px;
        width: 22px;
        height: 22px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 2;
      }


      .six-shooter {
        position: absolute;
        left: 56px;
        top: 6px;
        width: 42px;
        height: 18px;
        border: 3px solid #17202a;
        border-radius: 12px 8px 8px 12px;
        background: linear-gradient(180deg, #c5ced8, #5b6470);
        z-index: 3;
      }


      .six-shooter::before {
        content: "";
        position: absolute;
        left: 32px;
        top: 4px;
        width: 36px;
        height: 8px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #dbe3ec, #65717d);
      }


      .six-shooter::after {
        content: "";
        position: absolute;
        left: 10px;
        top: 10px;
        width: 15px;
        height: 24px;
        border: 3px solid #17202a;
        border-top: 0;
        border-radius: 4px 4px 999px 999px;
        background: linear-gradient(180deg, #8a5a35, #4f321d);
        transform: rotate(-18deg);
      }


      .cowboy-pivot {
        position: absolute;
        left: calc(50% + 30px);
        bottom: 92px;
        width: 1px;
        height: 1px;
      }


      @keyframes six-shooter-flash-fade {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--flash-rotation)) scale(1.8);
        }
      }
@keyframes bullet-flight {
        0% {
          opacity: 1;
          transform: var(--bullet-start-transform) scale(0.85);
        }

        100% {
          opacity: 0.94;
          transform: var(--bullet-end-transform) scale(1);
        }
      }
:root{--cowboy-hat: #8a5a35;--cowboy-shirt: #d62828;--cowboy-denim: #2f5d8c; }` });

import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"dragon", label:"Dragon", icon:"🐉", scene:"dragon-scene", projectile:"fire", pivot:".dragon-pivot", aim:".dragon-head", lengthAxis:"height", lengthOffset:2, verticalAim:true, artwork:`<div class="dragon-neck"></div><div class="dragon-head"><div class="dragon-crest"></div><div class="dragon-horn dragon-horn-left"></div><div class="dragon-horn dragon-horn-right"></div><div class="dragon-snout"><span class="dragon-nostril dragon-nostril-left"></span><span class="dragon-nostril dragon-nostril-right"></span><div class="dragon-mouth"></div></div><div class="dragon-eye dragon-eye-left"></div><div class="dragon-eye dragon-eye-right"></div></div><div class="dragon-pivot"></div>`, style:`[data-shooter-root="dragon"]{position:absolute;inset:0}[data-shooter-root="dragon"][hidden]{display:none}
.arena.dragon-scene {
        background:
          radial-gradient(circle at 16% 14%, rgba(255, 240, 178, 0.92) 0 34px, rgba(255, 240, 178, 0) 35px),
          radial-gradient(circle at 42% 16%, rgba(255, 255, 255, 0.78) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 72% 11%, rgba(255, 255, 255, 0.8) 0 1px, rgba(255, 255, 255, 0) 2px),
          linear-gradient(180deg, #07162f 0%, #172e4e 60%, #254b4a 82%, #1f5a3c 100%);
      }


      .arena.dragon-scene .scene-visual {
        opacity: 0.88;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20760%20430%22%3E%3Cpath%20d%3D%22M0%20430H760V318C690%20294%20628%20292%20565%20314C488%20270%20398%20274%20330%20314C244%20282%20160%20290%2092%20326C58%20314%2028%20310%200%20316Z%22%20fill%3D%22%231d5a42%22%2F%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M186%20388V214H258V388Z%22%20fill%3D%22%239aa7b6%22%2F%3E%3Cpath%20d%3D%22M502%20388V214H574V388Z%22%20fill%3D%22%239aa7b6%22%2F%3E%3Cpath%20d%3D%22M258%20388V170H502V388Z%22%20fill%3D%22%23b9c3cf%22%2F%3E%3Cpath%20d%3D%22M222%20214V152H246V176H270V152H294V214Z%22%20fill%3D%22%23c9d2dc%22%2F%3E%3Cpath%20d%3D%22M466%20214V152H490V176H514V152H538V214Z%22%20fill%3D%22%23c9d2dc%22%2F%3E%3Cpath%20d%3D%22M288%20170V118H314V144H342V118H370V170Z%22%20fill%3D%22%23d7dee7%22%2F%3E%3Cpath%20d%3D%22M390%20170V118H416V144H444V118H472V170Z%22%20fill%3D%22%23d7dee7%22%2F%3E%3Cpath%20d%3D%22M292%20388V272C292%20232%20468%20232%20468%20272V388Z%22%20fill%3D%22%236a4630%22%2F%3E%3Cpath%20d%3D%22M348%20388V286C348%20270%20412%20270%20412%20286V388Z%22%20fill%3D%22%23463022%22%2F%3E%3Cpath%20d%3D%22M186%20214H258M502%20214H574M258%20170H502%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M313%20118L313%2070L376%2094Z%22%20fill%3D%22%23ff6b6b%22%2F%3E%3Cpath%20d%3D%22M415%20118L415%2070L478%2094Z%22%20fill%3D%22%23ffd166%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23ffe8a3%22%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%3E%3Crect%20x%3D%22314%22%20y%3D%22206%22%20width%3D%2238%22%20height%3D%2248%22%20rx%3D%228%22%2F%3E%3Crect%20x%3D%22408%22%20y%3D%22206%22%20width%3D%2238%22%20height%3D%2248%22%20rx%3D%228%22%2F%3E%3Crect%20x%3D%22207%22%20y%3D%22254%22%20width%3D%2228%22%20height%3D%2240%22%20rx%3D%228%22%2F%3E%3Crect%20x%3D%22525%22%20y%3D%22254%22%20width%3D%2228%22%20height%3D%2240%22%20rx%3D%228%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 38px);
        background-size: min(720px, 94vw) auto;
      }


      .fire-shot {
        position: absolute;
        left: 0;
        top: 0;
        height: 34px;
        border-radius: 999px 70% 70% 999px;
        background:
          radial-gradient(circle at 92% 50%, #fff7a8 0 8%, rgba(255, 247, 168, 0) 28%),
          linear-gradient(90deg, #fff7a8 0%, #ffda3d 22%, #ff7a1a 52%, #d7261e 100%);
        box-shadow: 0 0 18px rgba(255, 130, 26, 0.75), 0 0 34px rgba(255, 45, 18, 0.42);
        transform-origin: 0 50%;
        animation: fire-burst 260ms ease-out forwards;
      }


      .fire-shot::before,
      .fire-shot::after {
        content: "";
        position: absolute;
        inset: 7px 10% 7px 8%;
        border-radius: inherit;
        background: linear-gradient(90deg, #ffffff 0%, #ffe66d 42%, rgba(255, 230, 109, 0) 100%);
        opacity: 0.82;
      }


      .fire-shot::after {
        inset: -7px 20% auto 34%;
        height: 17px;
        background: #ff8a1c;
        opacity: 0.9;
        transform: skewX(-22deg);
      }


      .ember {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ffd166;
        box-shadow: 0 0 14px rgba(255, 150, 30, 0.9);
        transform: translate(-50%, -50%);
        animation: ember-pop 360ms ease-out forwards;
      }


      .dragon-head {
        position: absolute;
        left: 50%;
        bottom: 34px;
        width: clamp(126px, 19vmin, 178px);
        height: clamp(108px, 17vmin, 152px);
        border: 4px solid #17202a;
        border-radius: 48% 48% 55% 55%;
        background:
          radial-gradient(circle at 34% 42%, rgba(255, 255, 255, 0.32) 0 16%, rgba(255, 255, 255, 0) 17%),
          linear-gradient(135deg, #79d96f, #28a745 58%, #176f36);
        box-shadow: 0 12px 0 rgba(23, 32, 42, 0.12);
        transform: translateX(-50%) rotate(0rad);
        transform-origin: 50% 100%;
      }


      .dragon-crest {
        position: absolute;
        left: 50%;
        top: -22px;
        width: 56%;
        height: 34px;
        background: linear-gradient(180deg, #ff715b, #d7261e);
        clip-path: polygon(0 100%, 15% 20%, 30% 100%, 50% 0, 70% 100%, 85% 20%, 100% 100%);
        transform: translateX(-50%);
      }


      .dragon-horn {
        position: absolute;
        top: -14px;
        width: 22px;
        height: 34px;
        border: 3px solid #17202a;
        border-radius: 70% 70% 20% 20%;
        background: #fff1c2;
      }


      .dragon-horn-left {
        left: 24px;
        transform: rotate(-24deg);
      }


      .dragon-horn-right {
        right: 24px;
        transform: rotate(24deg);
      }


      .dragon-eye {
        position: absolute;
        top: 36%;
        width: 20px;
        height: 20px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: #ffffff;
      }


      .dragon-eye::after {
        content: "";
        position: absolute;
        left: 6px;
        top: 4px;
        width: 7px;
        height: 10px;
        border-radius: 50%;
        background: #17202a;
      }


      .dragon-eye-left {
        left: 28%;
      }


      .dragon-eye-right {
        right: 28%;
      }


      .dragon-snout {
        position: absolute;
        left: 50%;
        top: -6px;
        width: 54%;
        height: 42%;
        border: 3px solid #17202a;
        border-radius: 48% 48% 58% 58%;
        background: linear-gradient(180deg, #b8f48a, #63c95c);
        transform: translateX(-50%);
      }


      .dragon-nostril {
        position: absolute;
        top: 42%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #17202a;
      }


      .dragon-nostril-left {
        left: 30%;
      }


      .dragon-nostril-right {
        right: 30%;
      }


      .dragon-mouth {
        position: absolute;
        left: 50%;
        top: -8px;
        width: 20px;
        height: 12px;
        border: 3px solid #17202a;
        border-bottom: 0;
        border-radius: 999px 999px 0 0;
        background: #ff715b;
        transform: translateX(-50%);
      }


      .dragon-neck {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(58px, 9vmin, 86px);
        height: 58px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 42px 42px 0 0;
        background: linear-gradient(180deg, #28a745, #176f36);
        transform: translateX(-50%);
      }


      .dragon-pivot {
        position: absolute;
        left: 50%;
        bottom: 34px;
        width: 1px;
        height: 1px;
      }


      @keyframes fire-burst {
        to {
          opacity: 0;
          filter: blur(1px);
          transform: var(--fire-transform) scaleX(0.82) scaleY(1.28);
        }
      }


      @keyframes ember-pop {
        to {
          opacity: 0;
          transform: translate(var(--ember-x), var(--ember-y)) scale(0.35);
        }
      }` });

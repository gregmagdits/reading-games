import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"laser", label:"Laser", icon:"⚡", scene:"laser-scene", projectile:"laser", pivot:".gun-pivot", aim:".barrel", lengthAxis:"height", lengthOffset:-2, verticalAim:true, artwork:`<div class="barrel"><div class="barrel-tip"></div></div><div class="gun-pivot"></div><div class="gun-body"></div><div class="stand"></div>`, style:`[data-shooter-root="laser"]{position:absolute;inset:0}[data-shooter-root="laser"][hidden]{display:none}
.arena.laser-scene {
        background:
          radial-gradient(circle at 14% 15%, rgba(255, 255, 230, 0.95) 0 36px, rgba(255, 255, 230, 0) 37px),
          radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.9) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 48% 10%, rgba(255, 255, 255, 0.82) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 78% 16%, rgba(255, 255, 255, 0.82) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #07162f 0%, #132d58 62%, #18364e 82%, #123522 100%);
      }


      .arena.laser-scene .scene-visual {
        opacity: 0.68;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20700%20380%22%3E%3Cg%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cellipse%20cx%3D%22350%22%20cy%3D%22190%22%20rx%3D%22250%22%20ry%3D%2278%22%20stroke%3D%22%2375e6ff%22%20stroke-width%3D%2212%22%20opacity%3D%22.72%22%2F%3E%3Cellipse%20cx%3D%22350%22%20cy%3D%22190%22%20rx%3D%22250%22%20ry%3D%2278%22%20stroke%3D%22%23f7f9ff%22%20stroke-width%3D%227%22%20opacity%3D%22.58%22%20transform%3D%22rotate%2860%20350%20190%29%22%2F%3E%3Cellipse%20cx%3D%22350%22%20cy%3D%22190%22%20rx%3D%22250%22%20ry%3D%2278%22%20stroke%3D%22%23ffef6e%22%20stroke-width%3D%228%22%20opacity%3D%22.68%22%20transform%3D%22rotate%28120%20350%20190%29%22%2F%3E%3Ccircle%20cx%3D%22350%22%20cy%3D%22190%22%20r%3D%2242%22%20fill%3D%22%23ff5c8a%22%20stroke%3D%22%23fff4a3%22%20stroke-width%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22585%22%20cy%3D%22190%22%20r%3D%2220%22%20fill%3D%22%23f7f9ff%22%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%2F%3E%3Ccircle%20cx%3D%22222%22%20cy%3D%2286%22%20r%3D%2218%22%20fill%3D%22%237cff8e%22%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%2F%3E%3Ccircle%20cx%3D%22472%22%20cy%3D%22296%22%20r%3D%2218%22%20fill%3D%22%23ffef6e%22%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center 42%;
        background-size: min(620px, 86vw) auto;
      }


      .laser-shot {
        position: absolute;
        left: 0;
        top: 0;
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(90deg, #ffffff, var(--laser) 32%, #b80628);
        box-shadow: 0 0 12px var(--laser-glow), 0 0 24px var(--laser-glow);
        transform-origin: 0 50%;
        animation: laser-fade 170ms ease-out forwards;
      }


      .spark {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ffe066;
        box-shadow: 0 0 16px rgba(255, 224, 102, 0.85);
        transform: translate(-50%, -50%);
        animation: spark-pop 260ms ease-out forwards;
      }


      .barrel {
        position: absolute;
        left: 50%;
        bottom: 54px;
        width: clamp(20px, 3.2vmin, 30px);
        height: clamp(90px, 14vmin, 126px);
        border: 3px solid #17202a;
        border-radius: 999px 999px 10px 10px;
        background: linear-gradient(90deg, var(--barrel-dark), var(--barrel), #718091);
        transform: translateX(-50%) rotate(0rad);
        transform-origin: 50% calc(100% - 8px);
        box-shadow: inset 0 10px 16px rgba(255, 255, 255, 0.14);
      }


      .barrel-tip {
        position: absolute;
        top: -8px;
        left: 50%;
        width: 32px;
        height: 18px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: #d9e1e8;
        transform: translateX(-50%);
      }


      .gun-pivot {
        position: absolute;
        left: 50%;
        bottom: 62px;
        width: 1px;
        height: 1px;
      }


      .gun-body {
        position: absolute;
        left: 50%;
        bottom: 16px;
        width: clamp(116px, 17vmin, 154px);
        height: clamp(58px, 8vmin, 78px);
        border: 4px solid #17202a;
        border-radius: 40px 40px 14px 14px;
        background: linear-gradient(180deg, #ffca3a, var(--orange));
        transform: translateX(-50%);
        box-shadow: 0 10px 0 rgba(23, 32, 42, 0.1);
      }


      .gun-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 16px;
        width: 46%;
        height: 22px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: #ffffff;
        transform: translateX(-50%);
      }


      .stand {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(76px, 12vmin, 106px);
        height: 28px;
        border: 4px solid #17202a;
        border-bottom: 0;
        border-radius: 18px 18px 0 0;
        background: #3d5a80;
        transform: translateX(-50%);
      }


      .gun.cannon-mode .barrel {
        bottom: 44px;
        width: clamp(38px, 5.6vmin, 54px);
        height: clamp(86px, 12vmin, 112px);
        border-width: 4px;
        border-radius: 18px 18px 26px 26px;
        background: linear-gradient(90deg, #171b20, var(--cannon-dark) 26%, var(--cannon) 56%, #87919c);
        transform-origin: 50% calc(100% - 12px);
        box-shadow: inset 0 12px 18px rgba(255, 255, 255, 0.12), inset 0 -14px 16px rgba(0, 0, 0, 0.22);
        z-index: 3;
      }


      .gun.cannon-mode .barrel-tip {
        top: -10px;
        width: clamp(48px, 7vmin, 66px);
        height: clamp(22px, 3.2vmin, 30px);
        border-width: 4px;
        background:
          radial-gradient(ellipse at 50% 50%, #11161b 0 34%, #343c46 35% 62%, #9099a3 63% 100%);
      }


      .gun.cannon-mode .gun-pivot {
        bottom: 56px;
      }


      .gun.cannon-mode .gun-body {
        bottom: 20px;
        width: clamp(126px, 19vmin, 168px);
        height: clamp(48px, 7vmin, 62px);
        border-radius: 22px 22px 14px 14px;
        background: linear-gradient(180deg, #677382, #343e49);
        z-index: 2;
      }


      .gun.cannon-mode .gun-body::before,
      .gun.cannon-mode .gun-body::after {
        content: "";
        position: absolute;
        top: 28px;
        width: clamp(42px, 6vmin, 56px);
        height: clamp(42px, 6vmin, 56px);
        border: 4px solid #17202a;
        border-radius: 50%;
        background:
          radial-gradient(circle, #17202a 0 16%, #c98442 17% 28%, var(--cannon-wheel) 29% 100%);
      }


      .gun.cannon-mode .gun-body::before {
        left: -2px;
        transform: none;
      }


      .gun.cannon-mode .gun-body::after {
        right: -2px;
      }


      .gun.cannon-mode .stand {
        bottom: 10px;
        width: clamp(110px, 17vmin, 152px);
        height: 22px;
        border: 4px solid #17202a;
        border-radius: 12px;
        background: linear-gradient(180deg, #8a5a35, #4f321d);
        z-index: 1;
      }


      @keyframes laser-fade {
        to {
          opacity: 0;
          transform: var(--laser-transform) scaleX(0.86);
        }
      }


      @keyframes spark-pop {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2.4);
        }
      }
:root{--laser: #ff294c;--laser-glow: rgba(255, 41, 76, 0.45);--barrel: #42515f;--barrel-dark: #202a33;--orange: #f18f01; }` });

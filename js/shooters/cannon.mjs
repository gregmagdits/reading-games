import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"cannon", label:"Cannon", icon:"●", scene:"cannon-scene", projectile:"cannon", pivot:".gun-pivot", aim:".barrel", lengthAxis:"height", lengthOffset:-2, verticalAim:true, artwork:`<div class="barrel"><div class="barrel-tip"></div></div><div class="gun-pivot"></div><div class="gun-body"></div><div class="stand"></div>`, style:`[data-shooter-root="cannon"]{position:absolute;inset:0}[data-shooter-root="cannon"][hidden]{display:none}
.arena.cannon-scene {
        background:
          radial-gradient(circle at 14% 15%, rgba(255, 244, 184, 0.86) 0 34px, rgba(255, 244, 184, 0) 35px),
          linear-gradient(180deg, #08213f 0%, #164b72 48%, #1f78a6 63%, #0f618d 64%, #07476e 100%);
      }


      .arena.cannon-scene .scene-visual {
        opacity: 0.92;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20780%20430%22%3E%3Cpath%20d%3D%22M0%20327C50%20306%20100%20306%20150%20327C200%20348%20250%20348%20300%20327C350%20306%20400%20306%20450%20327C500%20348%20550%20348%20600%20327C650%20306%20710%20306%20780%20329V430H0Z%22%20fill%3D%22%231976a3%22%2F%3E%3Cpath%20d%3D%22M0%20370C54%20352%20108%20352%20162%20370C216%20388%20270%20388%20324%20370C378%20352%20432%20352%20486%20370C540%20388%20594%20388%20648%20370C702%20352%20742%20354%20780%20370%22%20fill%3D%22none%22%20stroke%3D%22%23a7f3ff%22%20stroke-width%3D%229%22%20stroke-linecap%3D%22round%22%2F%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M174%20285C218%20342%20294%20370%20410%20370C526%20370%20620%20340%20656%20285Z%22%20fill%3D%22%237a4326%22%2F%3E%3Cpath%20d%3D%22M230%20285L206%20244H626L598%20285Z%22%20fill%3D%22%239b5a32%22%2F%3E%3Cpath%20d%3D%22M388%20285V88%22%20stroke%3D%22%233b2a1d%22%2F%3E%3Cpath%20d%3D%22M388%20105L502%20260H388Z%22%20fill%3D%22%23f4e3bd%22%2F%3E%3Cpath%20d%3D%22M382%20122L268%20260H382Z%22%20fill%3D%22%23fff0c9%22%2F%3E%3Cpath%20d%3D%22M388%2090L388%2050L464%2074L388%2096Z%22%20fill%3D%22%23171b20%22%2F%3E%3Cpath%20d%3D%22M520%20285V146%22%20stroke%3D%22%233b2a1d%22%2F%3E%3Cpath%20d%3D%22M520%20160L606%20260H520Z%22%20fill%3D%22%23f4e3bd%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%2317202a%22%3E%3Ccircle%20cx%3D%22292%22%20cy%3D%22318%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22356%22%20cy%3D%22326%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22420%22%20cy%3D%22326%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22484%22%20cy%3D%22318%22%20r%3D%2210%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M422%2072C434%2057%20450%2057%20462%2072C450%2087%20434%2087%20422%2072Z%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22442%22%20cy%3D%2272%22%20r%3D%226%22%20fill%3D%22%2317202a%22%2F%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 26px);
        background-size: min(740px, 96vw) auto;
      }


      .arena.cannon-scene .scene-visual::after {
        display: block;
        left: calc(50% - min(255px, 32vw));
        bottom: clamp(118px, 23vh, 190px);
        width: clamp(74px, 10vw, 122px);
        aspect-ratio: 150 / 210;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20150%20210%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M51%2092C43%20111%2039%20135%2042%20167H108C111%20135%20107%20111%2099%2092Z%22%20fill%3D%22%23b92f2f%22%2F%3E%3Cpath%20d%3D%22M50%20168H72V198H54Z%22%20fill%3D%22%2344302a%22%2F%3E%3Cpath%20d%3D%22M78%20168H100V198H82Z%22%20fill%3D%22%2344302a%22%2F%3E%3Cpath%20d%3D%22M45%20112L23%20142%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M105%20112L127%20142%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2275%22%20cy%3D%2263%22%20r%3D%2234%22%20fill%3D%22%23f0b47c%22%2F%3E%3Cpath%20d%3D%22M41%2055C52%2028%2096%2026%20111%2055C96%2048%2059%2048%2041%2055Z%22%20fill%3D%22%23171b20%22%2F%3E%3Cpath%20d%3D%22M38%2056H112C107%2070%2044%2070%2038%2056Z%22%20fill%3D%22%23171b20%22%2F%3E%3Cpath%20d%3D%22M51%2041C64%2024%2089%2024%20101%2041%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M49%2068H71%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M55%2068L68%2078%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M95%2068H101%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2297%22%20cy%3D%2267%22%20r%3D%223%22%20fill%3D%22%2317202a%22%2F%3E%3Cpath%20d%3D%22M61%2089C70%2096%2081%2096%2090%2089%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M41%2064L27%2080L44%2080%22%20fill%3D%22%23ffd166%22%2F%3E%3Cpath%20d%3D%22M47%2092H103L94%20111H56Z%22%20fill%3D%22%23ffffff%22%2F%3E%3Cpath%20d%3D%22M42%20132H108%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2275%22%20cy%3D%22122%22%20r%3D%225%22%20fill%3D%22%23ffd166%22%2F%3E%3Cpath%20d%3D%22M23%20142L16%20153%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M127%20142C137%20147%20137%20159%20126%20164%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M126%20164C117%20157%20118%20148%20127%20142%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M53%20198H34%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M83%20198H103%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      }


      .cannon-ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: radial-gradient(circle at 32% 28%, #818b96 0 12%, #3a4149 42%, #171b20 100%);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.32);
        animation: cannon-ball-flight 440ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .cannon-smoke {
        position: absolute;
        left: 0;
        top: 0;
        width: 32px;
        height: 24px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 35% 50%, rgba(255, 255, 255, 0.82) 0 34%, rgba(255, 255, 255, 0) 64%),
          radial-gradient(circle at 66% 48%, rgba(185, 193, 201, 0.72) 0 32%, rgba(185, 193, 201, 0) 66%);
        transform: translate(-50%, -50%);
        animation: cannon-smoke-puff 420ms ease-out forwards;
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


      @keyframes cannon-ball-flight {
        0% {
          opacity: 1;
          transform: translate(var(--ball-start-x), var(--ball-start-y)) translate(-50%, -50%) scale(1);
        }

        60% {
          transform: translate(var(--ball-mid-x), var(--ball-mid-y)) translate(-50%, -50%) scale(1.04);
        }

        100% {
          opacity: 0.96;
          transform: translate(var(--ball-end-x), var(--ball-end-y)) translate(-50%, -50%) scale(0.9);
        }
      }


      @keyframes cannon-smoke-puff {
        to {
          opacity: 0;
          filter: blur(1px);
          transform: translate(-50%, -50%) scale(2.2);
        }
      }
:root{--cannon: #515c68;--cannon-dark: #252d36;--cannon-wheel: #6f4628; }` });

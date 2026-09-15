import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"backpack", label:"Backpack", icon:"🎒", scene:"backpack-scene", projectile:"book", pivot:".backpack-pivot", aim:".backpack-launcher", lengthAxis:"width", lengthOffset:8, artwork:`<div class="backpack-figure"><div class="backpack-strap backpack-strap-left"></div><div class="backpack-strap backpack-strap-right"></div><div class="backpack-body"></div><div class="backpack-buckle"></div><div class="backpack-launcher"><div class="backpack-launcher-slot"></div><div class="backpack-ready-book"></div></div></div><div class="backpack-pivot"></div>`, style:`[data-shooter-root="backpack"]{position:absolute;inset:0}[data-shooter-root="backpack"][hidden]{display:none}
.arena.backpack-scene {
        background:
          radial-gradient(circle at 50% 18%, rgba(255, 246, 202, 0.96) 0 74px, rgba(255, 246, 202, 0) 75px),
          linear-gradient(180deg, #7a4a2e 0%, #b87a45 65%, #6a4128 66%, #3b281b 100%);
      }


      .arena.backpack-scene .scene-visual {
        opacity: 0.97;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20840%20460%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M0%20400H840V460H0Z%22%20fill%3D%22%23563825%22%2F%3E%3Cpath%20d%3D%22M24%2068H224V402H24ZM616%2068H816V402H616Z%22%20fill%3D%22%2372462b%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M38%20146H210M38%20226H210M38%20306H210M630%20146H802M630%20226H802M630%20306H802%22%20fill%3D%22none%22%20stroke%3D%22%23d39a5d%22%20stroke-width%3D%2210%22%2F%3E%3Cg%20stroke-width%3D%224%22%3E%3Cpath%20d%3D%22M50%2088H72V142H50ZM76%2096H101V142H76ZM105%2082H131V142H105ZM138%2092H163V142H138ZM168%2085H198V142H168Z%22%20fill%3D%22%23ef476f%22%2F%3E%3Cpath%20d%3D%22M48%20165H77V222H48ZM82%20176H106V222H82ZM112%20158H140V222H112ZM146%20170H176V222H146ZM181%20162H203V222H181Z%22%20fill%3D%22%2370d6ff%22%2F%3E%3Cpath%20d%3D%22M47%20245H72V302H47ZM78%20254H105V302H78ZM111%20239H138V302H111ZM144%20250H173V302H144ZM179%20242H204V302H179Z%22%20fill%3D%22%23ffd166%22%2F%3E%3Cpath%20d%3D%22M640%2082H665V142H640ZM671%2092H698V142H671ZM704%2085H730V142H704ZM737%2096H762V142H737ZM768%2080H794V142H768Z%22%20fill%3D%22%23a78bfa%22%2F%3E%3Cpath%20d%3D%22M638%20163H665V222H638ZM672%20175H699V222H672ZM705%20157H733V222H705ZM739%20169H765V222H739ZM772%20162H796V222H772Z%22%20fill%3D%22%237cff8e%22%2F%3E%3Cpath%20d%3D%22M638%20242H664V302H638ZM670%20253H697V302H670ZM703%20239H731V302H703ZM737%20250H764V302H737ZM770%20244H796V302H770Z%22%20fill%3D%22%23ff8c42%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M324%20195V116C324%2067%20516%2067%20516%20116V195Z%22%20fill%3D%22%23dceeff%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M420%2082V190M328%20152H512%22%20fill%3D%22none%22%20stroke%3D%22%237aa8c7%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M300%20340H540L565%20382H275Z%22%20fill%3D%22%23b97842%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M315%20382L300%20428M525%20382L540%20428%22%20fill%3D%22none%22%20stroke%3D%22%23563825%22%20stroke-width%3D%2213%22%2F%3E%3Cpath%20d%3D%22M346%20332L378%20286H462L494%20332Z%22%20fill%3D%22%23f4ead5%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M420%20288V329M378%20286C394%20298%20406%20304%20420%20308M462%20286C446%20298%20434%20304%20420%20308%22%20fill%3D%22none%22%20stroke%3D%22%23c7a76e%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 4px);
        background-size: min(840px, 100vw) auto;
      }


      .book-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 58px;
        height: 42px;
        border: 3px solid #17202a;
        border-radius: 5px 12px 12px 5px;
        background:
          linear-gradient(90deg, transparent 0 46%, rgba(23, 32, 42, 0.3) 47% 52%, transparent 53%),
          linear-gradient(135deg, #fff8dc, #f1deb1);
        box-shadow: 0 6px 10px rgba(23, 32, 42, 0.28);
        animation: book-flight 460ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .book-shot::before,
      .book-shot::after {
        content: "";
        position: absolute;
        top: 7px;
        width: 18px;
        height: 3px;
        border-radius: 999px;
        background: #c7a76e;
        box-shadow: 0 8px 0 #c7a76e, 0 16px 0 #c7a76e;
      }


      .book-shot::before {
        left: 6px;
      }


      .book-shot::after {
        right: 6px;
      }


      .book-page-burst {
        position: absolute;
        left: 0;
        top: 0;
        width: 46px;
        height: 34px;
        background:
          linear-gradient(35deg, transparent 0 42%, #fff8dc 43% 56%, transparent 57%),
          linear-gradient(145deg, transparent 0 42%, #fff8dc 43% 56%, transparent 57%);
        filter: drop-shadow(0 2px 0 #17202a);
        transform: translate(-50%, -50%);
        animation: book-page-burst 360ms ease-out forwards;
      }


      .backpack-figure {
        position: absolute;
        left: 50%;
        bottom: 2px;
        width: clamp(138px, 20vmin, 184px);
        height: clamp(142px, 21vmin, 192px);
        transform: translateX(-50%);
        z-index: 4;
      }


      .backpack-body {
        position: absolute;
        left: 50%;
        bottom: 4px;
        width: 112px;
        height: 136px;
        border: 5px solid #17202a;
        border-radius: 44px 44px 24px 24px;
        background:
          radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.3) 0 12%, transparent 13%),
          linear-gradient(145deg, #58a9e2, var(--backpack-blue) 52%, var(--backpack-dark));
        transform: translateX(-50%);
        box-shadow: inset 0 -12px 0 rgba(23, 32, 42, 0.12), 0 10px 0 rgba(23, 32, 42, 0.14);
      }


      .backpack-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -24px;
        width: 48px;
        height: 34px;
        border: 7px solid #17202a;
        border-bottom: 0;
        border-radius: 28px 28px 0 0;
        transform: translateX(-50%);
      }


      .backpack-body::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 13px;
        width: 82px;
        height: 52px;
        border: 4px solid #17202a;
        border-radius: 22px 22px 16px 16px;
        background: linear-gradient(180deg, #ff8c42, #d85b20);
        transform: translateX(-50%);
      }


      .backpack-strap {
        position: absolute;
        top: 38px;
        width: 30px;
        height: 106px;
        border: 7px solid #17202a;
        border-radius: 999px;
        z-index: -1;
      }


      .backpack-strap-left {
        left: 3px;
        transform: rotate(13deg);
      }


      .backpack-strap-right {
        right: 3px;
        transform: rotate(-13deg);
      }


      .backpack-buckle {
        position: absolute;
        left: 50%;
        bottom: 43px;
        width: 24px;
        height: 18px;
        border: 4px solid #17202a;
        border-radius: 5px;
        background: var(--book-gold);
        transform: translateX(-50%);
        z-index: 3;
      }


      .backpack-launcher {
        position: absolute;
        left: calc(50% + 2px);
        bottom: 116px;
        width: clamp(104px, 15vmin, 138px);
        height: 42px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 13px 50%;
        z-index: 6;
      }


      .backpack-launcher-slot {
        position: absolute;
        left: 0;
        top: 5px;
        width: 62px;
        height: 32px;
        border: 4px solid #17202a;
        border-radius: 14px 8px 8px 14px;
        background: linear-gradient(180deg, var(--backpack-dark), #132f49);
      }


      .backpack-ready-book {
        position: absolute;
        left: 42px;
        top: 1px;
        width: 70px;
        height: 40px;
        border: 4px solid #17202a;
        border-radius: 5px 12px 12px 5px;
        background:
          linear-gradient(90deg, transparent 0 47%, rgba(23, 32, 42, 0.3) 48% 52%, transparent 53%),
          linear-gradient(135deg, #fff8dc, #eed79e);
        box-shadow: 7px 5px 0 #ef476f;
      }


      .backpack-ready-book::after {
        content: "ABC";
        position: absolute;
        left: 50%;
        top: 50%;
        color: #8b5a2b;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 5px;
        transform: translate(-44%, -50%);
      }


      .backpack-pivot {
        position: absolute;
        left: calc(50% + 15px);
        bottom: 116px;
        width: 1px;
        height: 1px;
      }


      @keyframes book-flight {
        0% {
          opacity: 1;
          transform: var(--book-start-transform) rotate(-0.08turn) scale(0.78);
        }

        52% {
          transform: var(--book-mid-transform) rotate(0.36turn) scale(1.08);
        }

        100% {
          opacity: 0.98;
          transform: var(--book-end-transform) rotate(0.75turn) scale(1);
        }
      }


      @keyframes book-page-burst {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.9) rotate(28deg);
        }
      }
:root{--backpack-blue: #3b82c4;--backpack-dark: #1f4f7a;--book-gold: #ffd166; }` });

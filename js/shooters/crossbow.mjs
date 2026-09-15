import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"crossbow", label:"Crossbow", icon:"✚", scene:"crossbow-scene", projectile:"crossbow", pivot:".crossbow-pivot", aim:".crossbow-arm", lengthAxis:"width", lengthOffset:10, artwork:`<div class="crossbow-figure"><div class="knight-head"></div><div class="knight-body"></div><div class="crossbow-arm"><div class="knight-sleeve"></div><div class="knight-hand"></div><div class="crossbow-weapon"><div class="crossbow-ready-bolt"></div></div></div></div><div class="crossbow-pivot"></div>`, style:`[data-shooter-root="crossbow"]{position:absolute;inset:0}[data-shooter-root="crossbow"][hidden]{display:none}
.arena.crossbow-scene {
        background:
          radial-gradient(circle at 16% 14%, rgba(255, 244, 184, 0.88) 0 35px, rgba(255, 244, 184, 0) 36px),
          radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.86) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 52% 10%, rgba(255, 255, 255, 0.72) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 78% 19%, rgba(255, 255, 255, 0.82) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #0c1830 0%, #173d61 55%, #496a73 76%, #224b36 100%);
      }


      .arena.crossbow-scene .scene-visual {
        opacity: 0.94;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20820%20430%22%3E%0A%20%20%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%20372C84%20342%20170%20346%20246%20372C330%20344%20438%20346%20528%20372C626%20340%20724%20346%20820%20372V430H0Z%22%20fill%3D%22%232f5f45%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M168%20368V202H252V368Z%22%20fill%3D%22%239aa7b6%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M568%20368V202H652V368Z%22%20fill%3D%22%239aa7b6%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M252%20368V160H568V368Z%22%20fill%3D%22%23c0cad4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M202%20202V136H226V164H252V136H276V202Z%22%20fill%3D%22%23d7dee7%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M544%20202V136H568V164H594V136H618V202Z%22%20fill%3D%22%23d7dee7%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M292%20160V104H320V130H350V104H378V160Z%22%20fill%3D%22%23e1e7ee%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M442%20160V104H470V130H500V104H528V160Z%22%20fill%3D%22%23e1e7ee%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M348%20368V270C348%20232%20472%20232%20472%20270V368Z%22%20fill%3D%22%235f3a28%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M384%20368V282C384%20266%20436%20266%20436%20282V368Z%22%20fill%3D%22%233b251b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M168%20202H252M568%20202H652M252%20160H568%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M410%20104V48%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M410%2050L506%2074L410%2098Z%22%20fill%3D%22%23d62828%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M410%2074H490%22%20fill%3D%22none%22%20stroke%3D%22%23ffd166%22%20stroke-width%3D%225%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M544%20314C572%20274%20636%20270%20676%20310L713%20318C724%20328%20724%20346%20710%20356L664%20354L646%20378H616L623%20350H574L560%20378H532L542%20344C524%20336%20523%20324%20544%20314Z%22%20fill%3D%22%237b8794%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M570%20300C602%20278%20638%20281%20662%20306L640%20334H574Z%22%20fill%3D%22%23d7dde7%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M676%20310L714%20292C730%20298%20737%20312%20733%20330L713%20318Z%22%20fill%3D%22%238a5a35%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M706%20296L724%20286%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22707%22%20cy%3D%22309%22%20r%3D%224%22%20fill%3D%22%2317202a%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M592%20332H646%22%20fill%3D%22none%22%20stroke%3D%22%23f6c445%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M558%20350L548%20390H574L588%20350%22%20fill%3D%22%23525f6b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M638%20350L648%20390H674L662%20350%22%20fill%3D%22%23525f6b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M584%20284L576%20260M624%20280L622%20254%22%20fill%3D%22none%22%20stroke%3D%22%23d7dde7%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M526%20330C508%20330%20496%20322%20486%20309%22%20fill%3D%22none%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E");
        background-position: center calc(100% - 28px);
        background-size: min(820px, 98vw) auto;
      }


      .crossbow-bolt-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 78px;
        height: 16px;
        animation: arrow-flight 320ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
        filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.3));
      }


      .crossbow-bolt-shot::before {
        content: "";
        position: absolute;
        left: 4px;
        top: 50%;
        width: 58px;
        height: 5px;
        border: 2px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(90deg, #d6a23a, #5b341f);
        transform: translateY(-50%);
      }


      .crossbow-bolt-shot::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 18px solid #cbd5e1;
        transform: translateY(-50%);
      }


      .crossbow-bolt-tail {
        position: absolute;
        left: 0;
        top: 50%;
        width: 16px;
        height: 16px;
        background:
          linear-gradient(135deg, transparent 0 42%, #d62828 43% 100%),
          linear-gradient(45deg, transparent 0 42%, #ffd166 43% 100%);
        transform: translateY(-50%);
      }


      .crossbow-figure {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(142px, 21vmin, 190px);
        height: clamp(154px, 23vmin, 204px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .knight-head {
        position: absolute;
        left: 50%;
        bottom: 96px;
        width: clamp(48px, 7vmin, 64px);
        height: clamp(48px, 7vmin, 64px);
        border: 4px solid #17202a;
        border-radius: 50% 50% 44% 44%;
        background: linear-gradient(180deg, #f8fafc, var(--knight-steel));
        transform: translateX(-50%);
        z-index: 5;
      }


      .knight-head::before {
        content: "";
        position: absolute;
        left: 18%;
        right: 18%;
        top: 42%;
        height: 9px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: #273243;
      }


      .knight-head::after {
        content: "";
        position: absolute;
        left: 50%;
        top: -22px;
        width: 18px;
        height: 34px;
        border: 3px solid #17202a;
        border-radius: 999px 999px 4px 4px;
        background: linear-gradient(180deg, #d62828, #ffd166);
        transform: translateX(-50%) rotate(-6deg);
      }


      .knight-body {
        position: absolute;
        left: 50%;
        bottom: 28px;
        width: clamp(78px, 11vmin, 106px);
        height: clamp(86px, 13vmin, 116px);
        border: 4px solid #17202a;
        border-radius: 28px 28px 12px 12px;
        background:
          linear-gradient(135deg, transparent 0 45%, #d62828 46% 56%, transparent 57% 100%),
          linear-gradient(180deg, #f8fafc, var(--knight-steel) 62%, var(--knight-dark));
        transform: translateX(-50%);
        z-index: 2;
      }


      .knight-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 54%;
        width: 56%;
        height: 40%;
        border: 3px solid #17202a;
        border-radius: 0 0 24px 24px;
        background: linear-gradient(180deg, #d62828 0 45%, #ffd166 46% 55%, #d62828 56% 100%);
        transform: translate(-50%, -50%);
      }


      .knight-body::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -22px;
        width: 112%;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 10px;
        background: linear-gradient(90deg, var(--knight-dark) 0 45%, #17202a 46% 54%, var(--knight-dark) 55% 100%);
        transform: translateX(-50%);
      }


      .crossbow-arm {
        position: absolute;
        left: calc(50% + 5px);
        bottom: 96px;
        width: clamp(128px, 19vmin, 174px);
        height: 34px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 14px 50%;
        z-index: 7;
      }


      .knight-sleeve {
        position: absolute;
        left: 0;
        top: 6px;
        width: 56px;
        height: 22px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, var(--knight-steel), var(--knight-dark));
      }


      .knight-hand {
        position: absolute;
        left: 44px;
        top: 4px;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background: var(--skin);
        z-index: 4;
      }


      .crossbow-weapon {
        position: absolute;
        left: 60px;
        top: 8px;
        width: 96px;
        height: 18px;
        border: 3px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(180deg, #c98442, var(--crossbow-wood));
        z-index: 3;
      }


      .crossbow-weapon::before {
        content: "";
        position: absolute;
        left: 30px;
        top: 50%;
        width: 62px;
        height: 58px;
        border: 7px solid var(--crossbow-dark);
        border-left: 0;
        border-radius: 0 999px 999px 0;
        transform: translateY(-50%);
      }


      .crossbow-weapon::after {
        content: "";
        position: absolute;
        left: 20px;
        top: 50%;
        width: 70px;
        height: 4px;
        border-radius: 999px;
        background: #f8edc8;
        box-shadow: 0 0 0 2px rgba(23, 32, 42, 0.18);
        transform: translateY(-50%);
      }


      .crossbow-ready-bolt {
        position: absolute;
        left: 92px;
        top: 50%;
        width: 48px;
        height: 5px;
        border: 2px solid #17202a;
        border-radius: 999px;
        background: linear-gradient(90deg, #d6a23a, #5b341f);
        transform: translateY(-50%);
        z-index: 4;
      }


      .crossbow-ready-bolt::before {
        content: "";
        position: absolute;
        right: -16px;
        top: 50%;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 16px solid var(--knight-steel);
        transform: translateY(-50%);
      }


      .crossbow-pivot {
        position: absolute;
        left: calc(50% + 19px);
        bottom: 96px;
        width: 1px;
        height: 1px;
      }
:root{--crossbow-wood: #8a5a35;--crossbow-dark: #4a2f1d;--knight-steel: #cbd5e1;--knight-dark: #64748b; }` });

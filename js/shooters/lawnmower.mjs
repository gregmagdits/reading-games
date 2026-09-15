import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"lawnmower", label:"Mower", icon:"✺", scene:"lawnmower-scene", projectile:"sawblade", pivot:".lawnmower-pivot", aim:".mower-chute", lengthAxis:"width", lengthOffset:10, artwork:`<div class="lawnmower-vehicle"><div class="mower-handle"></div><div class="mower-chute"></div><div class="mower-body"></div><div class="mower-deck-blade"></div><div class="mower-wheel mower-wheel-left"></div><div class="mower-wheel mower-wheel-right"></div></div><div class="lawnmower-pivot"></div>`, style:`[data-shooter-root="lawnmower"]{position:absolute;inset:0}[data-shooter-root="lawnmower"][hidden]{display:none}
.arena.lawnmower-scene {
        background:
          radial-gradient(circle at 16% 14%, rgba(255, 244, 184, 0.86) 0 34px, rgba(255, 244, 184, 0) 35px),
          radial-gradient(circle at 32% 17%, rgba(255, 255, 255, 0.78) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 52% 9%, rgba(255, 255, 255, 0.62) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 80% 19%, rgba(255, 255, 255, 0.72) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #092044 0%, #244f75 54%, #466f52 75%, #2f7d3a 76%, #18562d 100%);
      }


      .arena.lawnmower-scene .scene-visual {
        opacity: 0.92;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20780%20430%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M0%20346C78%20320%20156%20322%20234%20346C318%20318%20412%20320%20496%20346C598%20318%20686%20322%20780%20346V430H0Z%22%20fill%3D%22%232c7a3f%22%2F%3E%3Cpath%20d%3D%22M76%20350H704%22%20stroke%3D%22%2385c75a%22%20stroke-width%3D%226%22%20opacity%3D%22.65%22%2F%3E%3Cpath%20d%3D%22M132%20338L220%2088H560L648%20338%22%20fill%3D%22none%22%20stroke%3D%22%238a5a35%22%20stroke-width%3D%2215%22%2F%3E%3Cpath%20d%3D%22M204%2088H576%22%20fill%3D%22none%22%20stroke%3D%22%239b6a3c%22%20stroke-width%3D%2218%22%2F%3E%3Cpath%20d%3D%22M304%2098V230M476%2098V230%22%20fill%3D%22none%22%20stroke%3D%22%23e8e1cf%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M280%20230H328V254H280Z%22%20fill%3D%22%23ef476f%22%2F%3E%3Cpath%20d%3D%22M452%20230H500V254H452Z%22%20fill%3D%22%2370d6ff%22%2F%3E%3Cpath%20d%3D%22M160%20330H620%22%20stroke%3D%22%2352a447%22%20stroke-width%3D%2218%22%2F%3E%3Cpath%20d%3D%22M98%20282C132%20244%20188%20242%20226%20282Z%22%20fill%3D%22%233b7a45%22%2F%3E%3Cpath%20d%3D%22M586%20288C626%20242%20692%20242%20728%20288Z%22%20fill%3D%22%233b7a45%22%2F%3E%3Cpath%20d%3D%22M120%20292C132%20268%20158%20254%20184%20254%22%20fill%3D%22none%22%20stroke%3D%22%2385c75a%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M610%20298C626%20270%20656%20256%20688%20258%22%20fill%3D%22none%22%20stroke%3D%22%2385c75a%22%20stroke-width%3D%225%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center calc(100% - 26px);
        background-size: min(780px, 98vw) auto;
      }


      .sawblade-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 38px;
        height: 38px;
        border: 3px solid #17202a;
        border-radius: 50%;
        background:
          radial-gradient(circle, #17202a 0 10%, #f8fafc 11% 18%, rgba(248, 250, 252, 0) 19%),
          conic-gradient(from 0deg, #d7dde7 0 18deg, #7b8794 18deg 36deg, #f8fafc 36deg 54deg, #7b8794 54deg 72deg, #d7dde7 72deg 90deg);
        clip-path: polygon(50% 0, 58% 20%, 79% 9%, 75% 32%, 98% 38%, 80% 53%, 94% 72%, 70% 73%, 68% 97%, 50% 82%, 32% 97%, 30% 73%, 6% 72%, 20% 53%, 2% 38%, 25% 32%, 21% 9%, 42% 20%);
        filter: drop-shadow(0 0 0 #17202a) drop-shadow(0 6px 9px rgba(0, 0, 0, 0.32));
        animation: sawblade-flight 360ms cubic-bezier(0.18, 0.72, 0.28, 1) forwards;
      }


      .lawnmower-vehicle {
        position: absolute;
        left: 50%;
        bottom: 4px;
        width: clamp(156px, 22vmin, 212px);
        height: clamp(98px, 14vmin, 136px);
        transform: translateX(-50%);
        z-index: 3;
      }


      .mower-body {
        position: absolute;
        left: 50%;
        bottom: 24px;
        width: 74%;
        height: 48%;
        border: 4px solid #17202a;
        border-radius: 28px 36px 16px 16px;
        background:
          radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.34) 0 12%, rgba(255, 255, 255, 0) 13%),
          linear-gradient(180deg, var(--mower-green), var(--mower-dark));
        transform: translateX(-50%);
        box-shadow: inset 0 -10px 0 rgba(0, 0, 0, 0.14);
      }


      .mower-body::before {
        content: "";
        position: absolute;
        left: 16%;
        top: -24px;
        width: 40px;
        height: 30px;
        border: 4px solid #17202a;
        border-radius: 10px 10px 4px 4px;
        background: linear-gradient(180deg, #f8fafc, #aeb8c4);
      }


      .mower-body::after {
        content: "";
        position: absolute;
        right: 13%;
        top: -20px;
        width: 34px;
        height: 28px;
        border: 4px solid #17202a;
        border-radius: 8px;
        background: linear-gradient(180deg, var(--mower-red), #9f1f2d);
      }


      .mower-handle {
        position: absolute;
        left: 24px;
        bottom: 64px;
        width: 78px;
        height: 74px;
        border: 7px solid #17202a;
        border-right: 0;
        border-bottom: 0;
        border-radius: 26px 0 0 0;
        transform: rotate(-27deg);
        transform-origin: 100% 100%;
      }


      .mower-wheel {
        position: absolute;
        bottom: 8px;
        width: 36px;
        height: 36px;
        border: 5px solid #17202a;
        border-radius: 50%;
        background:
          radial-gradient(circle, #f8fafc 0 18%, #17202a 19% 28%, #4b5563 29% 100%);
      }


      .mower-wheel-left {
        left: 30px;
      }


      .mower-wheel-right {
        right: 28px;
      }


      .mower-chute {
        position: absolute;
        left: calc(50% + 16px);
        bottom: 58px;
        width: clamp(82px, 12vmin, 116px);
        height: 28px;
        transform: translateY(-50%) rotate(0rad);
        transform-origin: 8px 50%;
        z-index: 5;
      }


      .mower-chute::before {
        content: "";
        position: absolute;
        left: 0;
        top: 6px;
        width: 86%;
        height: 16px;
        border: 3px solid #17202a;
        border-radius: 999px 14px 14px 999px;
        background: linear-gradient(180deg, #d7dde7, #7b8794);
      }


      .mower-chute::after {
        content: "";
        position: absolute;
        right: -2px;
        top: 2px;
        width: 24px;
        height: 24px;
        border: 3px solid #17202a;
        border-radius: 8px;
        background: linear-gradient(180deg, #f8fafc, #9ca3af);
        transform: rotate(45deg);
      }


      .mower-deck-blade {
        position: absolute;
        left: 50%;
        bottom: 34px;
        width: 42px;
        height: 42px;
        border: 4px solid #17202a;
        border-radius: 50%;
        background:
          radial-gradient(circle, #17202a 0 14%, #f8fafc 15% 24%, rgba(248, 250, 252, 0) 25%),
          conic-gradient(#d7dde7 0 15deg, #7b8794 15deg 30deg, #f8fafc 30deg 45deg, #7b8794 45deg 60deg, #d7dde7 60deg 75deg, #7b8794 75deg 90deg);
        clip-path: polygon(50% 0, 60% 30%, 95% 18%, 70% 50%, 95% 82%, 60% 70%, 50% 100%, 40% 70%, 5% 82%, 30% 50%, 5% 18%, 40% 30%);
        transform: translateX(-50%);
      }


      .lawnmower-pivot {
        position: absolute;
        left: calc(50% + 24px);
        bottom: 58px;
        width: 1px;
        height: 1px;
      }


      @keyframes sawblade-flight {
        0% {
          opacity: 1;
          transform: var(--sawblade-start-transform) rotate(0turn) scale(0.82);
        }

        100% {
          opacity: 0.96;
          transform: var(--sawblade-end-transform) rotate(3turn) scale(1);
        }
      }
:root{--mower-green: #4f9d45;--mower-dark: #2e6b34;--mower-red: #e63946; }` });

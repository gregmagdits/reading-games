import { defineShooter } from "../shooter-tools.mjs";
export default defineShooter({ id:"rocket", label:"Rocket", icon:"🚀", scene:"rocket-scene", projectile:"rocket", pivot:".rocket-pivot", aim:".rocket-vehicle", lengthAxis:"height", lengthOffset:-10, verticalAim:true, artwork:`<div class="rocket-vehicle"><div class="rocket-body"></div><div class="rocket-window"></div><div class="rocket-stripe"></div><div class="rocket-fin rocket-fin-left"></div><div class="rocket-fin rocket-fin-right"></div><div class="rocket-flame"></div></div><div class="rocket-pivot"></div><div class="launch-pad"></div>`, style:`[data-shooter-root="rocket"]{position:absolute;inset:0}[data-shooter-root="rocket"][hidden]{display:none}
.arena.rocket-scene {
        background:
          radial-gradient(circle at 18% 28%, rgba(255, 210, 128, 0.96) 0 72px, rgba(244, 136, 84, 0.92) 73px 104px, rgba(244, 136, 84, 0) 105px),
          radial-gradient(circle at 14% 21%, rgba(255, 248, 208, 0.72) 0 16px, rgba(255, 248, 208, 0) 17px),
          radial-gradient(circle at 33% 11%, rgba(255, 255, 255, 0.92) 0 2px, rgba(255, 255, 255, 0) 3px),
          radial-gradient(circle at 58% 18%, rgba(255, 255, 255, 0.86) 0 1px, rgba(255, 255, 255, 0) 2px),
          radial-gradient(circle at 82% 9%, rgba(255, 255, 255, 0.88) 0 2px, rgba(255, 255, 255, 0) 3px),
          linear-gradient(180deg, #030817 0%, #081b3d 58%, #102d4f 82%, #1d293a 100%);
      }


      .arena.rocket-scene .scene-visual::before {
        display: block;
        right: clamp(18px, 7vw, 118px);
        top: clamp(50px, 11vh, 98px);
        width: min(420px, 48vw);
        aspect-ratio: 620 / 230;
        opacity: 0.88;
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20620%20230%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M228%2092H392V138H228Z%22%20fill%3D%22%23dce7f1%22%2F%3E%3Cpath%20d%3D%22M286%2072H334V158H286Z%22%20fill%3D%22%23ffffff%22%2F%3E%3Cpath%20d%3D%22M116%20102H228V128H116Z%22%20fill%3D%22%239fb4c8%22%2F%3E%3Cpath%20d%3D%22M392%20102H504V128H392Z%22%20fill%3D%22%239fb4c8%22%2F%3E%3Cpath%20d%3D%22M38%2055H112V174H38Z%22%20fill%3D%22%234cc9f0%22%2F%3E%3Cpath%20d%3D%22M508%2055H582V174H508Z%22%20fill%3D%22%234cc9f0%22%2F%3E%3Cpath%20d%3D%22M112%2072H152V158H112Z%22%20fill%3D%22%2368e1fd%22%2F%3E%3Cpath%20d%3D%22M468%2072H508V158H468Z%22%20fill%3D%22%2368e1fd%22%2F%3E%3Cpath%20d%3D%22M308%2038V72M308%20158V192%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%22308%22%20cy%3D%22115%22%20r%3D%2222%22%20fill%3D%22%23f7f9ff%22%2F%3E%3Cpath%20d%3D%22M55%2088H95M55%20122H95M55%20156H95M525%2088H565M525%20122H565M525%20156H565%22%20fill%3D%22none%22%20stroke%3D%22%23e8fbff%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M258%2092L226%2058M362%2092L396%2058M258%20138L226%20174M362%20138L396%20174%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      }


      .rocket-shot {
        position: absolute;
        left: 0;
        top: 0;
        width: 44px;
        height: 66px;
        background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20108%20160%22%3E%3Cg%20stroke%3D%22%2317202a%22%20stroke-width%3D%225%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M54%208C31%2030%2024%2062%2028%20109H80C84%2062%2077%2030%2054%208Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M28%20109L12%20142L38%20130L42%20109Z%22%20fill%3D%22%23ef476f%22%2F%3E%3Cpath%20d%3D%22M80%20109L96%20142L70%20130L66%20109Z%22%20fill%3D%22%23ef476f%22%2F%3E%3Cpath%20d%3D%22M33%2080H75V111H33Z%22%20fill%3D%22%23d62828%22%2F%3E%3Ccircle%20cx%3D%2254%22%20cy%3D%2258%22%20r%3D%2217%22%20fill%3D%22%2370d6ff%22%2F%3E%3Cpath%20d%3D%22M42%20126L54%20154L66%20126Z%22%20fill%3D%22%23ff7a1a%22%2F%3E%3Cpath%20d%3D%22M48%20129L54%20148L60%20129Z%22%20fill%3D%22%23ffef6e%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") center / contain no-repeat;
        animation: rocket-flight 520ms cubic-bezier(0.16, 0.78, 0.22, 1) forwards;
        filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.32));
      }


      .rocket-trail {
        position: absolute;
        left: 0;
        top: 0;
        height: 18px;
        border-radius: 999px;
        background: linear-gradient(90deg, rgba(255, 239, 110, 0.94), rgba(255, 122, 26, 0.65), rgba(255, 122, 26, 0));
        box-shadow: 0 0 18px rgba(255, 122, 26, 0.58);
        transform-origin: 0 50%;
        animation: rocket-trail-fade 430ms ease-out forwards;
      }


      .rocket-vehicle {
        position: absolute;
        left: 50%;
        bottom: 38px;
        width: clamp(58px, 8.5vmin, 82px);
        height: clamp(106px, 16vmin, 144px);
        transform: translateX(-50%) rotate(0rad);
        transform-origin: 50% calc(100% - 12px);
        z-index: 3;
      }


      .rocket-body {
        position: absolute;
        left: 50%;
        top: 0;
        width: 62%;
        height: 74%;
        border: 4px solid #17202a;
        border-radius: 50% 50% 24% 24%;
        background: linear-gradient(90deg, #dce7f1, #ffffff 48%, #c7d2df);
        transform: translateX(-50%);
      }


      .rocket-body::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -3px;
        width: 74%;
        height: 30%;
        border-radius: 60% 60% 24% 24%;
        background: var(--rocket-red);
        transform: translateX(-50%);
      }


      .rocket-window {
        position: absolute;
        left: 50%;
        top: 31%;
        width: 24px;
        height: 24px;
        border: 4px solid #17202a;
        border-radius: 50%;
        background: radial-gradient(circle at 34% 32%, #ffffff 0 18%, var(--rocket-blue) 19% 100%);
        transform: translateX(-50%);
      }


      .rocket-stripe {
        position: absolute;
        left: 50%;
        bottom: 28%;
        width: 58%;
        height: 18px;
        border: 3px solid #17202a;
        background: #d62828;
        transform: translateX(-50%);
      }


      .rocket-fin {
        position: absolute;
        bottom: 18%;
        width: 28px;
        height: 40px;
        border: 4px solid #17202a;
        background: var(--rocket-red);
      }


      .rocket-fin-left {
        left: 0;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
      }


      .rocket-fin-right {
        right: 0;
        clip-path: polygon(0 0, 100% 100%, 0 100%);
      }


      .rocket-flame {
        position: absolute;
        left: 50%;
        bottom: -8px;
        width: 24px;
        height: 42px;
        border-radius: 50% 50% 58% 58%;
        background: linear-gradient(180deg, #ffef6e, #ff7a1a 62%, rgba(255, 122, 26, 0));
        transform: translateX(-50%);
        filter: drop-shadow(0 0 10px rgba(255, 122, 26, 0.78));
      }


      .rocket-pivot {
        position: absolute;
        left: 50%;
        bottom: 50px;
        width: 1px;
        height: 1px;
      }


      .launch-pad {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: clamp(118px, 18vmin, 168px);
        height: 48px;
        border: 4px solid #17202a;
        border-radius: 8px 8px 0 0;
        background: linear-gradient(180deg, #6b7280, #374151);
        transform: translateX(-50%);
        z-index: 1;
      }


      .launch-pad::before,
      .launch-pad::after {
        content: "";
        position: absolute;
        bottom: 42px;
        width: 16px;
        height: 88px;
        border: 3px solid #17202a;
        background: repeating-linear-gradient(180deg, #a7b3c2 0 12px, #64748b 12px 24px);
      }


      .launch-pad::before {
        left: 18px;
      }


      .launch-pad::after {
        right: 18px;
      }


      @keyframes rocket-flight {
        0% {
          opacity: 1;
          transform: translate(var(--rocket-start-x), var(--rocket-start-y)) translate(-50%, -50%) rotate(var(--rocket-rotation)) scale(0.86);
        }

        58% {
          transform: translate(var(--rocket-mid-x), var(--rocket-mid-y)) translate(-50%, -50%) rotate(var(--rocket-rotation)) scale(1);
        }

        100% {
          opacity: 0.98;
          transform: translate(var(--rocket-end-x), var(--rocket-end-y)) translate(-50%, -50%) rotate(var(--rocket-rotation)) scale(0.92);
        }
      }


      @keyframes rocket-trail-fade {
        to {
          opacity: 0;
          filter: blur(1px);
          transform: var(--rocket-trail-transform) scaleX(0.82);
        }
      }
:root{--rocket-red: #ef476f;--rocket-blue: #70d6ff; }` });

const injectedStyles = new Set();

export function injectStyleOnce(id, css, documentRef) {
  if (!css || injectedStyles.has(id)) return;
  const style = documentRef.createElement("style");
  style.dataset.shooterStyle = id;
  style.textContent = css;
  documentRef.head.appendChild(style);
  injectedStyles.add(id);
}

export function centerOf(element) {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function tipFrom(pivot, aim, length) {
  const angle = Math.atan2(aim.y - pivot.y, aim.x - pivot.x);
  return { x: pivot.x + Math.cos(angle) * length, y: pivot.y + Math.sin(angle) * length };
}

function add(layer, documentRef, className, styles = {}, properties = {}) {
  const element = documentRef.createElement("div");
  element.className = className;
  Object.assign(element.style, styles);
  for (const [name, value] of Object.entries(properties)) element.style.setProperty(name, value);
  layer.appendChild(element);
  return element;
}

function removeAfter(timer, delay, ...elements) {
  timer(() => elements.forEach((element) => element.remove()), delay);
}

export function fireProjectile(kind, { aim, tip, pivot, layer, documentRef, randomInt, timer }) {
  const angle = Math.atan2(aim.y - tip.y, aim.x - tip.x);
  const distance = Math.hypot(aim.x - tip.x, aim.y - tip.y);
  const start = `translate(${tip.x}px, ${tip.y}px) translate(-50%, -50%)`;
  const end = `translate(${aim.x}px, ${aim.y}px) translate(-50%, -50%)`;
  if (kind === "laser") {
    const transform = `translate(${tip.x}px, ${tip.y}px) rotate(${angle}rad)`;
    const shot = add(layer, documentRef, "laser-shot", { width: `${distance}px`, transform }, { "--laser-transform": transform });
    const spark = add(layer, documentRef, "spark", { left: `${aim.x}px`, top: `${aim.y}px` });
    removeAfter(timer, 280, shot, spark); return;
  }
  if (kind === "fire") {
    const transform = `translate(${tip.x}px, ${tip.y - 17}px) rotate(${angle}rad)`;
    const flame = add(layer, documentRef, "fire-shot", { width: `${Math.max(48, distance)}px`, transform }, { "--fire-transform": transform });
    for (let index = 0; index < 8; index += 1) {
      const ember = add(layer, documentRef, "ember", { left: `${aim.x + randomInt(-10, 10)}px`, top: `${aim.y + randomInt(-10, 10)}px` }, { "--ember-x": `${randomInt(-38, 38)}px`, "--ember-y": `${randomInt(-42, 28)}px` });
      removeAfter(timer, 390, ember);
    }
    removeAfter(timer, 300, flame); return;
  }
  if (kind === "cannon") {
    const arc = Math.min(96, Math.max(28, distance * 0.18));
    const ball = add(layer, documentRef, "cannon-ball", {}, { "--ball-start-x": `${tip.x}px`, "--ball-start-y": `${tip.y}px`, "--ball-mid-x": `${(tip.x + aim.x) / 2}px`, "--ball-mid-y": `${(tip.y + aim.y) / 2 - arc}px`, "--ball-end-x": `${aim.x}px`, "--ball-end-y": `${aim.y}px` });
    const smoke = add(layer, documentRef, "cannon-smoke", { left: `${tip.x}px`, top: `${tip.y}px` });
    timer(() => removeAfter(timer, 430, add(layer, documentRef, "cannon-smoke", { left: `${aim.x}px`, top: `${aim.y}px` })), 330);
    removeAfter(timer, 470, ball, smoke); return;
  }
  if (kind === "rocket") {
    const arc = Math.min(120, Math.max(36, distance * 0.16));
    const rocket = add(layer, documentRef, "rocket-shot", {}, { "--rocket-start-x": `${tip.x}px`, "--rocket-start-y": `${tip.y}px`, "--rocket-mid-x": `${(tip.x + aim.x) / 2}px`, "--rocket-mid-y": `${(tip.y + aim.y) / 2 - arc}px`, "--rocket-end-x": `${aim.x}px`, "--rocket-end-y": `${aim.y}px`, "--rocket-rotation": `${angle + Math.PI / 2}rad` });
    const transform = `translate(${pivot.x}px, ${pivot.y}px) rotate(${angle}rad)`;
    const trail = add(layer, documentRef, "rocket-trail", { width: `${Math.max(58, distance * .8)}px`, transform }, { "--rocket-trail-transform": transform });
    removeAfter(timer, 540, rocket, trail); return;
  }
  const straight = {
    arrow: ["arrow-shot", "--arrow-start-transform", "--arrow-end-transform", 380],
    crossbow: ["crossbow-bolt-shot", "--arrow-start-transform", "--arrow-end-transform", 340],
    bullet: ["bullet-shot", "--bullet-start-transform", "--bullet-end-transform", 260],
    ninja: ["ninja-star-shot", "--ninja-star-start-transform", "--ninja-star-end-transform", 360],
    sawblade: ["sawblade-shot", "--sawblade-start-transform", "--sawblade-end-transform", 380],
    glue: ["glue-shot", "--glue-start-transform", "--glue-end-transform", 370]
  }[kind];
  if (straight) {
    const [className, startProp, endProp, duration] = straight;
    const shot = add(layer, documentRef, className, {}, { [startProp]: start, [endProp]: end });
    if (kind === "arrow") shot.appendChild(Object.assign(documentRef.createElement("div"), { className: "arrow-feather" }));
    if (kind === "crossbow") shot.appendChild(Object.assign(documentRef.createElement("div"), { className: "crossbow-bolt-tail" }));
    if (kind === "bullet") removeAfter(timer, duration, add(layer, documentRef, "six-shooter-flash", { left: `${tip.x}px`, top: `${tip.y}px` }, { "--flash-rotation": `${angle}rad` }));
    if (kind === "glue") {
      const transform = `translate(${tip.x}px, ${tip.y}px) translateY(-50%) rotate(${angle}rad)`;
      const string = add(layer, documentRef, "glue-string", { width: `${Math.max(48, distance)}px`, transform }, { "--glue-string-transform": transform });
      timer(() => removeAfter(timer, 400, add(layer, documentRef, "glue-splat", { left: `${aim.x}px`, top: `${aim.y}px` })), 280);
      removeAfter(timer, 370, string);
    }
    removeAfter(timer, duration, shot); return;
  }
  if (kind === "lightning" || kind === "water" || kind === "sparkles") {
    const className = kind === "lightning" ? "lightning-bolt-shot" : kind === "water" ? "water-stream-shot" : "sparkle-trail";
    const property = kind === "lightning" ? "--lightning-transform" : kind === "water" ? "--water-transform" : "--sparkle-trail-transform";
    const transform = `translate(${tip.x}px, ${tip.y}px) translateY(-50%) rotate(${angle}rad)`;
    const stream = add(layer, documentRef, className, { width: `${Math.max(58, distance)}px`, transform }, { [property]: transform });
    if (kind === "lightning") {
      removeAfter(timer, 280, stream, add(layer, documentRef, "lightning-impact", { left: `${aim.x}px`, top: `${aim.y}px` }), add(layer, documentRef, "lightning-impact", { left: `${tip.x}px`, top: `${tip.y}px` })); return;
    }
    if (kind === "water") for (let i = 0; i < 10; i += 1) removeAfter(timer, 400, add(layer, documentRef, "water-droplet", { left: `${aim.x + randomInt(-12, 12)}px`, top: `${aim.y + randomInt(-12, 12)}px` }, { "--drop-x": `${randomInt(-36, 36)}px`, "--drop-y": `${randomInt(-32, 28)}px` }));
    if (kind === "sparkles") for (let i = 0; i < 7; i += 1) {
      const sparkle = add(layer, documentRef, "sparkle-shot", { animationDelay: `${i * 24}ms` }, { "--sparkle-start-transform": start, "--sparkle-mid-transform": `translate(${(tip.x + aim.x) / 2 + randomInt(-18, 18)}px, ${(tip.y + aim.y) / 2 + randomInt(-18, 18)}px) translate(-50%, -50%)`, "--sparkle-end-transform": `translate(${aim.x + randomInt(-14, 14)}px, ${aim.y + randomInt(-14, 14)}px) translate(-50%, -50%)` });
      removeAfter(timer, 660, sparkle);
    }
    removeAfter(timer, kind === "water" ? 340 : 390, stream); return;
  }
  if (kind === "book" || kind === "garbage") {
    const arc = Math.min(kind === "book" ? 110 : 120, Math.max(kind === "book" ? 34 : 38, distance * (kind === "book" ? .16 : .18)));
    const className = kind === "book" ? "book-shot" : `garbage-shot ${["garbage-paper", "garbage-can-shot", "garbage-banana"][randomInt(0, 2)]}`;
    const prefix = kind === "book" ? "book" : "garbage";
    const shot = add(layer, documentRef, className, {}, { [`--${prefix}-start-transform`]: start, [`--${prefix}-mid-transform`]: `translate(${(tip.x + aim.x) / 2}px, ${(tip.y + aim.y) / 2 - arc}px) translate(-50%, -50%)`, [`--${prefix}-end-transform`]: end });
    timer(() => removeAfter(timer, 390, add(layer, documentRef, kind === "book" ? "book-page-burst" : "garbage-impact", { left: `${aim.x}px`, top: `${aim.y}px` })), kind === "book" ? 390 : 360);
    removeAfter(timer, kind === "book" ? 490 : 460, shot);
  }
}

export function defineShooter(config) {
  return Object.freeze({
    id: config.id, label: config.label, icon: config.icon, scene: config.scene,
    mount(context) {
      const documentRef = context.host.ownerDocument;
      injectStyleOnce(config.id, config.style, documentRef);
      const root = documentRef.createElement("div");
      root.className = `shooter-root shooter-${config.id}`;
      root.dataset.shooterRoot = config.id;
      root.innerHTML = config.artwork;
      root.hidden = true;
      context.host.appendChild(root);
      const pivotEl = root.querySelector(config.pivot);
      const aimEl = root.querySelector(config.aim);
      let aim = { x: 0, y: 0 };
      const geometry = () => {
        const pivot = centerOf(pivotEl);
        const raw = config.lengthAxis === "height" ? aimEl.offsetHeight : aimEl.offsetWidth;
        return { pivot, tip: tipFrom(pivot, aim, raw + (config.lengthOffset || 0)) };
      };
      return {
        root,
        aimAt(point) {
          aim = point;
          const pivot = centerOf(pivotEl);
          const angle = Math.atan2(point.y - pivot.y, point.x - pivot.x);
          aimEl.style.transform = config.verticalAim ? `translateX(-50%) rotate(${angle + Math.PI / 2}rad)` : `translateY(-50%) rotate(${angle}rad)`;
        },
        shootAt(point) {
          aim = point;
          const { pivot, tip } = geometry();
          fireProjectile(config.projectile, { aim: point, tip, pivot, layer: context.projectileLayer, documentRef, randomInt: context.randomInt, timer: context.timer });
        }
      };
    }
  });
}

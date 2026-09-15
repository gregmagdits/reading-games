const REQUIRED_FIELDS = ["id", "label", "icon", "scene", "mount"];

export class ShooterRegistry {
  #definitions = new Map();
  #runtimes = new Map();
  #activeId = "laser";
  #visibility = {};
  #arena = null;
  #picker = null;
  #settings = null;
  #host = null;

  constructor(definitions = []) { definitions.forEach((definition) => this.register(definition)); }

  register(definition) {
    if (!definition || REQUIRED_FIELDS.some((field) => !definition[field])) throw new TypeError(`Incomplete shooter definition; required: ${REQUIRED_FIELDS.join(", ")}`);
    if (this.#definitions.has(definition.id)) throw new TypeError(`Duplicate shooter id: ${definition.id}`);
    this.#definitions.set(definition.id, definition);
    this.#visibility[definition.id] = true;
    return this;
  }

  get metadata() { return [...this.#definitions.values()].map(({ id, label, icon, scene }) => ({ id, label, icon, scene, visible: this.#visibility[id] !== false })); }
  get ids() { return [...this.#definitions.keys()]; }
  get activeId() { return this.#activeId; }

  normalizeId(id) { return this.#definitions.has(id) ? id : "laser"; }
  normalizeVisibility(visibility = {}) { return Object.fromEntries(this.ids.map((id) => [id, visibility[id] !== false])); }

  mount(context) {
    this.#host = context.host;
    this.#arena = context.arena;
    this.#picker = context.picker;
    this.#settings = context.settings;
    for (const definition of this.#definitions.values()) this.#runtimes.set(definition.id, definition.mount(context));
    this.renderControls();
    this.select(this.#activeId);
    return this;
  }

  renderControls() {
    const cards = (mode) => this.metadata.map(({ id, label, icon, visible }) => mode === "picker"
      ? `<button class="shooter-card" type="button" data-shooter-choice="${id}" aria-label="Use ${label}" aria-pressed="${id === this.#activeId}"${visible ? "" : " hidden"}><span class="shooter-choice-icon" aria-hidden="true">${icon}</span><span>${label}</span></button>`
      : `<div class="shooter-card settings-shooter-card" data-shooter-setting="${id}"><label><input type="radio" name="shooterType" value="${id}"${id === this.#activeId ? " checked" : ""}><span aria-hidden="true">${icon}</span><span>${label}</span></label><label class="shooter-visibility-option"><input type="checkbox" name="shooterVisible" value="${id}"${visible ? " checked" : ""}>Show</label></div>`).join("");
    if (this.#picker) this.#picker.innerHTML = cards("picker");
    if (this.#settings) this.#settings.innerHTML = cards("settings");
  }

  select(id) {
    this.#activeId = this.normalizeId(id);
    for (const [runtimeId, runtime] of this.#runtimes) runtime.root.hidden = runtimeId !== this.#activeId;
    if (this.#host) {
      for (const definition of this.#definitions.values()) this.#host.classList.remove(`${definition.id}-mode`);
      this.#host.classList.add(`${this.#activeId}-mode`);
    }
    if (this.#arena) {
      for (const definition of this.#definitions.values()) this.#arena.classList.remove(definition.scene);
      this.#arena.classList.add(this.#definitions.get(this.#activeId).scene);
    }
    if (this.#picker) for (const button of this.#picker.querySelectorAll("[data-shooter-choice]")) {
      const active = button.dataset.shooterChoice === this.#activeId;
      button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active));
    }
    if (this.#settings) {
      const input = this.#settings.querySelector(`input[name="shooterType"][value="${this.#activeId}"]`);
      if (input) input.checked = true;
    }
    return this.#activeId;
  }

  setVisibility(visibility) {
    this.#visibility = this.normalizeVisibility(visibility);
    if (this.#picker) for (const button of this.#picker.querySelectorAll("[data-shooter-choice]")) button.hidden = this.#visibility[button.dataset.shooterChoice] === false;
    return { ...this.#visibility };
  }

  isVisible(id) { return this.#visibility[this.normalizeId(id)] !== false; }
  aimAt(point) { this.#runtimes.get(this.#activeId)?.aimAt(point); }
  shootAt(point) { this.#runtimes.get(this.#activeId)?.shootAt(point); }
}

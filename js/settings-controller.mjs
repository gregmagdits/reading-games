export class SettingsController {
  constructor({ registry, store, onApply = () => {} } = {}) { this.registry = registry; this.store = store; this.onApply = onApply; this.open = false; this.authenticated = false; }
  authenticate(password) { this.authenticated = password === "password"; return this.authenticated; }
  load(defaults) { return this.store.load(defaults); }
  apply(settings) { const saved = this.store.save(settings); this.registry.select(saved.shooterType); this.registry.setVisibility(saved.shooterVisibility); this.onApply(saved); return saved; }
}

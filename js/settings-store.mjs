export class SettingsStore {
  constructor({ storage, key = "shootingWordsSettings", normalize = (value) => value } = {}) {
    this.storage = storage;
    this.key = key;
    this.normalize = normalize;
  }
  load(defaults = {}) {
    try {
      const raw = this.storage.getItem(this.key);
      return this.normalize(raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults });
    } catch { return this.normalize({ ...defaults }); }
  }
  save(settings) {
    const normalized = this.normalize(settings);
    this.storage.setItem(this.key, JSON.stringify(normalized));
    return normalized;
  }
}

export class MemoryStorage {
  constructor(entries = {}) { this.values = new Map(Object.entries(entries)); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

export function createSettingsNormalizer(registry, defaults = {}) {
  return (settings = {}) => ({
    ...defaults,
    ...settings,
    shooterType: registry.normalizeId(settings.shooterType),
    shooterVisibility: registry.normalizeVisibility(settings.shooterVisibility)
  });
}

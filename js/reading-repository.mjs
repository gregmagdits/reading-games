export class ReadingRepository {
  constructor({ indexedDB, dbName = "shootingWordsReadingDb", version = 4, wordStore = "words", metricsStore = "metrics" } = {}) {
    this.indexedDB = indexedDB;
    this.dbName = dbName;
    this.version = version;
    this.wordStore = wordStore;
    this.metricsStore = metricsStore;
    this.db = null;
  }

  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = () => {
        const db = request.result;
        let words = db.objectStoreNames.contains(this.wordStore) ? request.transaction.objectStore(this.wordStore) : db.createObjectStore(this.wordStore, { keyPath: "id", autoIncrement: true });
        if (!words.indexNames.contains("source")) words.createIndex("source", "source");
        if (!words.indexNames.contains("letter_combination")) words.createIndex("letter_combination", "letter_combination");
        if (request.oldVersion < 4) {
          const cursorRequest = words.openCursor();
          cursorRequest.onsuccess = () => {
            const cursor = cursorRequest.result; if (!cursor) return;
            const row = cursor.value;
            if (!row.source) row.source = "legacy-import";
            if (typeof row.letter_combination !== "string") row.letter_combination = "";
            cursor.update(row); cursor.continue();
          };
        }
        if (!db.objectStoreNames.contains(this.metricsStore)) {
          const metrics = db.createObjectStore(this.metricsStore, { keyPath: "id", autoIncrement: true });
          metrics.createIndex("timestamp", "timestamp"); metrics.createIndex("word", "word"); metrics.createIndex("lesson", "lesson");
        }
      };
      request.onsuccess = () => { this.db = request.result; resolve(this.db); };
      request.onerror = () => reject(request.error || new Error("Unable to open IndexedDB."));
    });
  }

  async #request(storeName, mode, operation) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      let result;
      try { result = operation(store); } catch (error) { reject(error); return; }
      transaction.oncomplete = () => resolve(result?.result);
      transaction.onerror = () => reject(transaction.error || new Error(`IndexedDB ${storeName} transaction failed.`));
      transaction.onabort = () => reject(transaction.error || new Error(`IndexedDB ${storeName} transaction aborted.`));
    });
  }

  readRows() { return this.#request(this.wordStore, "readonly", (store) => store.getAll()).then((rows) => rows || []); }
  async replaceRows(rows) { await this.#request(this.wordStore, "readwrite", (store) => { store.clear(); rows.forEach((row) => store.add(row)); }); }
  clearRows() { return this.#request(this.wordStore, "readwrite", (store) => store.clear()); }
  readMetrics() { return this.#request(this.metricsStore, "readonly", (store) => store.getAll()).then((rows) => rows || []); }
  addMetric(metric) { return this.#request(this.metricsStore, "readwrite", (store) => store.add(metric)); }
  clearMetrics() { return this.#request(this.metricsStore, "readwrite", (store) => store.clear()); }
}

export class InMemoryReadingAdapter {
  constructor({ rows = [], metrics = [] } = {}) { this.rows = structuredClone(rows); this.metrics = structuredClone(metrics); }
  async open() { return this; }
  async readRows() { return structuredClone(this.rows); }
  async replaceRows(rows) { this.rows = structuredClone(rows); }
  async clearRows() { this.rows = []; }
  async readMetrics() { return structuredClone(this.metrics); }
  async addMetric(metric) { this.metrics.push(structuredClone(metric)); }
  async clearMetrics() { this.metrics = []; }
}

export class Effects {
  constructor({ windowRef = globalThis, speechSynthesis = windowRef.speechSynthesis } = {}) { this.window = windowRef; this.speech = speechSynthesis; this.timers = new Set(); }
  later(callback, delay) { const id = this.window.setTimeout(() => { this.timers.delete(id); callback(); }, delay); this.timers.add(id); return id; }
  clear() { for (const id of this.timers) this.window.clearTimeout(id); this.timers.clear(); }
  unlockSpeech() { if (!this.speech) return; this.speech.resume(); this.speech.getVoices(); }
  speak(word) {
    if (!this.speech || !this.window.SpeechSynthesisUtterance) return false;
    const utterance = new this.window.SpeechSynthesisUtterance(word); utterance.lang = "en-US"; utterance.rate = .78; utterance.pitch = 1.08;
    const voices = this.speech.getVoices();
    utterance.voice = voices.find((voice) => voice.lang === "en-US" && /female|samantha|zira|google/i.test(voice.name)) || voices.find((voice) => voice.lang === "en-US") || voices.find((voice) => voice.lang.startsWith("en")) || null;
    this.speech.cancel(); this.speech.speak(utterance); return true;
  }
}

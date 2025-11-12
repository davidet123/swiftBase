// Adaptador del feed ACB (WebSocket) hacia tu store "basket".
// No muta estado directamente: delega en acciones del store.

export class ACBWsAdapter {
  /**
   * @param {() => any} getStore - función que devuelve la instancia del store (para evitar import circular)
   * @param {string} wsUrl - URL del WebSocket, ej: ws://localhost:8081
   */
  constructor(getStore, wsUrl) {
    this.getStore = getStore;
    this.wsUrl = wsUrl;
    this.ws = null;
    this._reconnectTimer = null;
    this._reconnectAttempts = 0;
    this._status = 'disconnected';
  }

  connect(url) {
    if (url) this.wsUrl = url;
    this.disconnect();

    try {
      this.ws = new WebSocket(this.wsUrl);
      this._status = 'connecting';

      this.ws.onopen = () => {
        this._status = 'connected';
        this._reconnectAttempts = 0;
      };

      this.ws.onmessage = (evt) => {
        let msg = null;
        try { msg = JSON.parse(evt.data); } catch { return; }
        if (!msg || typeof msg !== 'object') return;

        const store = this.getStore();
        console.log(msg.data)
        if (msg.type === 'full_update' && msg.data) {
          store.applyFullSnapshotFromWs(msg.data);
        } else if (msg.type === 'update' && msg.data) {
          store.applyDeltaFromWs(msg.data);
        }
      };

      this.ws.onerror = () => {
        this._status = 'error';
      };

      this.ws.onclose = () => {
        this._status = 'disconnected';
        this.scheduleReconnect();
      };
    } catch {
      this._status = 'error';
      this.scheduleReconnect();
    }
  }

  disconnect() {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }
    if (this.ws) {
      try { this.ws.onopen = this.ws.onmessage = this.ws.onerror = this.ws.onclose = null; } catch {}
      try { this.ws.close(); } catch {}
      this.ws = null;
    }
    this._status = 'disconnected';
  }

  scheduleReconnect() {
    const attempt = Math.min(this._reconnectAttempts + 1, 8);
    this._reconnectAttempts = attempt;
    const base = 500;     // ms
    const max = 4000;     // ms
    const jitter = Math.floor(Math.random() * 200);
    const delay = Math.min(base * Math.pow(2, attempt - 1), max) + jitter;

    if (this._reconnectTimer) clearTimeout(this._reconnectTimer);
    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      if (this._status !== 'connected') {
        this.connect();
      }
    }, delay);
  }
}

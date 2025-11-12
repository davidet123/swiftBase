import { defineStore } from 'pinia';

/* =========================
   ROSTER EMBEBIDO (provisional)
   ========================= */
const embeddedRoster = {
  homeTeam: "Valencia Basket",
  awayTeam: "Real Madrid",
  roster: {
    home: {
      "00": "Brancou Badio",
      "02": "Josep Puerto",
      "03": "Nate Reuvers",
      "04": "Jaime Pradilla",
      "05": "Sergio de Larrea",
      "06": "Xabi López-Arostegui",
      "07": "Chris Jones",
      "08": "Jean Montero",
      "12": "Joel Soriano",
      "16": "Stefan Jovic",
      "24": "Matt Costello",
      "77": "Nate Sestina"
    },
    away: {
      "06": "Alberto Abalde",
      "07": "Facundo Campazzo",
      "08": "Xavier Rathan-Mayes",
      "09": "Hugo González",
      "11": "Mario Hezonja",
      "13": "Džanan Musa",
      "16": "Usman Garuba",
      "20": "Bruno Fernando",
      "22": "Walter Tavares",
      "23": "Sergio Llull",
      "24": "Andrés Feliz",
      "30": "Eli Ndiaye"
    }
  }
};

function rosterToPlayersSeed(rosterObj) {
  const out = {};
  const pushTeam = (teamKey, teamName) => {
    const team = rosterObj[teamKey] || {};
    for (const num of Object.keys(team)) {
      const id = `${teamName}-${num}`;
      out[id] = {
        name: team[num],
        number: num,
        team: teamName,
        points: 0,
        fouls: 0,
        onCourt: false
      };
    }
  };
  pushTeam('home', 'home');
  pushTeam('away', 'away');
  return out;
}

/* =========================
   HELPERS EXISTENTES
   ========================= */
function deepMergePlayers(targetPlayers, patchPlayers) {
  if (!patchPlayers || typeof patchPlayers !== 'object') return targetPlayers;
  const out = { ...targetPlayers };
  for (const pid of Object.keys(patchPlayers)) {
    const cur = targetPlayers[pid] || {};
    const patch = patchPlayers[pid] || {};
    out[pid] = { ...cur, ...patch };
  }
  return out;
}

function sanitizeGameUpdate(patch) {
  // Evita que te rompan el estado con tipos raros
  const out = {};
  const allowed = new Set([
    'gameClock', 'possessionClock', 'period',
    'scoreHome', 'scoreAway',
    'teamFoulsHome', 'teamFoulsAway',
    'clockRunning', 'possessionRunning', 'buzzerActive',
    'realClock', 'players', 'lastEvent', 'lastUpdate'
  ]);

  for (const k of Object.keys(patch || {})) {
    if (!allowed.has(k)) continue;
    out[k] = patch[k];
  }
  return out;
}

/* =========================
   STORE
   ========================= */
export const useDatosBaloncestoStore = defineStore('datosBaloncesto', {
  state: () => ({
    // Conexión
    status: 'disconnected', // 'disconnected' | 'connecting' | 'connected' | 'error'
    // wsUrl: `ws://${window.location.hostname}:8081`,
    wsUrl: `ws://localhost:8081`,
    _ws: null,
    _reconnectAttempts: 0,
    _reconnectTimer: null,

    // Telemetría de enlace
    connected: false,
    lastMessageTs: null,
    lastError: null,

    // Estado del partido (alineado con tu GameState del backend)
    gameClock: '10:00.00',      // MM:SS.DC
    possessionClock: '24.0',    // SS.D
    period: 1,
    scoreHome: 0,
    scoreAway: 0,
    teamFoulsHome: 0,
    teamFoulsAway: 0,
    clockRunning: false,
    possessionRunning: false,
    buzzerActive: false,
    realClock: null,

    // Roster embebido (mapa dorsal->nombre)
    roster: embeddedRoster.roster,

    // Players con semilla inicial a partir del roster embebido
    players: rosterToPlayersSeed(embeddedRoster.roster),

    lastEvent: null,
    lastUpdate: null
  }),

  getters: {
    scoreboard: (s) => `${s.scoreHome} - ${s.scoreAway}`,
    isRunning: (s) => !!s.clockRunning
  },

  actions: {
    /* ===== Conexión WS ===== */
    setWsUrl(url) {
      if (!url || typeof url !== 'string') return;
      this.wsUrl = url;
    },

    connect(url) {
      if (url) this.wsUrl = url;
      this.disconnect(); // limpieza previa

      this.status = 'connecting';
      this.connected = false;
      this.lastError = null;

      try {
        const ws = new WebSocket(this.wsUrl);
        this._ws = ws;

        ws.onopen = () => {
          this.status = 'connected';
          this.connected = true;
          this._reconnectAttempts = 0;
        };

        ws.onmessage = (evt) => {
          this.lastMessageTs = Date.now();
          let msg;
          try {
            msg = JSON.parse(evt.data);
          } catch {
            // Ignora frames no JSON
            return;
          }
          if (!msg || typeof msg !== 'object') return;

          if (msg.type === 'full_update' && msg.data) {
            this.applyFullUpdate(msg.data);
          } else if (msg.type === 'update' && msg.data) {
            this.applyUpdate(msg.data);
          }
        };

        ws.onerror = (err) => {
          this.lastError = err?.message || 'WebSocket error';
          this.status = 'error';
        };

        ws.onclose = () => {
          this.connected = false;
          this.status = 'disconnected';
          this.scheduleReconnect();
        };
      } catch (e) {
        this.lastError = e?.message || String(e);
        this.status = 'error';
        this.scheduleReconnect();
      }
    },

    disconnect() {
      if (this._reconnectTimer) {
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = null;
      }
      if (this._ws) {
        try { this._ws.onopen = this._ws.onmessage = this._ws.onerror = this._ws.onclose = null; } catch {}
        try { this._ws.close(); } catch {}
        this._ws = null;
      }
      this.connected = false;
      this.status = 'disconnected';
    },

    scheduleReconnect() {
      // Backoff exponencial con cap
      const attempt = Math.min(this._reconnectAttempts + 1, 1000);
      this._reconnectAttempts = attempt;
      const base = 500;     // ms
      const max = 4000;     // ms
      const jitter = Math.floor(Math.random() * 200);
      const delay = Math.min(base * Math.pow(2, attempt - 1), max) + jitter;

      if (this._reconnectTimer) clearTimeout(this._reconnectTimer);
      this._reconnectTimer = setTimeout(() => {
        this._reconnectTimer = null;
        if (this.status !== 'connected') {
          this.connect(); // reintento con la misma URL
        }
      }, delay);
    },

    /* ===== Aplicación de updates ===== */
    applyFullUpdate(payload) {
      const p = sanitizeGameUpdate(payload);
      // Reemplazo directo de campos simples
      if (typeof p.gameClock === 'string') this.gameClock = p.gameClock;
      if (typeof p.possessionClock === 'string') this.possessionClock = p.possessionClock;
      if (typeof p.period === 'number') this.period = p.period;
      if (typeof p.scoreHome === 'number') this.scoreHome = p.scoreHome;
      if (typeof p.scoreAway === 'number') this.scoreAway = p.scoreAway;
      if (typeof p.teamFoulsHome === 'number') this.teamFoulsHome = p.teamFoulsHome;
      if (typeof p.teamFoulsAway === 'number') this.teamFoulsAway = p.teamFoulsAway;
      if (typeof p.clockRunning === 'boolean') this.clockRunning = p.clockRunning;
      if (typeof p.possessionRunning === 'boolean') this.possessionRunning = p.possessionRunning;
      if (typeof p.buzzerActive === 'boolean') this.buzzerActive = p.buzzerActive;
      if (typeof p.realClock === 'string' || p.realClock === null) this.realClock = p.realClock ?? this.realClock;

      // Players: merge por id
      if (p.players && typeof p.players === 'object') {
        this.players = deepMergePlayers(this.players, p.players);
      }

      if (p.lastEvent) this.lastEvent = p.lastEvent;
      if (p.lastUpdate) this.lastUpdate = p.lastUpdate;
    },

    applyUpdate(patch) {
      const p = sanitizeGameUpdate(patch);

      if (typeof p.gameClock === 'string') this.gameClock = p.gameClock;
      if (typeof p.possessionClock === 'string') this.possessionClock = p.possessionClock;
      if (typeof p.period === 'number') this.period = p.period;
      if (typeof p.scoreHome === 'number') this.scoreHome = p.scoreHome;
      if (typeof p.scoreAway === 'number') this.scoreAway = p.scoreAway;
      if (typeof p.teamFoulsHome === 'number') this.teamFoulsHome = p.teamFoulsHome;
      if (typeof p.teamFoulsAway === 'number') this.teamFoulsAway = p.teamFoulsAway;
      if (typeof p.clockRunning === 'boolean') this.clockRunning = p.clockRunning;
      if (typeof p.possessionRunning === 'boolean') this.possessionRunning = p.possessionRunning;
      if (typeof p.buzzerActive === 'boolean') this.buzzerActive = p.buzzerActive;
      if (typeof p.realClock === 'string' || p.realClock === null) this.realClock = p.realClock ?? this.realClock;

      if (p.players && typeof p.players === 'object') {
        this.players = deepMergePlayers(this.players, p.players);
      }

      if (p.lastEvent) this.lastEvent = p.lastEvent;
      if (p.lastUpdate) this.lastUpdate = p.lastUpdate;
    },

    /* ===== Utilidades de roster ===== */
    cargarRosterEmbebido() {
      this.roster = embeddedRoster.roster;
      // re-sembrar players con nombres por dorsal sin pisar lo que ya haya
      const seed = rosterToPlayersSeed(this.roster);
      this.players = deepMergePlayers(seed, this.players);
    }
  }
});

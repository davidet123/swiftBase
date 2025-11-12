import { defineStore } from 'pinia';

/* =========================================================
   Utilidades de persistencia
   ========================================================= */
const LS_PARTIDO_KEY = 'partidoBasket';
const LS_MARCADOR_KEY = 'marcadorBasket';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch {
    // si falla, mala suerte; no reventamos la app
  }
}

/* =========================================================
   Helpers de reloj (por si quieres mostrarlos)
   ========================================================= */
function parseGameClockStr(gcStr) {
  // "MM:SS.DC" -> { minutos, segundos, centesimas }
  if (typeof gcStr !== 'string') return null;
  const m = gcStr.match(/^(\d{2}):(\d{2})\.(\d{2})$/);
  if (!m) return null;
  return {
    minutos: parseInt(m[1], 10),
    segundos: parseInt(m[2], 10),
    centesimas: parseInt(m[3], 10)
  };
}
function parseShotClockStr(scStr) {
  // "SS.D" -> { segundosPosesion, decimasPosesion }
  if (typeof scStr !== 'string') return null;
  const m = scStr.match(/^(\d{2})\.(\d)$/);
  if (!m) return null;
  return {
    segundosPosesion: parseInt(m[1], 10),
    decimasPosesion: parseInt(m[2], 10)
  };
}

/* =========================================================
   Estructuras mínimas y saneado
   ========================================================= */
function plantillaJugador(idEquipo, id = '', numero = null) {
  return {
    altura: null,
    apodo: null,
    equipo: idEquipo,
    estadistica: {
      puntos: 0,
      faltas: 0,
      tiros2: 0,
      tiros2Total: 0,
      tiros1: 0,
      tiros1Total: 0,
      tiros3: 0,
      tiros3Total: 0,
      asistencias: 0
    },
    fecha_nacimiento: null,
    id_jugador: id || `${idEquipo}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    nacionalidad: null,
    nombre_jugador: null,
    numero: numero,
    posicion: null,
    onCourt: false
  };
}

function ensureEquipoBase(equipo, idEquipo) {
  if (!equipo) {
    equipo = { id_equipo: idEquipo };
  }
  equipo.id_equipo ??= idEquipo;
  equipo.nombre_equipo ??= null;
  equipo.display_name ??= null;
  equipo.localidad ??= null;
  equipo.estadistica_equipo ??= {
    puntos: 0,
    tiempoMuerto: 0,
    faltas: 0,
    tiros2: 0,
    tiros2Total: 0,
    tiros1: 0,
    tiros1Total: 0,
    tiros3: 0,
    tiros3Total: 0,
    asistencias: 0
  };
  if (!Array.isArray(equipo.jugadores)) equipo.jugadores = [];
  while (equipo.jugadores.length < 12) {
    equipo.jugadores.push(plantillaJugador(idEquipo, `${idEquipo}_${equipo.jugadores.length}`, null));
  }
  equipo.cuerpo_tecnico ??= [
    { id_cuerpo_tecnico: `ent_${idEquipo}`, titulo: 'Entrenador', nombre: null, fecha_nacimiento: null, nacionalidad: null },
    { id_cuerpo_tecnico: `seg_ent_${idEquipo}`, titulo: 'Segundo entrenador', nombre: null, fecha_nacimiento: null, nacionalidad: null },
    { id_cuerpo_tecnico: `del_${idEquipo}`, titulo: 'Delegado', nombre: null, fecha_nacimiento: null, nacionalidad: null }
  ];
  if (!Array.isArray(equipo.formacion)) {
    equipo.formacion = Array.from({ length: 11 }, () => ({ dorsal: null, apodo: null, pos: null }));
  }
  if (!Array.isArray(equipo.titulares)) equipo.titulares = [];
  equipo.tipoFormacion ??= null;
  equipo.sustituciones ??= null;
  return equipo;
}

function ensurePartidoStructure(p) {
  if (!p) p = {};
  p.id_partido ??= 'localStorage';
  p.id_equipo_local ??= 'localStorage_local';
  p.id_equipo_visitante ??= 'localStorage_visitante';
  p.competicion ??= null;
  p.fecha ??= '';
  p.hora ??= '';
  p.lugar ??= '';
  p.estadio ??= '';
  p.equipo_arbitral ??= {
    primer_arbitro: null, segundo_arbitro: null, tercer_arbitro: null, cuarto_arbitro: null
  };
  p.equipo_local = ensureEquipoBase(p.equipo_local, p.id_equipo_local);
  p.equipo_visitante = ensureEquipoBase(p.equipo_visitante, p.id_equipo_visitante);
  p.marcador ??= { local: 0, visitante: 0 };
  p.marcador.local ??= 0;
  p.marcador.visitante ??= 0;
  return p;
}

function ensureMarcadorStructure(m) {
  if (!m) m = {};
  m.id_partido ??= 'localStorage';
  // periodo (cuarto actual)
  m.periodo ??= 1;

  // tanteos por cuarto (objetos separados para local y visitante)
  const initTanteo = () => ({
    primerCuarto: 0,
    segundoCuarto: 0,
    tercerCuarto: 0,
    cuartoCuarto: 0,
    prorroga1: 0,
    prorroga2: 0,
    prorroga3: 0
  });
  if (!m.tanteoLocal) m.tanteoLocal = initTanteo();
  if (!m.tanteoVisitante) m.tanteoVisitante = initTanteo();

  // temporizador
  if (!m.temporizador) m.temporizador = {};
  m.temporizador.gameClock ??= '10:00.00';
  m.temporizador.possessionClock ??= '24.0';
  m.temporizador.clockRunning ??= false;
  m.temporizador.possessionRunning ??= false;

  return m;
}

/* ---------------------------------------------------------
   Cálculo de parciales por cuarto desde acumulados totales
   --------------------------------------------------------- */
function keyCuarto(periodo) {
  switch (periodo) {
    case 1: return 'primerCuarto';
    case 2: return 'segundoCuarto';
    case 3: return 'tercerCuarto';
    case 4: return 'cuartoCuarto';
    case 5: return 'prorroga1';
    case 6: return 'prorroga2';
    case 7: return 'prorroga3';
    default: return 'prorroga3';
  }
}

function sumaPrevios(tanteoObj, periodo) {
  const order = ['primerCuarto', 'segundoCuarto', 'tercerCuarto', 'cuartoCuarto', 'prorroga1', 'prorroga2', 'prorroga3'];
  let sum = 0;
  for (let i = 1; i < periodo; i++) {
    const k = keyCuarto(i);
    sum += Number(tanteoObj[k] || 0);
  }
  return sum;
}

function updateQuarterScoresFromTotals(marcador, periodo, totalHome, totalAway) {
  // Calcula parcial del cuarto actual como total acumulado menos la suma de cuartos anteriores.
  marcador.periodo = periodo;

  const k = keyCuarto(periodo);
  const sumH = sumaPrevios(marcador.tanteoLocal, periodo);
  const sumA = sumaPrevios(marcador.tanteoVisitante, periodo);

  const parcialH = Math.max(0, Number(totalHome) - sumH);
  const parcialA = Math.max(0, Number(totalAway) - sumA);

  marcador.tanteoLocal[k] = parcialH;
  marcador.tanteoVisitante[k] = parcialA;
}

/* ---------------------------------------------------------
   Jugadores: localizar por dorsal y aplicar patch
   --------------------------------------------------------- */
function sideToEquipoKey(side) {
  return side === 'away' ? 'equipo_visitante' : 'equipo_local';
}
function findOrCreateJugadorByNumero(equipoObj, numero2d) {
  let idx = equipoObj.jugadores.findIndex(j => (j?.numero ?? '') === numero2d);
  if (idx === -1) {
    const emptyIdx = equipoObj.jugadores.findIndex(j => j && (j.numero == null || j.numero === ''));
    const nuevo = plantillaJugador(equipoObj.id_equipo, `${equipoObj.id_equipo}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`, numero2d);
    if (emptyIdx !== -1) {
      equipoObj.jugadores[emptyIdx] = nuevo;
      idx = emptyIdx;
    } else {
      equipoObj.jugadores.push(nuevo);
      idx = equipoObj.jugadores.length - 1;
    }
  }
  return idx;
}
function applyPlayersPatchToPartido(partido, playersPatch) {
  if (!playersPatch || typeof playersPatch !== 'object') return;

  const pb = partido;
  for (const pid of Object.keys(playersPatch)) {
    const patch = playersPatch[pid] || {};
    const m = pid.match(/^(home|away)-(\d{1,2})$/);
    if (!m) continue;
    const side = m[1];
    const numero2d = m[2].padStart(2, '0');

    const teamKey = sideToEquipoKey(side);
    const equipoObj = pb[teamKey];
    const idx = findOrCreateJugadorByNumero(equipoObj, numero2d);
    const jugador = equipoObj.jugadores[idx];

    if (typeof patch.points === 'number') jugador.estadistica.puntos = patch.points;
    if (typeof patch.fouls === 'number') jugador.estadistica.faltas = patch.fouls;
    if (typeof patch.onCourt === 'boolean') jugador.onCourt = patch.onCourt;
  }

  // Refrescar titulares con los que están en pista (máx 5)
  const updateTitulares = (eq) => {
    eq.titulares = eq.jugadores
      .filter(j => j.onCourt)
      .slice(0, 5)
      .map(j => ({ dorsal: j.numero, apodo: j.apodo, pos: j.posicion }));
  };
  updateTitulares(pb.equipo_local);
  updateTitulares(pb.equipo_visitante);
}

/* =========================================================
   Estado inicial
   ========================================================= */
const initialPartido = ensurePartidoStructure(loadJSON(LS_PARTIDO_KEY, null));
const initialMarcador = ensureMarcadorStructure(loadJSON(LS_MARCADOR_KEY, null));

export const useBasketStore = defineStore('basket', {
  state: () => ({
    // Dos objetos independientes con el mismo id_partido
    partidoBasket: initialPartido,
    marcadorBasket: initialMarcador,
    posicionesBaloncesto: [
      "Base",
      "Escolta",
      "Alero",
      "Ala-Pívot",
      "Pívot"
    ],

    // Por si quieres telemetría de conexión fuera
    wsStatus: 'disconnected', // connecting | connected | error
    lastWsMessageTs: null,
  }),

  getters: {
    getPartidoBasket: (s) => s.partidoBasket,
    getMarcadorBasket: (s) => s.marcadorBasket,
    getPosicionesBasket: state => state.posicionesBaloncesto
  },

  actions: {

    setPartidoBasket(payload) {
  // Compat: esperaba un objeto partido y quizá marcador dentro
      if (payload && typeof payload === 'object') {
        // mezcla suave con la estructura saneada
        this.partidoBasket = ensurePartidoStructure({
          ...this.partidoBasket,
          ...payload
        });
        // si viene marcador dentro del payload
        if (payload.marcador && typeof payload.marcador === 'object') {
          this.marcadorBasket = ensureMarcadorStructure({
            ...this.marcadorBasket,
            id_partido: this.partidoBasket.id_partido
          });
        }
        this.guardarEnLocalStorage();
      }
      return this.partidoBasket;
    },
    /* =====================================================
       Persistencia explícita (por si quieres llamarla fuera)
       ===================================================== */
    guardarEnLocalStorage() {
      saveJSON(LS_PARTIDO_KEY, this.partidoBasket);
      saveJSON(LS_MARCADOR_KEY, this.marcadorBasket);
    },

    /* =====================================================
       Entrada desde WebSocket
       - payload: objeto del backend con campos de ACB parseados:
         { scoreHome, scoreAway, period, teamFoulsHome, teamFoulsAway,
           gameClock, possessionClock, clockRunning, possessionRunning,
           players: { "home-07": {points,fouls,onCourt}, ... } }
       ===================================================== */

    applyFullSnapshotFromWs(payload) {
      try {
        // asegurar estructuras
        this.partidoBasket = ensurePartidoStructure(this.partidoBasket);
        this.marcadorBasket = ensureMarcadorStructure(this.marcadorBasket);

        // Asegurar relación por id_partido
        this.marcadorBasket.id_partido = this.partidoBasket.id_partido;

        // Marcador total (partido)
        if (typeof payload.scoreHome === 'number') {
          this.partidoBasket.marcador.local = payload.scoreHome;
        }
        if (typeof payload.scoreAway === 'number') {
          this.partidoBasket.marcador.visitante = payload.scoreAway;
        }

        // Faltas de equipo
        if (typeof payload.teamFoulsHome === 'number') {
          this.partidoBasket.equipo_local.estadistica_equipo.faltas = payload.teamFoulsHome;
        }
        if (typeof payload.teamFoulsAway === 'number') {
          this.partidoBasket.equipo_visitante.estadistica_equipo.faltas = payload.teamFoulsAway;
        }

        // Periodo/cuarto y parciales por cuarto
        const period = typeof payload.period === 'number' ? payload.period : this.marcadorBasket.periodo || 1;
        updateQuarterScoresFromTotals(
          this.marcadorBasket,
          period,
          this.partidoBasket.marcador.local,
          this.partidoBasket.marcador.visitante
        );

        // Relojes (si llegan)
        if (typeof payload.gameClock === 'string') {
          this.marcadorBasket.temporizador.gameClock = payload.gameClock;
        }
        if (typeof payload.possessionClock === 'string') {
          this.marcadorBasket.temporizador.possessionClock = payload.possessionClock;
        }
        if (typeof payload.clockRunning === 'boolean') {
          this.marcadorBasket.temporizador.clockRunning = payload.clockRunning;
        }
        if (typeof payload.possessionRunning === 'boolean') {
          this.marcadorBasket.temporizador.possessionRunning = payload.possessionRunning;
        }

        // Jugadores
        applyPlayersPatchToPartido(this.partidoBasket, payload.players || {});

        // Persistir
        // this.guardarEnLocalStorage();
        this.lastWsMessageTs = Date.now();
        this.wsStatus = 'connected';
      } catch (e) {
        console.error('applyFullSnapshotFromWs error:', e);
        this.wsStatus = 'error';
      }
    },

    applyDeltaFromWs(patch) {
      try {
        // asegurar estructuras
        this.partidoBasket = ensurePartidoStructure(this.partidoBasket);
        this.marcadorBasket = ensureMarcadorStructure(this.marcadorBasket);

        // Marcador total
        if (typeof patch.scoreHome === 'number') {
          this.partidoBasket.marcador.local = patch.scoreHome;
        }
        if (typeof patch.scoreAway === 'number') {
          this.partidoBasket.marcador.visitante = patch.scoreAway;
        }

        // Faltas de equipo
        if (typeof patch.teamFoulsHome === 'number') {
          this.partidoBasket.equipo_local.estadistica_equipo.faltas = patch.teamFoulsHome;
        }
        if (typeof patch.teamFoulsAway === 'number') {
          this.partidoBasket.equipo_visitante.estadistica_equipo.faltas = patch.teamFoulsAway;
        }

        // Periodo y parciales
        if (typeof patch.period === 'number' ||
            typeof patch.scoreHome === 'number' ||
            typeof patch.scoreAway === 'number') {
          const period = typeof patch.period === 'number' ? patch.period : this.marcadorBasket.periodo || 1;
          updateQuarterScoresFromTotals(
            this.marcadorBasket,
            period,
            this.partidoBasket.marcador.local,
            this.partidoBasket.marcador.visitante
          );
        }

        // Relojes
        if (typeof patch.gameClock === 'string') {
          this.marcadorBasket.temporizador.gameClock = patch.gameClock;
        }
        if (typeof patch.possessionClock === 'string') {
          this.marcadorBasket.temporizador.possessionClock = patch.possessionClock;
        }
        if (typeof patch.clockRunning === 'boolean') {
          this.marcadorBasket.temporizador.clockRunning = patch.clockRunning;
        }
        if (typeof patch.possessionRunning === 'boolean') {
          this.marcadorBasket.temporizador.possessionRunning = patch.possessionRunning;
        }

        // Jugadores
        if (patch.players && typeof patch.players === 'object') {
          applyPlayersPatchToPartido(this.partidoBasket, patch.players);
        }

        // Persistir
        // this.guardarEnLocalStorage();
        this.lastWsMessageTs = Date.now();
        this.wsStatus = 'connected';
      } catch (e) {
        console.error('applyDeltaFromWs error:', e);
        this.wsStatus = 'error';
      }
    },

    /* =====================================================
       Utilidades varias
       ===================================================== */
    resetPartidoYMarcador() {
      this.partidoBasket = ensurePartidoStructure(null);
      this.marcadorBasket = ensureMarcadorStructure(null);
      this.guardarEnLocalStorage();
    },

    // Si cargas desde edición manual, llama a esto para re-saneado y persistencia
    hidratarDesdeLocalStorage() {
      this.partidoBasket = ensurePartidoStructure(loadJSON(LS_PARTIDO_KEY, null));
      this.marcadorBasket = ensureMarcadorStructure(loadJSON(LS_MARCADOR_KEY, null));
      this.guardarEnLocalStorage();
    }
  }
});

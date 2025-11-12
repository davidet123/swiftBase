import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDatosBaloncestoStore = defineStore('datosBaloncesto', () => {
  // Estado del juego
  const gameClock = ref('00:00.00');
  const possessionClock = ref('24.0');
  const period = ref(1);
  const scoreHome = ref(0);
  const scoreAway = ref(0);
  const teamFoulsHome = ref(0);
  const teamFoulsAway = ref(0);
  const realTime = ref('');
  const clockRunning = ref(false);
  const buzzerActive = ref(false);
  
  // Jugadores
  const players = ref({});
  
  // Conexión WebSocket
  const ws = ref(null);
  const connected = ref(false);
  const lastUpdate = ref(null);
  const error = ref(null);

  // Getters computados
  const gameTime = computed(() => {
    const [minutes, seconds] = gameClock.value.split(':');
    const [sec, tenths] = seconds.split('.');
    return parseInt(minutes) * 60 + parseInt(sec) + parseInt(tenths) / 10;
  });

  const scoreDifference = computed(() => scoreHome.value - scoreAway.value);
  const totalFouls = computed(() => teamFoulsHome.value + teamFoulsAway.value);
  const isLastPeriod = computed(() => period.value >= 4);

  // Acciones
  const connectWebSocket = (url = 'ws://localhost:8081') => {
    try {
      ws.value = new WebSocket(url);
      
      ws.value.onopen = () => {
        connected.value = true;
        error.value = null;
        console.log('WebSocket connected to', url);
      };

      ws.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          updateGameState(data);
          lastUpdate.value = new Date();
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError);
          error.value = 'Error parsing game data';
        }
      };

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
        error.value = 'WebSocket connection error';
        connected.value = false;
      };

      ws.value.onclose = () => {
        connected.value = false;
        console.log('WebSocket disconnected');
      };

    } catch (connectionError) {
      console.error('WebSocket connection failed:', connectionError);
      error.value = 'Connection failed';
    }
  };

  const disconnectWebSocket = () => {
    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }
    connected.value = false;
  };

  const updateGameState = (data) => {
    if (data.gameClock !== undefined) gameClock.value = data.gameClock;
    if (data.possessionClock !== undefined) possessionClock.value = data.possessionClock;
    if (data.period !== undefined) period.value = data.period;
    if (data.scoreHome !== undefined) scoreHome.value = data.scoreHome;
    if (data.scoreAway !== undefined) scoreAway.value = data.scoreAway;
    if (data.teamFoulsHome !== undefined) teamFoulsHome.value = data.teamFoulsHome;
    if (data.teamFoulsAway !== undefined) teamFoulsAway.value = data.teamFoulsAway;
    if (data.realTime !== undefined) realTime.value = data.realTime;
    if (data.clockRunning !== undefined) clockRunning.value = data.clockRunning;
    if (data.buzzerActive !== undefined) buzzerActive.value = data.buzzerActive;
    
    if (data.players) {
      players.value = { ...players.value, ...data.players };
    }
  };

  const resetGame = () => {
    gameClock.value = '00:00.00';
    possessionClock.value = '24.0';
    period.value = 1;
    scoreHome.value = 0;
    scoreAway.value = 0;
    teamFoulsHome.value = 0;
    teamFoulsAway.value = 0;
    realTime.value = '';
    clockRunning.value = false;
    buzzerActive.value = false;
    players.value = {};
  };

  const getPlayerStats = (team, number) => {
    const playerId = `${team}-${number.toString().padStart(2, '0')}`;
    return players.value[playerId] || { points: 0, fouls: 0, onCourt: false };
  };

  const getTeamPlayers = (team) => {
    return Object.entries(players.value)
      .filter(([key]) => key.startsWith(`${team}-`))
      .map(([key, stats]) => ({
        number: key.split('-')[1],
        ...stats
      }));
  };

  // Auto-conectar al crear el store
  if (typeof window !== 'undefined') {
    connectWebSocket();
  }

  return {
    // Estado
    gameClock,
    possessionClock,
    period,
    scoreHome,
    scoreAway,
    teamFoulsHome,
    teamFoulsAway,
    realTime,
    clockRunning,
    buzzerActive,
    players,
    connected,
    lastUpdate,
    error,
    
    // Getters
    gameTime,
    scoreDifference,
    totalFouls,
    isLastPeriod,
    
    // Acciones
    connectWebSocket,
    disconnectWebSocket,
    updateGameState,
    resetGame,
    getPlayerStats,
    getTeamPlayers
  };
});
import { ACBWsAdapter } from '@/services/acbWsAdapter';
import { useBasketStore } from '@/store/basket'; // tu store "basket"

let _adapter = null;

export function useBasketFeed() {
  if (!_adapter) {
    _adapter = new ACBWsAdapter(() => useBasketStore(), 'ws://localhost:8081');
  }
  const connect = (url) => _adapter.connect(url);
  const disconnect = () => _adapter.disconnect();

  // Opcional: parar el WS si la pestaña se oculta
  const enableVisibilityPause = () => {
    const onVis = () => (document.hidden ? disconnect() : connect());
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  };

  return { connect, disconnect, enableVisibilityPause };
}

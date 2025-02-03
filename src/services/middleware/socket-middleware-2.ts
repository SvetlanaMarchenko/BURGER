import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppActions, AppDispatch, RootState } from '../store';
import { refreshAccessToken } from '../../utils/api';

export const socketMiddleware = (wsUrl: string, actions, addTokenToUrl): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        let feedUrl = wsUrl
        if(addTokenToUrl) {
            const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
            feedUrl = `${wsUrl}token=${parsedAccessToken}`;
        }
        
        const reconnectSocket = async () => {
            const accessToken = await refreshAccessToken();
            console.log('Access token refreshed');
            socket?.close(); 
            const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
            // feedUrl = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
            feedUrl = `${wsUrl}token=${parsedAccessToken}`
            socket = new WebSocket(feedUrl);
            attachSocketHandlers(socket); 
        };

        const attachSocketHandlers = (socket: WebSocket) => {
            socket.onopen = (event: Event) => {
                store.dispatch({
                    type: actions.connectedSuccessfully,
                    payload: { type: event.type, isTrusted: event.isTrusted },
                });
            };

            socket.onerror = (event: Event) => {
                store.dispatch({ type: actions.error, payload: event });
            };

            socket.onmessage = async (event: MessageEvent) => {
                const { data } = event;
                const parsedData = JSON.parse(data);

                if (parsedData.message === 'Invalid or missing token') {
                    await reconnectSocket();
                } else {
                    store.dispatch({ type: actions.messageRecieved, payload: parsedData });
                }
            };

            socket.onclose = (event: CloseEvent) => {
                store.dispatch({ type: actions.stopped });
            };
        };

        return (next) => (action: AppActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === actions.start && !socket) {
                socket = new WebSocket(feedUrl);
                attachSocketHandlers(socket);
            }

            else if(type === actions.stop && socket) {
                //TODO: Close socker
                socket.close()
            }

            next(action);
        };
    }) as Middleware;
};

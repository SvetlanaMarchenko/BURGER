import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppActions, AppDispatch, RootState, TWSStoreActions } from '../store'; 

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }

            if (socket) {

                socket.onopen = (event: Event) => {
                    const payload = {
                        type: event.type,
                        isTrusted: event.isTrusted,
                    };
                    dispatch({
                        type: 'WS_CONNECTION_SUCCESS',
                        payload: payload,
                    });
                };
                
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;

                    try {
                        const parsedData = JSON.parse(data);
                        if (parsedData.message === 'Invalid or missing token') {
                            localStorage.removeItem('accessToken'); 
                            dispatch({
                                type: 'USER_LOGOUT',
                            });
                            console.error('Invalid or missing token');
                        } else {
                            dispatch({ type: 'WS_GET_MESSAGE', payload: data });
                        }
                    } catch (error) {
                        console.error('Error parsing message data:', error);
                    }
                };

                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };

                if (type === 'WS_SEND_MESSAGE') {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};

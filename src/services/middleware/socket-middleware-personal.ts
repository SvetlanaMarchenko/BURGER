import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppActions, AppDispatch, RootState, TWSStoreActions } from '../store';
import { refreshAccessToken } from '../../utils/api';

export const socketMiddlewarePersonal = (wsUrlPers: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
        const wsUrlPers = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
        let feedUrl = wsUrlPers;

        return (next) => (action: AppActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === 'WS_PERS_CONNECTION_START') {
                socket = new WebSocket(feedUrl);
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch({
                        type: 'WS_PERS_CONNECTION_SUCCESS',
                        payload: {
                            type: event.type,
                            isTrusted: event.isTrusted,
                        },
                    });
                };

                socket.onerror = (event: Event) => {
                    dispatch({ type: 'WS_PERS_CONNECTION_ERROR', payload: event });
                };

                socket.onmessage = async (event: MessageEvent) => {
                    const { data } = event;

                    const parsedData = JSON.parse(data);
                    if (parsedData.message === 'Invalid or missing token') {

                        const refreshToken = localStorage.getItem('refreshToken');

                        const accessToken = await refreshAccessToken()
                        console.log('Access token refreshed');
                        socket?.close();
                        feedUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`
                        socket = new WebSocket(feedUrl);
                    } else {
                        dispatch({ type: 'WS_PERS_GET_MESSAGE', payload: parsedData });
                    }

                //     try {
                //         const parsedData = JSON.parse(data);
                //         if (parsedData.message === 'Invalid or missing token') {
                //             localStorage.removeItem('accessToken');
                //             console.error('Invalid or missing token');
                //             if (refreshToken) {
                //                 try {
                //                     const response = await fetch('YOUR_REFRESH_TOKEN_API_URL', {
                //                         method: 'POST',
                //                         headers: {
                //                             'Content-Type': 'application/json',
                //                         },
                //                         body: JSON.stringify({ token: refreshToken }),
                //                     });

                //                     const result = await response.json();

                //                     if (result.accessToken) {
                //                         localStorage.setItem('accessToken', `Bearer ${result.accessToken}`);
                //                         console.log('Access token refreshed');
                //                         socket?.close();
                //                         feedUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`
                //                         socket = new WebSocket(feedUrl);
                //                     } else {
                //                         console.error('Failed to refresh token');
                //                     }
                //                 } catch (error) {
                //                     console.error('Error refreshing token:', error);
                //                 }
                //             } else {
                //                 console.error('No refresh token available');
                //             }
                //         } else {
                //             dispatch({ type: 'WS_PERS_GET_MESSAGE', payload: parsedData });
                //         }
                //     } catch (error) {
                //         console.error('Error parsing message data:', error);
                //     }
                };

                socket.onclose = (event: CloseEvent) => {
                    dispatch({ type: 'WS_PERS_CONNECTION_CLOSED', payload: event });
                };
            }

            // if (type === 'WS_PERS_CLEAR_ORDERS') {
            //     if (socket) {
            //         socket.close();
            //         socket = null;
            //         dispatch({ type: 'WS_PERS_CONNECTION_CLOSED', payload: null });
            //     }
            // }

            next(action);
        };
    }) as Middleware;
};

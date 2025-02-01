import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppActions, AppDispatch, RootState} from '../store';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        // let socket: WebSocket | null = null;
        let socket: WebSocket | null
        let feedUrl = wsUrl;

        return next => (action: AppActions) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(feedUrl);
            }
            
            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch({
                        type: 'WS_CONNECTION_SUCCESS',
                        payload: {
                            type: event.type,
                            isTrusted: event.isTrusted,
                        },
                    });
                };

                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };

                socket.onmessage = async event => {
                    const { data } = event;
                    const refreshToken = localStorage.getItem('refreshToken');
                    const parsedRefreshToken = refreshToken ? refreshToken.split(' ')[1] : null;
                
                    try {
                        const parsedData = JSON.parse(data);
                        if (parsedData.message === 'Invalid or missing token') {
                            localStorage.removeItem('accessToken');
                            dispatch({ type: 'USER_LOGOUT' });
                            console.error('Invalid or missing token');
                            if (parsedRefreshToken) {
                                try {
                                    const response = await fetch('YOUR_REFRESH_TOKEN_API_URL', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ token: parsedRefreshToken })
                                    });
                
                                    const result = await response.json();
                
                                    if (result.accessToken) {
                                        localStorage.setItem('accessToken', `${result.accessToken}`);
                                        console.log('Access token refreshed');
                                        socket.close();
                                        socket = new WebSocket(feedUrl);
                                    } else {
                                        console.error('Failed to refresh token');
                                    }
                                } catch (error) {
                                    console.error('Error refreshing token:', error);
                                }
                            } else {
                                console.error('No refresh token available');
                            }
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

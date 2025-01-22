import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppActions, AppDispatch, RootState, TWSStoreActions } from '../store';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        let feedUrl = wsUrl;

        return next => (action: AppActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(feedUrl);
            }
            
            if (socket) {
                // Обработчики событий WebSocket
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
                
                        // Проверка на недействительный или отсутствующий токен
                        if (parsedData.message === 'Invalid or missing token') {
                            localStorage.removeItem('accessToken');
                            dispatch({ type: 'USER_LOGOUT' });
                            console.error('Invalid or missing token');
                            
                            // Если есть refresh token
                            if (parsedRefreshToken) {
                                try {
                                    // Запрос на обновление токена
                                    const response = await fetch('YOUR_REFRESH_TOKEN_API_URL', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ token: parsedRefreshToken })
                                    });
                
                                    const result = await response.json();
                
                                    if (result.accessToken) {
                                        localStorage.setItem('accessToken', `${result.accessToken}`); // Приведение к нужному формату
                                        console.log('Access token refreshed');
                
                                        // Закрытие старого WebSocket соединения и создание нового
                                        socket.close();
                                        socket = new WebSocket(feedUrl); // Новый WebSocket с обновленным токеном
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
                            // Обработка нормального сообщения WebSocket
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
//             if (type === 'WS_CLEAR_ORDERS') {
//                 if (socket) {
//                     socket.close();
//                     socket = null;
// `                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: null });
//                     // console.log("old feedUrl:", feedUrl)
//                     // const accessToken = localStorage.getItem('accessToken');
//                     // const parsedAccessToken = accessToken ? accessToken.split(' ')[1] : '';
//                     // feedUrl = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
                    
                    
//                     // console.log("new feedUrl:", feedUrl)                    
//                 }
//                 dispatch({ type: 'WS_CONNECTION_START', payload: null });`

            // }

            next(action);
        };
    }) as Middleware;
};

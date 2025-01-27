 
        


        import type { Middleware, MiddlewareAPI } from 'redux';
        import type { AppActions, AppDispatch, RootState } from '../store';
        import { refreshAccessToken } from '../../utils/api';
        
        export const socketMiddlewarePersonal = (wsUrlPers: string): Middleware => {
            return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
                let socket: WebSocket | null = null;
                let feedUrl = wsUrlPers;
        
                // Функция для обновления токена и переподключения сокета
                const reconnectSocket = async () => {
                    const accessToken = await refreshAccessToken();
                    console.log('Access token refreshed');
                    socket?.close(); // Закрываем старое соединение
                    const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
                    feedUrl = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
                    socket = new WebSocket(feedUrl); // Создаем новый сокет
                    attachSocketHandlers(socket); // Привязываем обработчики к новому сокету
                };
        
                // Функция для привязки обработчиков к сокету
                const attachSocketHandlers = (socket: WebSocket) => {
                    socket.onopen = (event: Event) => {
                        store.dispatch({
                            type: 'WS_PERS_CONNECTION_SUCCESS',
                            payload: { type: event.type, isTrusted: event.isTrusted },
                        });
                    };
        
                    socket.onerror = (event: Event) => {
                        store.dispatch({ type: 'WS_PERS_CONNECTION_ERROR', payload: event });
                    };
        
                    socket.onmessage = async (event: MessageEvent) => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
        
                        if (parsedData.message === 'Invalid or missing token') {
                            await reconnectSocket();
                        } else {
                            store.dispatch({ type: 'WS_PERS_GET_MESSAGE', payload: parsedData });
                        }
                    };
        
                    socket.onclose = (event: CloseEvent) => {
                        store.dispatch({ type: 'WS_PERS_CONNECTION_CLOSED', payload: event });
                    };
                };
        
                return (next) => (action: AppActions) => {
                    const { dispatch } = store;
                    const { type, payload } = action;
        
                    if (type === 'WS_PERS_CONNECTION_START' && !socket) {
                        socket = new WebSocket(feedUrl);
                        attachSocketHandlers(socket); // Привязываем обработчики сразу после создания сокета
                    }
        
                    if (type === 'WS_PERS_SEND_MESSAGE' && socket && socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(payload)); // Отправляем сообщение
                    }
        
                    next(action);
                };
            }) as Middleware;
        };
        
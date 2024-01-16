import { API_URL } from '@configs/index';
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

export function useSocket() {
    const socketRef = useRef<Socket>();

    useEffect(() => {
        if (!socketRef.current) {
            const socket = io(API_URL);
            socketRef.current = socket;
        }
    }, []);

    return socketRef.current;
}

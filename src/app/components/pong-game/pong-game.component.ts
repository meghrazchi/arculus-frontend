import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
    selector: 'app-pong-game',
    templateUrl: './pong-game.component.html',
    styleUrls: ['./pong-game.component.css']
})
export class PongGameComponent implements OnInit, OnDestroy {
    private socket: any;
    playerId: string = localStorage.getItem('playerId') || '';
    gameState: any = {};
    gameStatus: string = 'Waiting for players...';

    ngOnInit(): void {
        this.socket = io('http://localhost:3000'); // Adjust backend URL

        this.socket.on('gameState', (gameState: any) => {
            this.gameState = gameState;

            if (gameState.gameStarted) {
                this.gameStatus = 'Game in progress!';
            } else {
                this.gameStatus = 'Waiting for players...';
            }
        });

        this.socket.emit('join', this.playerId);

        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                this.movePaddle('up');
                break;
            case 'ArrowDown':
                this.movePaddle('down');
                break;
            case 'ArrowLeft':
                this.movePaddle('left');
                break;
            case 'ArrowRight':
                this.movePaddle('right');
                break;
            default:
                break;
        }
    }

    movePaddle(direction: string): void {
        this.socket.emit('movePaddle', { direction });
    }

    ngOnDestroy(): void {
        this.socket.disconnect();
        document.removeEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    getPaddleStyle(player: any): object {
        return {
            width: `${player.paddle.width}px`,
            height: `${player.paddle.height}px`,
            top: `${player.paddle.y}px`,
            left: `${player.paddle.x}px`,
            backgroundColor: player.id === this.playerId ? 'blue' : 'white',
        };
    }

    getBallStyle(): object {
        return {
            top: `${this.gameState.ball.y}px`,
            left: `${this.gameState.ball.x}px`,
        };
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private router: Router) { }

    startGame(): void {
        const playerId = Math.random().toString(36).substring(2, 9);
        localStorage.setItem('playerId', playerId);
        this.router.navigate(['/game']);
    }
}

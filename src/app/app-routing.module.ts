import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PongGameComponent } from './components/pong-game/pong-game.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route to login
  { path: 'login', component: LoginComponent },          // Login route
  { path: 'game', component: PongGameComponent }          // Game route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

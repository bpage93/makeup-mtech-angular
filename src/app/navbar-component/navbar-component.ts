import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  userMenuItems = [
    { type: 'link', label: 'Profile', icon: 'person' },
    { type: 'link', label: 'Settings', icon: 'settings' },
    { type: 'divider' },
    { type: 'link', label: 'Logout', icon: 'logout' },
    { type: 'link', label: 'Makeup', icon: 'face' },
  ];
}

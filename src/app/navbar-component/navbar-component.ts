import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, TitleCasePipe],
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

  dashboardItems = [
    { type: 'link', label: 'Dashboard', icon: 'dashboard' },
    { type: 'link', label: 'Shop', icon: 'shopping_cart' },
    { type: 'link', label: 'Checkout', icon: 'payment' },
  ];

   themes = ['light', 'dark', 'luxury', 'cupcake', 'synthwave', 'retro','valentine', 'cyberpunk', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'];
}

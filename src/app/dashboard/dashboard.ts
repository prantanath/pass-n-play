import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {supabase} from '../../../.vscode/core/services/supabase-auth';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.css'
})
export class Dashboard {
  sidebarOpen : boolean = false;
  constructor(private router: Router) {
  }
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      return;
    }
    this.router.navigate(['/login']);
  }
}

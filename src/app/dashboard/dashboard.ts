import {Component, OnInit} from '@angular/core';
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
export class Dashboard implements OnInit {
  sidebarOpen : boolean = false;
  constructor(private router: Router) {
  }

  async ngOnInit() {
    await this.fetchUserProfile();
  }

  async fetchUserProfile() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
      return;
    }

    if (user) {
      const fullName = user.user_metadata?.['full_name'];
      console.log(user);
        const { error: insertError } = await supabase.from('profiles').insert([
          {
            user_id: user.id,
            fullName: fullName || '', // fallback to empty string if not found
          },
        ]);

        if (insertError) {
          console.error('Error inserting profile:', insertError.message);
        } else {
          console.log('✅ Profile created for first-time login');
        }
      }
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

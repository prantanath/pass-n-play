import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {supabase} from '../../.vscode/core/services/supabase-auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private router: Router) {
  }
  protected readonly title = signal('passnplay');
    async ngOnInit() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (user) {
        // Check profile exists
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // No profile, insert
          await supabase.from('profiles').insert([
            {
              id: user.id,
              full_name: user.email,
              role: 'viewer',
            },
          ]);
        }

        this.router.navigate(['/dashboard']);
      }
    }

}

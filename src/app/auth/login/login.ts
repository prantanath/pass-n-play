import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SupabaseAuth, supabase} from '../../../../.vscode/core/services/supabase-auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMsg!: string;
  private router!: Router;

  constructor(private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async loginWithGoogle() {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) console.error('Google login error:', error.message);
  }


}

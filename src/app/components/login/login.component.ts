import {Component, OnInit} from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  roles: string[] = ['admin', 'business'];


  constructor(private _router: Router, private _userService: UserService) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void
  {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.min(6)]),
      role: new FormControl(null, [Validators.required])
    })
  }

  submit(): void
  {
    if (this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched()
    }

    this._userService.loginFakeUser(this.loginForm.value);

    this._router.navigate(['/home'])
  }


}

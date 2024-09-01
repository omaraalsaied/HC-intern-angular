import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, FormArray} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private _router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.min(6)]],
      termsAndConditions: [false, [Validators.requiredTrue]],
      phoneNumbers: this._formBuilder.array([], [Validators.required, Validators.minLength(1)])
    });
  }

  get phoneNumbers() {
    return this.registerForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this._formBuilder.control('', Validators.required));
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }


  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    console.log(this.registerForm.value);
    this._router.navigate(['/login']);
  }
}

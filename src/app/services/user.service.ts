import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  constructor(private _router: Router) {
    this.userSubject = new BehaviorSubject<any | null>(this.getUserFromStorage());
    this.user = this.userSubject.asObservable();
  }

  private getUserFromStorage(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  public get userValue(): any | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    const currentUser = this.userValue;
    return !!(currentUser && currentUser[0]?.token);
  }

  isAdmin(): boolean {
    const currentUser = this.userValue;
    return this.isLoggedIn() && currentUser![0].role === 'admin';
  }

  loginFakeUser(data: any): void {
    const user: any = [{
      token: "fhkails9419y4h12g241",
      role: data.role
    }];
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/login']);
  }
}

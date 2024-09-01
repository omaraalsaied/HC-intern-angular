import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent, RouterLink} from "@angular/router";
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";
import {PostService} from "../../services/post.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isHomeRoute: boolean = false;

  constructor(private _postService: PostService, private _userService: UserService, private router: Router) {
  }


  ngOnInit(): void {
    this.setupSearch();
    this.setupUserStatus();
    this.RouteListener();
  }

  onSearch(): void {
    this.searchTerms.next(this.searchTerm);
  }

  private setupSearch(): void {
    const sub = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this._postService.setSearchTerm(term);
    });
    this.subs.push(sub);
  }

  setupUserStatus(): void {
    const sub = this._userService.user.subscribe(user => {
      this.isLoggedIn = this._userService.isLoggedIn();
      this.isAdmin = this._userService.isAdmin();
    });
    this.subs.push(sub);
  }

  RouteListener(): void {
    const sub = this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd) {
        this.isHomeRoute = event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/'
      }
    });
    console.log(this.isHomeRoute)
    this.subs.push(sub);
  }

  logout(): void
  {
    this._userService.logout();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}

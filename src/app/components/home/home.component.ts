import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../interfaces/post";
import {RouterLink} from "@angular/router";
import {PostComponent} from "../post/post.component";
import {debounce, debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PostComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  posts:Post[] = [];
  subs:Subscription[] = [];

  constructor(private _postService: PostService) {
  }

  ngOnInit(): void {
    const sub = this._postService.getPosts().subscribe({
      next:(posts:Post[]) =>{
        this.posts = posts;
      }
    });
    this.subs.push(sub);
    this.loadFilteredPosts();
  }

  loadFilteredPosts(): void
  {
    const sub = this._postService.getFilteredPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts
      }
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}

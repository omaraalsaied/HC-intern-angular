import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../interfaces/post";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy {

  post!: any;
  subs: Subscription[] = [];

  constructor(private _postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const route = this.route.params.subscribe(params => {
      const post_id = +params['id'];
      this.loadPost(post_id);
    })
    this.subs.push(route);
  }

  loadPost(post_id: number): void {
    const sub = this._postService.getPostWithComments(post_id).subscribe({
      next: (res: any) => {
        this.post = res;
        console.log(this.post)
      }, error(err: any) {
        console.error('error fetching post. \n', err.message);
      }
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }


}

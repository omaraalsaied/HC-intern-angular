import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {Post} from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private searchTerms = new BehaviorSubject<string>('');
  constructor(private _httpClient: HttpClient) { }

getPosts():Observable<any> {
    return this._httpClient.get('https://jsonplaceholder.typicode.com/posts');
}

getPostById(post_id:number):Observable<any>
{

  return this._httpClient.get(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
}

getPostWithComments(post_id:number):Observable<any> {
  return this.getPostById(post_id).pipe(
    switchMap(post => {
      return this.getPostComments(post.id).pipe(
        map((commentsList: any) => {
          return{
            ... post,
            comments:commentsList
          }
        })
      )
    })
  );
}

  getPostComments(post_id: number) :Observable<any>
  {
    return this._httpClient.get(`https://jsonplaceholder.typicode.com/comments?postId=${post_id}`);
  }

  setSearchTerm(term: string): void {
    this.searchTerms.next(term);
  }



  getFilteredPosts(): Observable<Post[]> {
    return this.searchTerms.pipe(
      switchMap(term =>
        this.getPosts().pipe(
          map(posts => posts.filter((post: Post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.body.toLowerCase().includes(term.toLowerCase())
          ))
        )
      )
    );
  }




}

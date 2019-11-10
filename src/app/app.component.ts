import { Component } from '@angular/core';

export interface Post {
  id?: number;
  title: string;
  text: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  posts: Post [] = [
    {id: 1, title: 'Angular', 
    text: 'Angular is a platform for building mobile and desktop web applications.'},
    
    {id: 2, title: 'React', 
    text: 'React is a JavaScript library for building user interfaces.'}
  ];
}

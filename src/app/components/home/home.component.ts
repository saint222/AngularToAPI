import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const currentUser = data['currentUser'];
      this.auth.currentUser$.next(currentUser);
    });
  }
}

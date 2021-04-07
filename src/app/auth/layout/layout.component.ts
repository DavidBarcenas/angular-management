import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isLogin = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.isLogin = this.router.url === '/login';

    this.http
      .get('http://ec2-3-17-146-140.us-east-2.compute.amazonaws.com/api/users')
      .subscribe(console.log);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(private router: Router,public diginix:DiginixService,) { }

  ngOnInit() {
  }

}
 
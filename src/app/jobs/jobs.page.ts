import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  constructor(private router: Router,public diginix:DiginixService,) { }

  ngOnInit() {
  }

}
 
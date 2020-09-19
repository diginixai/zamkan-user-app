import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(private router: Router,public diginix:DiginixService,) { 


  	window.open('whatsapp://send?phone=+971585922350', '_system', 'location=yes');
    this.router.navigate(['/home'],{});

  }

  ngOnInit() {
  }

}
 
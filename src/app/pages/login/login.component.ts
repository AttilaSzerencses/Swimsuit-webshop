import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    
  }

}

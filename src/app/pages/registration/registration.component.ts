import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rePassword: new FormControl()
  });

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signUpForm.get('password')?.value == this.signUpForm.get('rePassword')?.value){
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          username: this.signUpForm.get('username')?.value,
          email: this.signUpForm.get('email')?.value 
        }
        this.userService.create(user).then(_ =>{
          console.log('User added succesfully!');
        }).catch(error => {
          console.log(error);
        })
        this.router.navigateByUrl("/login");  
      }).catch(error => {
        console.log(error);
      });
    } else {
      console.log("A két jelszó nem egyezik!");
    }
   
  }

}

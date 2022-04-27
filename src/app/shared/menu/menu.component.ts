import { Component, OnInit,  EventEmitter, Output, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() loggedInUser?: firebase.default.User | null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })

  }

  logout () {
    this.authService.logout().then(() => {
      console.log("Logged out successfully.");
    }).catch(error => {
      console.log(error);
    });
  }

  

}

import { Component } from '@angular/core';
import { LoopBackConfig } from './shared/sdk/index';
import { User } from './shared/sdk/models';
import { UserApi } from './shared/sdk/services';
import { Router, ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  countries = [];
  identity: User;
  credentials: any;
  errorLogin : string;
  constructor(
    private userApi : UserApi,
    private route: ActivatedRoute,
    private router: Router
    ) {
    LoopBackConfig.setBaseURL('http://138.197.222.233');
    LoopBackConfig.setApiVersion('api'); 
    this.credentials = {
      email:'',
      password:'',
    };
    this.getIdentity();
  }

  login() {
    this.errorLogin = null;
    this.userApi.login(this.credentials).subscribe(
      response => {
      this.identity = response;
      localStorage.setItem('identity', JSON.stringify(this.identity));
      this.router.navigate(['/dashboard']);
      this.credentials.email = '';
      this.credentials.password = '';
    },
    error => {
      this.errorLogin = 'Email or password is wrong';
    });
    
  }

  async logout() {
    await this.userApi.logout(this.identity.id).subscribe(
      response => {
        localStorage.removeItem('identity');
        localStorage.clear();
        this.getIdentity();
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }

  getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined" && identity != null){
      this.identity = identity;
      this.router.navigate(['/dashboard']);
		}else{
			this.identity = null;
		}
	}

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}

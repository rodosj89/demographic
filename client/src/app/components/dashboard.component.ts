import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoopBackConfig } from '../shared/sdk/index';
import { Demographic, Country } from '../shared/sdk/models';
import { DemographicApi, CountryApi } from '../shared/sdk/services';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DemographicService } from '../services/demographic.service';

@Component({
  selector: 'dashboard',
  templateUrl: '../views/dashboard.html',
  styleUrls: ['../styles/dashboard.style.css'],
  providers: [DemographicService, NgxChartsModule]
})
export class DashboardComponent implements OnInit {
  title = 'dashboard';
  demographics : any[];
  population : any[];
  view : any[];
  newDemographic : Demographic;
  countries : any[];
  countrySelected: any;
  countryValid : boolean = true;
  identity : any;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  animations = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private demographicApi : DemographicApi,
    private countryApi : CountryApi,
    private countryService : DemographicService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.getIdentity();
    LoopBackConfig.setBaseURL('http://138.197.222.233');
    LoopBackConfig.setApiVersion('api'); 
    this.view = [innerWidth / 1.1, 360];
    this.getDemographic();
    this.newDemographic = new Demographic();
    this.getCountries();
  }

  ngOnInit(){
    this.countryService.onNewDemographic().subscribe(demographic => {
      this.demographics.push({
        name: demographic.country,
        value: demographic.population,
      });
      this.demographics = [...this.demographics];
    });
  }

  async getDemographic() {
    await this.demographicApi.find().subscribe(
      response => {
      let demographics : any[] = response;
      this.demographics = demographics.map((demographic) => {
        return {
          name : demographic.country,
          value : demographic.population,
        };
      });
    },
    error => {
      this.router.navigate(['/']);
    });
  }

  async getCountries() {
    await this.countryApi.find().subscribe(
      response => {
      let countries : any[]= response;
      this.countries = countries.map((country) => {
        return {
          name: country.name,
          code: country.code,
        }
      });
    },
    error => {
      this.router.navigate(['/']);
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.15, 360];
  }

  onSubmit() {
    if (this.validForm()) {
      this.demographicApi.create(this.newDemographic).subscribe((demographic) => {
        this.onCancel();
      });
    } 
  }

  onCancel() {
    this.countrySelected = {code: -1};
    this.newDemographic = new Demographic();
    this.countryValid = true;
  }

  validForm() {
    this.countryValid = (this.demographics.find((demographic) => 
      demographic.name.toUpperCase() == this.newDemographic.country.toUpperCase()) === undefined);
    return this.countryValid;
  }

  setNameCountries(country) {
    this.newDemographic.country = country;
  }

  getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
	}
}

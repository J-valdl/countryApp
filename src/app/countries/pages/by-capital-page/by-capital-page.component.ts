import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  constructor(private countriesServices: CountriesService) { }

  public countries: Country[] = []
  public isLoading: boolean = false
  public initialValue: string = ''

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {

    this.isLoading = true

    this.countriesServices.searchCapital(term).subscribe(async countries => {
      await this.delay(2000);
      this.countries = countries
      this.isLoading = false
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

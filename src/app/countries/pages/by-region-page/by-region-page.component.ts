import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  constructor(private countriesServices: CountriesService) { }

  public countries: Country[] = []
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region;

  searchByRegion(region: Region): void {

    this.selectedRegion = region;

    this.countriesServices.searchRegion(region).subscribe(countries => {
      this.countries = countries
    })
  }

}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debounceSuscription?: Subscription;

  @Input()
  public placeholder: string = ''

  @Input()
  public initialValue: string = ''

  // @Output()
  // public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  // emitValue(value: string): void {
  //   this.onValue.emit(value)
  // }

  onKeyPress(searchText: string) {
    this.debouncer.next(searchText)
  }

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
        console.log('Valor Emitido')
        //this.emitValue(value)
      })
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe()
  }

}

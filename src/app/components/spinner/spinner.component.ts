import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() text: string | null = null;

  constructor() {}

  ngOnInit(): void {}

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-passeger-check',
  templateUrl: './passeger-check.component.html',
  styleUrls: ['./passeger-check.component.css']
})
export class PassegerCheckComponent implements OnInit {

  listCheck = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

}

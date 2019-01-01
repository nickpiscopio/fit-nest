import { Component } from '@angular/core';
import { TableComponent } from '../../../../module/table/table.component';

@Component({
  selector: 'app-authorization-table',
  templateUrl: './authorization-table.component.html',
  styleUrls: ['./authorization-table.component.sass']
})
export class AuthorizationTableComponent extends TableComponent { }

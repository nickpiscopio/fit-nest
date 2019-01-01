import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  @Input() dataSource: any[];

  @Output() editEvent = new EventEmitter<{ index: number, data: any }>();

  editRow(index: number, data: any): void {
    this.editEvent.emit({ index: index, data: data });
  }
}

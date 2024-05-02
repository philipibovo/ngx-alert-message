import { Component } from '@angular/core';

@Component({
  selector: 'app-versions-config',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.scss'],
})
export class VersionsComponent {
  displayedColumns: string[] = ['version', 'angular'];
  dataSource = [
    { version: '0.0.8', angular: '16.0.0' },
    { version: '0.0.7', angular: '16.0.0' },
    { version: '0.0.6', angular: '16.0.0' },
    { version: '0.0.5', angular: '16.0.0' },
    { version: '0.0.4', angular: '16.0.0' },
    { version: '0.0.3', angular: '16.0.0' },
    { version: '0.0.2', angular: '16.0.0' },
    { version: '0.0.1', angular: '16.0.0' },
  ];

  constructor() {}
}

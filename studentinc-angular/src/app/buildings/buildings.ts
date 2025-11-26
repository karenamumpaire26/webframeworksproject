import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BuildingsService, Building } from './buildings.service';

@Component({
  selector: 'app-root', // this will be your root component
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './buildings.html',
  styleUrls: ['./buildings.css']
})
export class BuildingsComponent implements OnInit {
  title = 'Campus Buildings';
  buildings: Building[] = [];
  loading = false;
  error = '';

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.buildingsService.getBuildings().subscribe({
      next: data => {
        this.buildings = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load buildings. Please try again.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}

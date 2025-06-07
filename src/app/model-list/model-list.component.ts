import { Component, OnInit } from '@angular/core';
import { modellist } from '../services/modellist.service'; 
import { Carmodel } from '../model/carmodel.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  models: Carmodel[] = [];
  searchModelName: string = '';
  searchModelCode: string = '';
  imageUrl: string = '';
  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items per page
  totalModels: number = 0; // Total number of models
  sortBy: keyof Carmodel = 'dateOfManufacturing';
  sortOrder: 'asc' | 'desc' = 'desc'; // For sorting order
  constructor(private modelService: modellist, private router: Router,private sanitizer: DomSanitizer) { } 
  ngOnInit(): void {
    this.loadModels();
  }

  loadModels() {
    this.modelService.getModels().subscribe(
      (models: Carmodel[]) => {
        this.models = models; 
        this.totalModels = this.models.length; // Total number of models
        this.paginateModels();         
        this.models.forEach(model => {
          if (model.image) {
            model.ImageURL = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${model.image}`) as SafeUrl;
          } else {
            // Handle cases where model.Image is undefined or empty
            model.ImageURL = ''; // or set to a default image URL or placeholder
          }
        });
        console.log(this.models);
        this.sort(); // Sort models after loading
      },
      (error) => {
        console.error('Error loading models:', error);
        // Implement error handling/notification service as required
      }
    );
  }

  search() {
    // Implement search logic based on searchModelName and searchModelCode
    this.models = this.models.filter(model =>
      model.modelName.toLowerCase().includes(this.searchModelName.toLowerCase()) &&
      model.modelCode.toLowerCase().includes(this.searchModelCode.toLowerCase())
    );
  }

  sort() {
    this.models.sort((a, b) => {
      const propA = a[this.sortBy];
      const propB = b[this.sortBy];

      if (propA !== undefined && propB !== undefined) {
        let comparison = 0;
        if (propA < propB) comparison = -1;
        if (propA > propB) comparison = 1;
        return this.sortOrder === 'asc' ? comparison : -comparison;
      }

      if (propA === undefined && propB !== undefined) return 1;
      if (propA !== undefined && propB === undefined) return -1;
      return 0;
    });
  }

  resetSearch() {
    this.searchModelName = '';
    this.searchModelCode = '';
    this.loadModels();
  }

  addNewModel() {
    this.router.navigate(['/car-model-management']);
  }

  setSort(column: keyof Carmodel) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.sort();
  }

  getSortClass(column: keyof Carmodel): string {
    if (this.sortBy !== column) {
      return '';
    }
    return this.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
  }
  paginateModels() {
    // Paginate models based on currentPage and pageSize
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.models = this.models.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.paginateModels(); 
  }

  getPages(): number[] {
    // Calculate total number of pages based on total models and page size
    const pageCount = Math.ceil(this.totalModels / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}

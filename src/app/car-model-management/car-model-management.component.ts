import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { carmodel } from '../services/carmodel.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// Define the ImagePreview interface
interface ImagePreview {
  file: File;
  url: string;
}

@Component({
  selector: 'app-car-model-management',
  templateUrl: './car-model-management.component.html',
  styleUrls: ['./car-model-management.component.css'],
})

export class CarModelManagementComponent implements OnInit {
  carModelForm: FormGroup;
  public Editor = ClassicEditor;
  brands = ['Audi', 'Jaguar', 'Land Rover', 'Renault'];
  classes = ['A-Class', 'B-Class', 'C-Class'];
  selectedFiles: ImagePreview[] = [];
  constructor(private fb: FormBuilder,private apiService: carmodel,private router: Router, private dialog: MatDialog) {
    this.carModelForm = this.fb.group({
      Brand: ['', Validators.required],
      Class: ['', Validators.required],
      ModelName: ['', Validators.required],
      ModelCode: ['', Validators.required],
      Description: ['', Validators.required],
      Features: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      DateOfManufacturing: ['', Validators.required],
      Active: [false],
      SortOrder: ['', [Validators.required, Validators.min(0)]],
      Images: [[],Validators.minLength(1)]
    });
  }

  async ngOnInit(): Promise<void> {await this.resolveComponentResources();}
  private async resolveComponentResources() {
    // Simulate the resolution of component resources
    await new Promise(resolve => setTimeout(resolve, 100)); // Example delay to simulate async resolution
    // Add actual resource resolution logic here if needed
  }
  onFileChange(event: any) {
    const files = event.target.files;
    const maxSize = 5 * 1024 * 1024; 
    let validFiles = [];

    for (let file of files) {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        alert(`File ${file.name} exceeds the 5MB limit and will not be uploaded.`);
      }
    }

    if (validFiles.length > 0) {
      // Convert files to ImagePreview objects with URLs
      for (let file of validFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
      this.carModelForm.patchValue({ Images: this.selectedFiles.map(file => file.file) });
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.carModelForm.patchValue({ Images: this.selectedFiles.map(file => file.file) });
  }

  submitForm() {
    if (this.carModelForm.valid) {
      // Handle form submission
      const formData = new FormData();
      for (let file of this.selectedFiles.map(file => file.file)) {
        formData.append('images', file, file.name);
      }
      for (let key in this.carModelForm.value) {
        if (key !== 'Images') {
          formData.append(key, this.carModelForm.value[key]);
        }
      }

      // Perform the submission to the server
      // Example: this.http.post('your-endpoint-url', formData).subscribe(...);
      this.apiService.postData(formData).subscribe(
        (response) => {          
            this.router.navigate(['/car-model-list']);
        },
        (error) => {
          console.error('API Error:', error);
          // Handle error as needed
        }
      );
    } else {
      // Handle validation errors
      console.log('Form is invalid');
    }
  }
}

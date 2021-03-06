import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomepageArea } from 'src/app/shared/interfaces/homepage-area.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DbDeleteService } from 'src/app/shared/services/database/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbUploadService } from 'src/app/shared/services/database/db-upload.service';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-homepage-edit-alert',
  templateUrl: './homepage-edit-alert.component.html',
  styleUrls: ['./homepage-edit-alert.component.scss'],
})
export class HomepageEditAlertComponent implements OnInit {
  constructor(private dbFetchDataService: DbFetchDataService,
              private dbWebsiteEditService: DbWebsiteEditService,
              private dbDeleteService : DbDeleteService,
              private dbUploadService : DbUploadService) {}

  @Input() product: Product;
  @Output() close = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  homepageAreas: HomepageArea[];
  area;

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.getAreas();
  }

  getAreas() {
    this.homepageAreas = [];
    this.dbFetchDataService.fetchHomepageAreas().subscribe((areas) => {
      for (let area of areas) {
        this.homepageAreas.push(area);
      }
      return this.homepageAreas;
    });
  }
  onAdd(selectedArea) {
    if (selectedArea.value === 'Carousel') {
      this.dbWebsiteEditService.addToCarousel(this.product.key, this.product.category);
    } else if (selectedArea.value === '') {
      this.dbFetchDataService.fetchFromCarousel().subscribe((data) => {
        for (let carouselProduct of data) {
          if (carouselProduct.id === this.product.key) {
            this.dbDeleteService.deleteFromCarousel(carouselProduct.key).subscribe();
          }
        }
      });
    }
    this.dbUploadService
      .updateProduct(this.product, selectedArea.value)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log('error:', error);
        }
      );

    this.changed.emit();
  }
}

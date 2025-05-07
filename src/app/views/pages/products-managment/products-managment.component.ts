import { Component, NgModule } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products-managment',
  standalone: true,
  imports: [
    SweetAlert2Module,
    FormsModule,
    CurrencyPipe,
    NgFor,
    NgIf
  ],
  templateUrl: './products-managment.component.html',
  styleUrl: './products-managment.component.scss'
})
export class ProductsManagmentComponent {
  products: Product[] = [];
  newProductName: string = '';
  newProductPrice: number = 0;
  newProductCategory: string = '';
  categories: string[] = [];
  customCategory: string = ''; 

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.loadProducts();
      this.extractCategories(); 
    } catch (error) {
      console.error('Fehler beim Laden der Produkte', error);
      this.showToast('Error while loading products.', 'error');
    }
  }

  extractCategories() {
    const allCategories = this.products.map(product => product.category).filter(Boolean);
    this.categories = [...new Set(allCategories)]; 
  }

  async addProduct() {
    if (this.newProductName && this.newProductPrice > 0 && (this.newProductCategory || this.customCategory)) {
      const newProduct: Omit<Product, 'id'> = {
        name: this.newProductName,
        price: this.newProductPrice,
        category: this.customCategory || this.newProductCategory, 
      };

      try {
        const product = await this.productService.addProduct(newProduct); 
        this.products.push(product);
        this.newProductName = '';
        this.newProductPrice = 0;
        this.newProductCategory = '';
        this.customCategory = ''; 

        this.extractCategories();

        this.showToast('Product added successfully!', 'success');
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Produkts', error);
        this.showToast('Error while adding product. Please try again.', 'error');
      }
    } else {
      this.showToast('Please fill all required fields.', 'warning');
    }
  }

  async deleteProduct(productId: string) {
    try {
      await this.productService.deleteProduct(productId);
      this.products = this.products.filter((product) => product.id !== productId.toString());

      this.showToast('Product deleted successfully!', 'success');
    } catch (error) {
      console.error('Fehler beim Löschen des Produkts', error);
      this.showToast('Error while deleting product. Please try again.', 'error');
    }
  }

  private showToast(message: string, icon: 'success' | 'error' | 'info' | 'warning') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icon,
      title: message
    });
  }
}

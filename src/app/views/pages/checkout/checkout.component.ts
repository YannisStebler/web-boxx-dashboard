import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../models/product.model';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  products: Product[] = [];
  cart: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;
  paidAmount: number = 0;
  paidAmountInput: string = '0';

  extras: Product[] = [
    { id: 'extra1', name: 'Extra 1Fr', price: 1, category: 'Extras' },
    { id: 'extra2', name: 'Extra 2Fr', price: 2, category: 'Extras' },
    { id: 'extra3', name: 'Extra 5Fr', price: 5, category: 'Extras' },
  ];

  numpadLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '.', '⌫'],
  ];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.productService.loadProducts().then((products) => {
      this.products = [...products, ...this.extras];
    });
  }

  addToCart(product: Product) {
    const item = this.cart.find((i) => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.totalAmount += product.price;
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex((i) => i.product.id === product.id);
    if (index !== -1) {
      this.totalAmount -= this.cart[index].product.price;
      this.cart[index].quantity--;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  handleNumpadInput(key: string) {
    if (key === '⌫') {
      this.paidAmountInput = this.paidAmountInput.slice(0, -1) || '0';
    } else if (key === '.') {
      if (!this.paidAmountInput.includes('.')) {
        this.paidAmountInput += '.';
      }
    } else {
      this.paidAmountInput =
        this.paidAmountInput === '0' ? key : this.paidAmountInput + key;
    }

    this.paidAmount = parseFloat(this.paidAmountInput) || 0;
  }

  updatePaidAmount() {
    this.paidAmount = parseFloat(this.paidAmountInput) || 0;
  }

  confirmPayment() {
    const order = {
      products: this.cart.reduce((acc: { [key: string]: number }, item) => {
        acc[item.product.name] = item.quantity;
        return acc;
      }, {}),
      totalAmount: this.totalAmount,
    };

    this.orderService.addOrder(order);
    this.cart = [];
    this.totalAmount = 0;
    this.paidAmount = 0;
    this.paidAmountInput = '0';
  }

  cancelPayment() {
    this.cart = [];
    this.totalAmount = 0;
    this.paidAmount = 0;
    this.paidAmountInput = '0';
  }
}

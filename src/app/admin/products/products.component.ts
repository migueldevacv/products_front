import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ChangeDetectorRef, Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IntProduct } from '../../interfaces/Catalogs/ProductsInterface';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../global/services/notification.service';
import { ErrorInterface } from '../../global/interfaces/ErrorInterface';
import { IntCategories } from '../../interfaces/Catalogs/CategoriesInterface';
import { CategoriesService } from '../../services/categories.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductsService, MessageService, ConfirmationService,]
})
export class ProductsComponent implements OnInit {
  categories!: IntCategories[];
  loadingTable = signal(false);
  submitted = signal(false);
  loading = signal(false);
  productDialog: boolean = false;
  products!: IntProduct[];
  @Input() product!: IntProduct;

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getCategories(): void {
    this._categoriesService.getActive().subscribe(({ data }) => {
      this.categories = data;
    });
  }

  getProducts(): void {
    this.loadingTable.set(true)
    this._productService.get().subscribe(({ data }) => {
      this.products = data;
      this.loadingTable.update(l => false)
    });
  }

  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductsService,
    private _confirmationService: ConfirmationService,
    private _noty: NotificationService
  ) {
  }

  exportCSV() {
    this._productService.exportXlsx().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.xlsx'; // Nombre del archivo
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: ErrorInterface) => {
        this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
      }
    })
  }

  openNew() {
    this.product = {} as IntProduct;
    this.productDialog = true;
  }

  editProduct(product: IntProduct) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted.set(false);
  }

  deleteProduct(product: IntProduct) {
    this._confirmationService.confirm({
      message: `Are you sure you want to ${product.status ? 'deactivate' : 'activate'} ` + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (product.id)
          this._productService.delete(product.id).subscribe({
            next: ({ message }) => {
              this._noty.bottomRight({ severity: 'success', summary: message }).show()
              this.getProducts()
              this.hideDialog()
            },
            error: (error: ErrorInterface) => {
              this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
            }
          });
      }
    });
  }

  getSeverity = (status: number) => status === 1 ? 'success' : 'danger'

  saveProduct() {
    this.submitted.set(true);
    this.loading.set(true);

    if (this.product.id) this.updateCategory(this.product.id)
    else this.createCategory()

    this.loading.update(l => false)
  }

  createCategory() {
    this._productService.post(this.product).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getProducts()
        this.hideDialog()
      },
      error: (error: ErrorInterface) => {
        this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
        this.loading.update(l => false)
      },
      complete: () => {
        this.loading.update(l => false)
      }
    });
  }

  updateCategory(id: number) {
    this._productService.update(id, this.product).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getProducts()
        this.hideDialog()
      },
      error: (error: ErrorInterface) => {
        this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()

        this.loading.update(l => false)
      },
      complete: () => {
        this.loading.update(l => false)
      }
    });
  }
}


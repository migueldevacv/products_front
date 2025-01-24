import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ChangeDetectorRef, Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CategoriesService } from '../../services/categories.service';
import { IntCategories } from '../../interfaces/Catalogs/CategoriesInterface';
import { NotificationService } from '../../global/services/notification.service';
import { ErrorInterface } from '../../global/interfaces/ErrorInterface';

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
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [CategoriesService, MessageService, ConfirmationService,]
})
export class CategoriesComponent {
  statuses = [{ label: 'ACTIVE', value: 1 }, { label: 'INACTIVE', value: 0 }];
  categoryDialog: boolean = false;
  categories!: IntCategories[];
  submitted = signal(false);
  loading = signal(false);
  @Input() category!: IntCategories;

  ngOnInit(): void {
    this.getCategories()
  }


  constructor(
    private _categoriesService: CategoriesService,
    private _confirmationService: ConfirmationService,
    private _noty: NotificationService
  ) {
  }

  exportCSV() {/* this.dt.exportCSV(); */ }

  getCategories() {
    this._categoriesService.get().subscribe(({ data }) => {
      this.categories = data;
    });
  }

  openNew() {
    this.category = {} as IntCategories;
    this.categoryDialog = true;
  }

  editCategory(category: IntCategories) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted.set(false);
  }

  deleteCategory(category: IntCategories) {
    this._confirmationService.confirm({
      message: `Are you sure you want to ${category.status ? 'deactivate' : 'activate'} ` + category.description + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (category.id)
          this._categoriesService.delete(category.id).subscribe({
            next: ({ message }) => {
              this._noty.bottomRight({ severity: 'success', summary: message }).show()
              this.getCategories()
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

  saveCategory() {
    this.submitted.set(true);
    this.loading.set(true);
    if (this.category.id) this.updateCategory(this.category.id)
    else this.createCategory()
  }

  createCategory() {
    this._categoriesService.post(this.category).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getCategories()
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
    this._categoriesService.update(id, this.category).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getCategories()
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

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Message } from 'primeng/message';
import { ProductsComponent } from './products/products.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarModule } from 'primeng/sidebar';
import { Menu } from 'primeng/menu';
import { Divider } from 'primeng/divider';
import { Ripple } from 'primeng/ripple';


// import { Product } from '@/domain/product';
// import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [AdminComponent, ProductsComponent, CategoriesComponent],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    FloatLabel,
    IconField,
    InputIcon,
    Message,
    SidebarModule,
    Menu,
    Divider,
    Ripple,

    // tablaaas 
    TableModule,
    Dialog,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    TextareaModule,
    FileUpload,
    SelectModule,
    Tag,
    RadioButton,
    Rating,
    InputNumber,
    IconFieldModule,
    InputIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class AdminModule { }

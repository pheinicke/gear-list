import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { ItemsPage } from './items/items.page';
import { ListsPage } from './lists/lists.page';
import { ContextComponent } from './_components/context/context.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditItemDialogComponent } from './_components/edit-item-dialog/edit-item-dialog.component';
import { ConfirmDialogComponent } from './_components/confirm-dialog/confirm-dialog.component';
import { EditListDialogComponent } from './_components/edit-list-dialog/edit-list-dialog.component';
import { ListPage } from './list/list.page';
import { SelectItemsDialogComponent } from './_components/select-items-dialog/select-items-dialog.component';
import { ItemListComponent } from './_components/item-list/item-list.component';
import { AddListDialogComponent } from './_components/add-list-dialog/add-list-dialog.component';
import { ListItemsComponent } from './_components/list-items/list-items.component';

@NgModule({
    declarations: [
        AppComponent,
        ContextComponent,
        ItemsPage,
        ListsPage,
        ListPage,
        EditItemDialogComponent,
        EditListDialogComponent,
        ConfirmDialogComponent,
        SelectItemsDialogComponent,
        ItemListComponent,
        AddListDialogComponent,
        ListItemsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        AppRoutingModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSortModule,
        MatCheckboxModule,
        MatRippleModule,
        MatExpansionModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

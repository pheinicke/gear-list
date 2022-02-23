import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsPage } from './items/items.page';
import { ListsPage } from './lists/lists.page';
import { TemplatesPage } from './templates/templates.page';
import { ListPage } from './list/list.page';

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'items', component: ItemsPage },
    { path: 'lists', component: ListsPage },
    { path: 'lists/:id', component: ListPage },
    { path: 'templates', component: TemplatesPage },
    { path: '**', redirectTo: '/items' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

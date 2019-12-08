import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsItemComponent} from './news-item/news-item.component';
import {NewsComponent} from './news/news.component';

const routes: Routes = [
    {path: '', component: NewsComponent},
    {path: 'news/:id', component: NewsItemComponent}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

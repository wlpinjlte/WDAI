import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component'
import {PhotosComponent} from './photos/photos.component'
import { PostsComponent } from './posts/posts.component';
import { SinglephotoComponent } from './singlephoto/singlephoto.component';
const routes: Routes = [{ path: 'main-page', component: MainPageComponent },
{ path: 'photos/:id', component: SinglephotoComponent},
{ path: 'photos', component: PhotosComponent },
{ path: 'posts', component: PostsComponent},
{ path: '', redirectTo: '/main-page', pathMatch: 'full' }
// { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

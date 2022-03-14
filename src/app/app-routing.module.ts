import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    component : PokemonComponent,

  },
  {
    path : 'favorites',
    component : FavoritesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

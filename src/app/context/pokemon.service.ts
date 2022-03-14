import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ipokemon } from '../pokemon/pokemon.component';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  sessionKey = "favoritos"


  constructor(private htttp: HttpClient) {

  }

  get_one_pokemon(query: any) {
    return this.htttp.get(environment.pokemon_api + query)
  }

  get_pokemon_list(query: any) {
    return this.htttp.get(environment.pokemon_api + query)

  }


  save_favorites(pokemon: any) {

    let favoritos = []

    const data = sessionStorage.getItem(this.sessionKey)
    if (data) favoritos = JSON.parse(data)

    favoritos.push(pokemon)
    sessionStorage.setItem(this.sessionKey, JSON.stringify(favoritos))
    alert("Agregado")

  }


  get_favorites() {

    let favoritos : Ipokemon[] = []

    const data = sessionStorage.getItem(this.sessionKey)
    if (data) favoritos = JSON.parse(data)

    return favoritos
  }

  update_favorite(old_alias: string, favorite_name: string){

    let favorite_list = this.get_favorites()

   let found_favorite = favorite_list.find(x=>x.alias == old_alias)
   if(found_favorite)
      found_favorite.alias = favorite_name


   sessionStorage.setItem(this.sessionKey, JSON.stringify(favorite_list))

    return favorite_list;
  }


  delete_favorite(favorite_name: string){

    let favorite_list = this.get_favorites()

   favorite_list = favorite_list.filter((x=>x.alias !== favorite_name))
   console.log(favorite_list, favorite_name)
   sessionStorage.setItem(this.sessionKey, JSON.stringify(favorite_list))

    return favorite_list

  }

}

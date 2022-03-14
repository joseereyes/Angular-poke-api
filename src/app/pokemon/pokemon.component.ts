import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { firstValueFrom } from 'rxjs';
import { PokemonService } from '../context/pokemon.service';

export interface Ipokemon {
  alias?: string,
  name: string,
  picture: string
  abilities?: {}[]
}


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {


  modalRef: BsModalRef
  message: string
  // name: string

  pokemon: Ipokemon

  page = 0;
  pokemon_list: any = []
  itemsPerPage = 10;
  totalItems: 30;

  alias: string = ""


  constructor(
    private PokemonService: PokemonService,
    private modalService: BsModalService

  ) {

  }


  get_one_pokemon_data(name: string) {

    this.PokemonService.get_one_pokemon(`pokemon/${name}`).subscribe((data: any) => {

      this.pokemon = {
        name: data.name,
        picture: data.sprites.front_shiny
      }
    })
  }

  get_pokemon_list(page: any) {

    this.PokemonService.get_pokemon_list(`pokemon?offset=${page}&limit=${this.itemsPerPage}`).subscribe(async (data: any) => {
      this.totalItems = data.count

      this.pokemon_list = await Promise.all(data.results.map(async (item: any) => {
        const data$ = this.PokemonService.get_one_pokemon(`pokemon/${item.name}`);
        const value: any = await firstValueFrom(data$)
        return {
          name: value.name,
          picture: value.sprites.front_shiny,
          abilities: value.abilities
        }
      }))
    })
  }

  save_favorites() {

    if (!this.alias.trim()) {
      alert("Esta vacio el alias")
    } else {
      this.pokemon.alias = this.alias
      this.PokemonService.save_favorites(this.pokemon)
      this.decline()
      this.alias = ""
    }
  }



  openModal(template: TemplateRef<any>, pokemon: Ipokemon) {

    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
    this.pokemon = pokemon
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  ngOnInit(): void {
    this.get_pokemon_list(0)
  }
}

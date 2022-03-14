import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PokemonService } from '../context/pokemon.service';
import { Ipokemon } from '../pokemon/pokemon.component';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


  modalRef: BsModalRef
  message: string

  pokemon: Ipokemon
  alias: string

  alias_selected: string


  favorite_list: Ipokemon[]
  total_favorites: number

  constructor(

    private PokemonService: PokemonService,
    private modalService: BsModalService

  ) { }

  get_favorites() {

    this.favorite_list = this.PokemonService.get_favorites()
    this.total_favorites = this.favorite_list.length
  }

  delete_favorite(alias_name: any) {
    this.favorite_list = this.PokemonService.delete_favorite(alias_name)
    this.total_favorites = this.favorite_list.length
    alert("Eliminado")

  }

  editFavorite() {
    if (this.alias && this.alias.length > 0) {
      this.favorite_list = this.PokemonService.update_favorite(this.alias_selected, this.alias)
      alert("Editado")
      this.alias_selected = ""
      this.alias = ""
      this.decline()
    } else {
      alert("El campo alias esta vacio");
    }
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }


  openModal(template: TemplateRef<any>, alias: string) {

    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
    this.alias_selected = alias
  }

  alias_selector(alias_string: string) {
    this.alias_selected = alias_string
  }

  ngOnInit(): void {
    this.get_favorites()
  }
}

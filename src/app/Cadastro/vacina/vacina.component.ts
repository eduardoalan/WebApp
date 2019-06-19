import { Component, OnInit } from '@angular/core';
import { Vacina } from './models/vacina';
import { VacinaService } from './vacina.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Animal } from '../animal/models/animal';
import { AnimalService } from '../animal/animal.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  vacina : Vacina;
  displayedColumns: string[] = ['actionsColumn','animal', 'data', 'peso', 'dosagem', 'aplicador', 'descricao'];
  teste: any;
  vacinas: Vacina[];
  animais: Animal[];
  dataSource: any;
  edit: boolean;

  paginator: MatPaginator;
  sort: MatSort;
  constructor(private Service: VacinaService, private animalService : AnimalService) { }

  ngOnInit() {
    this.vacina = new Vacina();
    this.vacinas = new Array<Vacina>();
    this.animais = new Array<Animal>();
    this.animalService.findAll().subscribe(subscribe =>{
      this.animais = subscribe;
    })
    this.listAll();
  }

  listAll(){
    this.Service.findAll().subscribe(response => {
      if (response)
        this.loadTable(response);
        console.log(response);
    }, error => {
      console.log(error);
    });
  }

  loadTable(vacinas: any){
    this.dataSource = new MatTableDataSource<Vacina>(vacinas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  salvar(){
    this.Service.save(this.vacina).subscribe(response => {
      if (response){
        alert('Salvou!!!!');
        this.listAll();
      }
    }, error => {
      console.log(error);
    });
    this.vacina = new Vacina();
  }

  excluir(idVacina: number){
    this.Service.remove(idVacina).subscribe(response => {
      if (response)
        alert('Deletou');      
        this.listAll();
    }, error => {
      console.log(error);
    });
  }

  markEdit(vacina: any){
    this.vacina = vacina;
    this.edit = true;
  }

  atualizar(){
    this.Service.update(this.vacina).subscribe(response => {
      if (response){
        alert('Atualizou!!!!');
        this.listAll();
        this.edit = false;
        this.vacina = new Vacina();
      }        
    }, error => {
      console.log(error);
    });
  }


}

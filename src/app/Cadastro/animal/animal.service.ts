import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { environment } from 'src/environments/environment';
import { Animal } from './models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http:HttpClient) { }

  save(animal: Animal): Observable<any>{
    return this.http.post(environment.urlApi+"animals/", animal)
    .catch((error: any) => Observable.throw(error));
  }
  
  update(animal: Animal): Observable<any>{
    return this.http.put(environment.urlApi+"animals/"+animal.idAnimal, animal)
    .catch((error: any) => Observable.throw(error));
  }
  
  findAll(): Observable<any>{
    return this.http.get(environment.urlApi+"animals/")
    .catch((error: any) => Observable.throw(error));
  }
  
  remove(idAnimal: number): Observable<any> {
    return this.http.delete(environment.urlApi+"animals/"+idAnimal)
    .catch((error: any) => Observable.throw(error));
  }
  
  }
  
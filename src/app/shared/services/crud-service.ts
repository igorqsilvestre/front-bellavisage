import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";

export class CrudService<T extends Identificador> {

  constructor(protected http: HttpClient, private API_URL:string){}

  private criar(record: T): Observable<T>{
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  private atualizar(record: T): Observable<T>{
    return this.http.put<T>(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  obterTodos(): Observable<T[]>{;
    return this.http.get<T[]>(this.API_URL).pipe(take(1));
  }

  obter(id:number): Observable<T>{;
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  excluir(id:number): Observable<T>{;
    return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  salvar(record: T): Observable<T>{
    if(record.id === null){
      return this.criar(record)
    }else{
      return this.atualizar(record);
    }
  }
}

interface Identificador{
  id:number;
}

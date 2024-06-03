import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';
import { TodoEndpoints } from './networking/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this._httpClient.get<Todo[]>(TodoEndpoints.GET_ALL);
  }

  getById(id: number): Observable<Todo> {
    return this._httpClient.get<Todo>(`${TodoEndpoints.GET_BY_ID}/${id}`);
  }
}

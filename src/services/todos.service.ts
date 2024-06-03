import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../app/models/todo';
import { TodoEndpoints } from '../app/networking/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this._httpClient.get<Todo[]>(TodoEndpoints.GET_ALL);
  }

  getById(id: number): Observable<Todo> {
    const endpoint = TodoEndpoints.GET_BY_ID.replace('{id}', id.toString());
    return this._httpClient.get<Todo>(endpoint);
  }
}

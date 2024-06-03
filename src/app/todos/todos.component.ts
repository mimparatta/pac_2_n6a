import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  error: string | null = null;
  searchText: string = '';
  showSearchDialog: boolean = false;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.todosService.getAll().subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.filteredTodos = data;
        this.error = null;
      },
      (error) => {
        console.error('Error fetching todos', error);
        this.error = 'Error fetching todos';
      }
    );
  }

  openSearchDialog(): void {
    this.showSearchDialog = true;
  }

  closeSearchDialog(): void {
    this.showSearchDialog = false;
  }

  searchTodos(): void {
    if (this.searchText.trim() === '') {
      this.filteredTodos = this.todos;
      this.error = null;
      return;
    }

    this.filteredTodos = this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.filteredTodos.length === 0) {
      this.error = 'No results found';
    } else {
      this.error = null;
    }

    this.closeSearchDialog();
  }
}

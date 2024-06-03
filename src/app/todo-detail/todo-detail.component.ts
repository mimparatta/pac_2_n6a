import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.todosService.getById(id).subscribe(
        (data: Todo) => {
          this.todo = data;
          this.error = null;
        },
        (error) => {
          console.error('Error fetching todo', error);
          this.error = 'Error fetching todo';
        }
      );
    });
  }
}

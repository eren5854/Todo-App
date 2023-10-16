import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: TodoModel[] = []
  todo: TodoModel[] = [];
  done: TodoModel[] = [];
  trashItem: TodoModel[] = [];
  request: TodoModel = new TodoModel();
  newTodo: string = "";
  isComplated:boolean = false;
  updateId: number = 0;
  updateWork: string = "";
  updateIsComplated: boolean = false;
  updatebtn:boolean = false;

  updateInput = document.getElementById("updateInput");

  constructor(private http: HttpClient){
    this.getAll();
  }

  getAll(){
    this.http.get<TodoModel[]>("https://localhost:7032/api/Todos/GetAll")
    .subscribe(res => {
      this.todos = res;
      this.splitTodosToTodoAndDone();
      this.newTodo = "";
    })
  }

  addTodo(){
    if(this.newTodo===""){
      alert("Lütfen bir görev giriniz!");
    }
    else{
      this.request.work = this.newTodo;
      this.http.post<TodoModel[]>("https://localhost:7032/api/Todos/Add", this.request)
      .subscribe(res => {
        this.todos = res;
        this.getAll();
      })
    }
    // console.log(this.newTodo);
  }

  updateDb(){
    this.request.id = this.updateId;
    this.request.work = this.newTodo;
    this.request.isComplated = this.updateIsComplated;
    console.log(this.request);
    if(this.newTodo===""){
      alert("Lütfen bir görev giriniz!");
    }
    else{
      this.http.post<TodoModel[]>("https://localhost:7032/api/Todos/Update", this.request)
      .subscribe(res => {
        this.todos = res;
        this.updatebtn = false;
        this.getAll();
      })
    }
  }

  update(i: TodoModel){
    this.updatebtn = true;
    this.updateId = i.id;
    this.updateWork = i.work;
    this.updateIsComplated = i.isComplated;
    this.newTodo = i.work;
  }

  delete(id: number){
    this.request.id = id;
    this.http.post<TodoModel[]>("https://localhost:7032/api/Todos/Delete", this.request)
    .subscribe(res => {
      this.todos = res;
      this.getAll();
    })
  }

  cancel(){
    this.updatebtn = false;
    this.newTodo = "";
  }

  splitTodosToTodoAndDone(){
    this.todo = [];
    this.done = [];
    for (let t of this.todos) {
      if(t.isComplated){
        this.done.push(t);
        console.log(this.done);
      }
      else{
        this.todo.push(t);
      }
    }
  }

  changeComplated(id: number){
    this.http.get<TodoModel[]>(`https://localhost:7032/api/Todos/ChangeComplated/${id}`)
    .subscribe(res => {
      this.todos = res;
      this.splitTodosToTodoAndDone();
      
    })
  }

  drop1(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = this.done[event.previousIndex].id;
      this.changeComplated(id);
      
    }
  }

  drop2(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = this.todo[event.previousIndex].id;
      this.changeComplated(id);
      
    }
  }

}

export class TodoModel {
  id: number = 0;
  work: string = "";
  isComplated: boolean = false;
}

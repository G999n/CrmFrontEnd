import { Component } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/taskService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: Task[] = [];
  newTask: Task = { 
    taskId: 0, 
    customerId: 0, 
    assignedTo: 0, 
    taskDescription: '', 
    dueDate: new Date(), 
    status: '', 
    priority: 0 
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Load Tasks');
        }
      }
    });
  }

  addTask(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.resetForm();
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Add Task');
        }
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Delete Task');
        }
      }
    });
  }

  editTask(task: Task): void {
    this.newTask = { ...task }; // Pre-fill the form for editing
  }

  updateTask(): void {
    if (this.newTask.taskId > 0) {
      this.taskService.updateTask(this.newTask.taskId, this.newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.resetForm();
        },
        error: (error) => {
          console.log(error);
          if (error.status === 401) {
            alert('Unauthorized: Please log in!');
          } else if (error.status === 403) {
            alert('Forbidden: You do not have permission to perform this action!');
          } else {
            alert('Error: Failed to Update Task');
          }
        }
      });
    }
  }

  resetForm(): void {
    this.newTask = { taskId: 0, customerId: 0, assignedTo: 0, taskDescription: '', dueDate: new Date(), status: '', priority: 0 };
  }
}

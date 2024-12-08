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
      error: () => alert('Failed to load tasks')
    });
  }

  addTask(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.resetForm();
      },
      error: () => alert('Failed to add task')
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => alert('Failed to delete task')
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
        error: () => alert('Failed to update task')
      });
    }
  }

  resetForm(): void {
    this.newTask = { taskId: 0, customerId: 0, assignedTo: 0, taskDescription: '', dueDate: new Date(), status: '', priority: 0 };
  }
}

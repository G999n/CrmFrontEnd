import { Component } from '@angular/core';
import { UserService } from "../services/userService"
import { User } from "../models/User";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  // user: any = {}; // Will hold the response from the backend

  // onSubmit(event: Event): void {
  //   event.preventDefault(); // Prevent form reload
    
  //   // Get form data
  //   const form = event.target as HTMLFormElement;
  //   const formData = new FormData(form);
    
  //   // Create the user object
  //   const user = {
  //     userId: 0,
  //     username: formData.get('username')?.toString(),
  //     passwordHash: formData.get('password')?.toString(),
  //     role: formData.get('role')?.toString(),
  //     email: formData.get('email')?.toString(),
  //     isActive: formData.get('isActive') === 'on',
  //   };

  //   // Send data via fetch
  //   fetch('https://localhost:7178/api/User', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(user)
  //   })
  //   .then(response => response.json())
  //   .then(data => this.user = data)
  //   .catch(error => console.error('Error:', error));
  // }
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = {
    userId: 0,
    username: '',
    passwordHash: '',
    role: '',
    email: '',
    isActive: true,
  }; // Default user object for creation
  editUser: User | null = null; // For editing user

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    );
  }

  onAddUser(): void {
    if (
      this.newUser.username &&
      this.newUser.passwordHash &&
      this.newUser.role &&
      this.newUser.email
    ) {
      this.userService.addUser(this.newUser).subscribe(
        (user) => {
          console.log('User added successfully:', user);
          this.users.push(user); // Immediately add the new user to the list
          this.newUser = {
            userId: 0,
            username: '',
            passwordHash: '',
            role: '',
            email: '',
            isActive: true,
          }; // Reset form
        },
        (error) => {
          console.error('Error adding user:', error);
          if (error.status === 401) {
            alert('Unauthorized: Please log in!');
          } else if (error.status === 403) {
            alert('Forbidden: You do not have permission to perform this action!');
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        }
      );
    } else {
      alert('Please fill in all fields!');
    }
  }

  onEditUser(user: User): void {
    this.editUser = { ...user }; // Create a copy of the user to edit
  }

  onSaveUser(): void {
    if (this.editUser) {
      this.userService.updateUser(this.editUser.userId, this.editUser).subscribe(
        (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          this.getUsers(); // Refresh the list
          this.editUser = null; // Reset the edit form
        },
        (error) => {
          console.error('Error updating user:', error);
          if (error.status === 401) {
            alert('Unauthorized: Please log in!');
          } else if (error.status === 403) {
            alert('Forbidden: You do not have permission to perform this action!');
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        }
      );
    }
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        this.getUsers(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting user:', error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    );
  }

  onCancelEdit(): void {
    this.editUser = null; // Reset the edit form
  }
}

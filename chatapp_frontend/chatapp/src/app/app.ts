import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
interface Chat {
  id: number;
  name: string;
  message: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  chatForm: FormGroup;
  errorText: string;

  allChats: Chat[];
  createdChat?: Chat;
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.errorText = '';
    this.allChats = [];
    this.chatForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async handleGetChats() {
    try {
      const response = await fetch('http://127.0.0.1:8000/chats/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error passiert beim Fetch');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      this.allChats = data;
      this.cd.detectChanges();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  async handleCreateChat() {
    if (this.chatForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const data = this.chatForm.value;
    console.log('data = ', data);

    try {
      const response = await fetch('http://127.0.0.1:8000/chats/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        this.errorText = result.error;
        console.log('result.error = ', result.error);
        this.cd.detectChanges();

        throw new Error(`Error passiert beim Fetch: ${result.error}`);
      }

      this.createdChat = {
        id: result.id,
        name: data.name,
        message: data.message,
      };
      this.cd.detectChanges();

      console.log('createdChat = ', this.createdChat);
      console.log('Fetched result:', result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
}

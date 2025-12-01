import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Remove constructor for this purpose unless needed for other injections
  chatName = '';
  message = '';

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
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  async handleCreateChat() {
    const data = { name: this.chatName, message: this.message };
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
        console.log('result = ', result);

        throw new Error(`Error passiert beim Fetch: ${result.error}`);
      }
      console.log('Fetched result:', result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
}

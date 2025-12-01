import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Remove constructor for this purpose unless needed for other injections

  async handleFetch() {
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
}

# PixNyanNyan

PixNyanNyan is a real-time image board application built with Angular 21. It allows users to browse threads, post comments, and interact in a dynamic environment powered by ActionCable for real-time updates.

## Features

*   **Real-time Updates**: Uses `angular2-actioncable` to push new posts and updates instantly to connected clients.
*   **Threaded Discussions**: Browse and participate in threads.
*   **Spam Protection**: Integrated with Google reCAPTCHA.
*   **Modern Angular**: Built with Angular 21, utilizing Standalone Components and Signals.
*   **Configurable**: Runtime configuration via `public/config.json`.

## Prerequisites

*   Node.js (Active LTS or Maintenance LTS version)
*   npm

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd pix-nyan-nyan
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

The application uses a runtime configuration file located at `public/config.json`. You can modify this file to point to your backend API and configure other settings.

**`public/config.json`**
```json
{
    "title": "Pix Nyan Nyan",
    "apiUrl": "http://localhost:3000/api/",
    "actionCableUrl": "ws://localhost:3000/cable",
    "recaptchaSiteKey": "YOUR_RECAPTCHA_KEY",
    "imageUrl": "http://localhost:3000/uploads/",
    "defaultMessage": {
        "title": "Default Title",
        "author": "Anonymous",
        "message": "Default Message"
    }
}
```

*   `apiUrl`: The URL of the backend API.
*   `actionCableUrl`: The WebSocket URL for ActionCable.
*   `recaptchaSiteKey`: Your Google reCAPTCHA v2 site key.
*   `imageUrl`: Base URL for serving uploaded images.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

*   `src/app/home`: Home page component, displaying the list of threads.
*   `src/app/thread`: Thread view component, displaying posts within a thread.
*   `src/app/post-form`: Component for creating new posts/threads.
*   `src/app/status`: Status page component.
*   `src/app/services`: Application services (Broadcaster, Config, etc.).

## License

[MIT](LICENSE)

# Donna AI - Calendar + Chat AI Assistant Web App

Donna AI is an innovative application that combines the functionalities of a calendar and a chat-based AI assistant. With Donna, users can manage their schedules efficiently while also benefiting from AI-powered assistance in various tasks.

## Features

- **Calendar Integration**: Donna AI seamlessly integrates a calendar system, allowing users to schedule and manage their events, appointments, and tasks effortlessly.

- **Chat-based AI Assistant**: Donna provides an intuitive chat interface where users can interact with an AI assistant to perform tasks, set reminders, receive notifications, and more.

- **NextJS**: The frontend of Donna AI is built using NextJS, a popular React framework known for its performance and flexibility.

- **Supabase (PostgreSQL)**: Donna AI utilizes Supabase, a powerful open-source platform, for its backend infrastructure. PostgreSQL is employed as the database management system, ensuring reliability and scalability.

## Getting Started

To get started with Donna AI, follow these steps:

1. Clone this repository to your local machine:

    ```
    git clone https://github.com/DK-Kim4312/donna.git
    ```

2. Navigate to the project directory:

    ```
    cd donna
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following environment variables and replace the placeholder values with your own:
   
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

5. Run the development server:

    ```
    npm run dev
    ```

6. Open your browser and visit `http://localhost:3000` to access Donna AI.

## Contributing

Contributions to Donna AI are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Make your changes and ensure they adhere to the project's coding style.
3. Test your changes thoroughly.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

If you encounter any issues or have any questions or suggestions, feel free to [open an issue](https://github.com/DK-Kim4312/donna/issues) on GitHub.

## Credits

Donna AI is developed and maintained by [DK-Kim4312](https://github.com/DK-Kim4312) and contributors.

Thank you for using Donna AI! We hope it enhances your productivity and simplifies your daily tasks.

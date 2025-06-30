# ✅ Resolve

[![Status Proyek](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/RyumaTsukiro/resolve)
[![Lisensi](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Teknologi](https://img.shields.io/badge/tech-React%20%7C%20Supabase%20%7C%20Tailwind-skyblue)](https://react.dev)

A modern, real-time platform for community issue tracking and resolution. Built to empower citizens to report, track, and resolve neighborhood issues transparently.

![Screenshot of Resolve App](https://via.placeholder.com/800x450.png?text=Replace+with+Your+App+Screenshot)
*<p align="center">Replace the placeholder image above with a screenshot of your application later!</p>*

---

## ✨ Key Features

* **⚡ Real-time:** New reports and status changes appear instantly across all devices without a page refresh.
* **📱 Mobile-First:** A responsive design optimized for the best experience on mobile phones.
* **🌐 Modern Interface:** A clean, intuitive UI that's easy for anyone to use.
* **🚀 Fast & Lightweight:** Built with a modern tech stack (Vite + React) for maximum performance.
* ** Supabase Scalable Backend:** Leverages Supabase for the database, authentication, and real-time capabilities, ensuring the app can scale.

## 🛠️ Tech Stack

* **Frontend:** [React.js](https://react.dev/) (via [Vite](https://vitejs.dev/))
* **Backend & Database:** [Supabase](https://supabase.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

## 🚀 Getting Started

Want to run this project locally? Follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RyumaTsukiro/resolve.git](https://github.com/RyumaTsukiro/resolve.git)
    cd resolve
    ```
    *(Remember to create a new GitHub repository named `resolve`)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase:**
    * Create a project on [Supabase](https://supabase.com/).
    * Create the `laporan` table as previously described.
    * Create a `.env.local` file in the project root.
    * Fill it with your Supabase API keys:
        ```
        VITE_SUPABASE_URL="YOUR_PROJECT_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
        ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

Copyright © 2025 by **RyumaTsukiro**, **Archived405** and **Xavier Itsvan**.
This project is licensed under the **MIT License**.

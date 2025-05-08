# Data Gain Assignment - Calendar & Table Management

A Next.js application with TypeScript and Redux for managing events, reminders, and tabular data. Features include a collapsible sidebar, CRUD operations on table data, and an interactive calendar.

Live Demo: [https://data-gain-assignment.vercel.app/](https://data-gain-assignment.vercel.app/)

## Features

### 1. Collapsible Sidebar
- Expandable/collapsible navigation menu
- Icon-only and full-width views
- Smooth transitions
- Active route highlighting

### 2. Table Management
- CRUD operations (Create, Read, Update, Delete)
- Sortable columns
- Search functionality
- Pagination
- Status indicators with badges
- Export options

### 3. Calendar Features
- Interactive calendar view
- Add events and reminders
- Color-coded events (Blue for events, Red for reminders)
- Date selection
- Multiple calendar views (Month, Week, Day, Agenda)

## Tech Stack

- Next.js 14
- TypeScript
- Redux Toolkit with Redux Persist
- TailwindCSS
- Shadcn UI Components
- React Big Calendar
- Date-fns
- React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/data-gain-assignment.git
cd data-gain-assignment
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
data-gain-assignment/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── calendar/         # Calendar related components
│   ├── layout/          # Layout components
│   ├── tables/          # Table related components
│   └── ui/              # UI components
├── store/               # Redux store setup
│   └── features/       # Redux slices
├── hooks/              # Custom React hooks
├── lib/               # Utility functions and types
└── public/           # Static assets
```

## Features Implementation

### Sidebar
- Implemented using TailwindCSS for styling
- Redux state management for sidebar expansion
- Responsive design with mobile support

### Table
- Sortable columns with redux state management
- Search functionality
- CRUD operations with form validation
- Pagination with customizable page size

### Calendar
- Integration with React Big Calendar
- Custom event styling
- Modal forms for adding events/reminders
- Date selection handling
- Persistent storage with Redux

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License
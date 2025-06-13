# DoughSplit - Expense Sharing Application

DoughSplit is a modern expense sharing application built with a monorepo architecture using Turborepo. It provides a seamless experience across web and mobile platforms, allowing users to easily split expenses with friends, family, or colleagues.

## 🚀 Features

- Cross-platform support (Web and Mobile)
- Real-time expense tracking
- Group expense management
- User authentication
- Responsive design
- Type-safe development with TypeScript
- OCR receipt scanning for automatic expense entry
- Complex animations and intuitive mobile UI
- Scalable cloud infrastructure
- Containerized deployment

## 🏗️ Project Structure

This monorepo is organized into the following packages and applications:

### Apps

- `web`: A Next.js web application built with react-native-web
- `native`: A React Native mobile application built with Expo
- `backend`: The server-side application handling business logic and data persistence

### Packages

- `@repo/ui`: Shared React Native component library
- `@repo/typescript-config`: Shared TypeScript configurations
- `@repo/database`: Database schema and Prisma configurations

## 🛠️ Tech Stack

- **Frontend**:
  - React Native with Expo
  - Next.js and React Native Web
  - Complex animations and gesture handling
  - OCR integration for receipt scanning
- **Backend**:
  - Express.js API
  - User authentication and authorization
  - Transaction management
  - AWS deployment
- **Infrastructure**:
  - Docker containerization
  - AWS cloud services
  - Scalable architecture
- **Database**: Prisma ORM
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Code Formatting**: Prettier

## 📋 Prerequisites

- Node.js >= 18
- pnpm >= 9.15.4
- Expo CLI (for mobile development)
- Docker (optional, for containerized development)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd doughSplit
```

2. Install dependencies:

```bash
pnpm install
```

3. Generate Prisma client:

```bash
pnpm prisma:generate
```

4. Start the development servers:

```bash
# Start all applications
pnpm dev

# Or start specific applications
pnpm start:backend  # Start backend server
```

## 🏗️ Development

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm clean`: Clean all build artifacts and dependencies
- `pnpm format`: Format all files using Prettier

## 📱 Mobile Development

The mobile app is built with Expo. To run it:

1. Install Expo Go on your mobile device
2. Start the native app:

```bash
cd apps/native
pnpm start
```

## 🌐 Web Development

The web application is built with Next.js and React Native Web. To run it:

```bash
cd apps/web
pnpm dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

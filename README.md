# File Uploader

A simple file and folder management system built with Express and Prisma, allowing users to securely upload, organize, and download their files.

## Features

- 🔐 **User Authentication** - Secure sign-up and login using Passport.js with session management
- 📁 **Folder Management** - Create folders to organize your files
- 📤 **File Upload** - Upload files with size limit of 10MB
- 🗂️ **File Organization** - Navigate through folders and manage files within them
- 📥 **File Download** - View file details and download files
- 💾 **Storage Management** - Files are stored in the database for quick retrieval
- 🎮 **User-friendly Interface** - Simple, responsive design for easy navigation

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with local strategy
- **Session Management**: express-session with Prisma session store
- **File Handling**: Multer
- **Frontend**: EJS templates, CSS
- **Security**: bcrypt.js for password hashing

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/file-uploader.git
   cd file-uploader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/file_uploader_db"
   SESSION_SECRET="your-secret-key"
   DATABASE_USERNAME="your-db-username"
   DATABASE_PASS="your-db-password"
   DATABASE_PORT=5432
   DATABASE_NAME="file_uploader_db"
   USE_PORT=3000
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
file-uploader/
├── config/                  # Configuration files
│   ├── multerConfig.js      # Multer configuration for file uploads
│   ├── passport.js          # Passport authentication configuration
│   └── session.js           # Session configuration
├── controllers/             # Route controllers
│   ├── fileController.js    # File operations controller
│   ├── folderController.js  # Folder operations controller
│   └── userController.js    # User authentication controller
├── middleware/              # Express middleware
│   ├── addUserToLocals.js   # Add user to locals middleware
│   ├── getCurrentFolder.js  # Get current folder middleware
│   └── requireAuth.js       # Authentication middleware
├── prisma/                  # Prisma ORM files
│   ├── schema.prisma        # Database schema
│   ├── fileQueries.js       # File database queries
│   ├── folderQueries.js     # Folder database queries
│   ├── prismaClient.js      # Prisma client initialization
│   └── userQueries.js       # User database queries
├── public/                  # Static files
│   ├── css/                 # CSS stylesheets
│   └── js/                  # JavaScript files
├── routes/                  # Express routes
│   └── indexRouter.js       # Main router
├── views/                   # EJS templates
│   ├── partials/            # Reusable template parts
│   ├── fileDetails.ejs      # File details page
│   ├── index.ejs            # Home page
│   ├── login.ejs            # Login page
│   └── signup.ejs           # Signup page
├── app.js                   # Main application file
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | / | Home page / root folder | Required |
| GET | /folder/:id | View specific folder | Required |
| POST | /uploadFile/:id | Upload file to folder | Required |
| POST | /newFolder/:id | Create new folder | Required |
| GET | /fileDetails/:id | View file details | Required |
| GET | /download/:id | Download file | Required |
| GET | /signup | Signup page | Not Required |
| POST | /signup | Create account | Not Required |
| GET | /login | Login page | Not Required |
| POST | /login | Authenticate user | Not Required |
| GET | /log-out | Logout | Not Required |

## Database Schema

The project uses the following database models:

### User

Stores user information and authentication details.

### File

Stores file metadata and contents.

### Folder

Organizes files into a hierarchical structure.

### Session

Stores user sessions for authenticated access.

## Security

- Passwords are hashed using bcrypt
- Session data is securely stored in the database
- File uploads are filtered by type and size
- User can only access their own files and folders

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- This project was created as part of a web development exercise
- Inspired by Google Drive and other file storage services

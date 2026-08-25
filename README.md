# LeaveSystem

Employee leave-request system: Angular frontend + Express/MySQL backend.

## Structure

- `src/` — Angular app (login page, leave request page)
- `server/` — Express API that talks to the `db_leave` MySQL/MariaDB database
- `server/db_leave.sql` — database schema + seed data (import into MySQL/MariaDB, e.g. via phpMyAdmin)

## Setup

1. Import `server/db_leave.sql` into a local MySQL/MariaDB server (e.g. XAMPP), creating the `db_leave` database.
2. Backend:
   ```
   cd server
   npm install
   node index.js
   ```
   Runs the API on `http://localhost:3000`. Configure `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` env vars if your DB isn't the XAMPP default (root, no password, port 3306).
3. Frontend:
   ```
   npm install
   npx ng serve
   ```
   Runs the app on `http://localhost:4200` (or another port if 4200 is taken).

Login with an `employeeid`/`password` pair from `tb_employee`, then submit a leave request — leave types are read from `tb_leavetype`.

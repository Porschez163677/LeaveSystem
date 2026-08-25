# LeaveSystem

Employee leave-request system: Angular frontend + PHP backend.

## Structure

- `src/` — Angular app (login page, leave request page)
- `api/` — PHP API that talks to the `db_leave` MySQL/MariaDB database (meant to be served by Apache, e.g. XAMPP)
- `db_leave.sql` — database schema + seed data (import into MySQL/MariaDB, e.g. via phpMyAdmin)

## Setup

1. Import `db_leave.sql` into a local MySQL/MariaDB server (e.g. XAMPP), creating the `db_leave` database.
2. Backend: make `api/` reachable through Apache, e.g. on XAMPP, either by placing this repo under `htdocs/Leave`
   or by pointing/junctioning `htdocs/Leave/api` at this repo's `api/` folder. It should then be reachable at
   `http://localhost:8080/Leave/api/` (adjust the port to whatever your Apache is configured for).
   `api/db.php` defaults to host `localhost`, port `3306`, user `root`, no password — edit it if your setup differs.
3. Frontend:
   ```
   npm install
   npx ng serve
   ```
   Runs the app on `http://localhost:4200` (or another port if 4200 is taken). If your API isn't at
   `http://localhost:8080/Leave/api`, update `API_URL` in `src/app/auth.service.ts` and `src/app/leave.service.ts`.

Login with an `employeeid`/`password` pair from `tb_employee`, then submit a leave request — leave types are read from `tb_leavetype`.

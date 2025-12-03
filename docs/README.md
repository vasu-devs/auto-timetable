# Timetable Management & Generation - Quick Docs

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)

## Project Summary

A small backend + frontend application to manage and generate timetables for institutions. The backend (in `backend/`) exposes REST endpoints for managing resources (teachers, subjects, rooms, batches) and generating a timetable. The frontend (in `frontend/`) provides a UI to interact with the API.

## Quick Setup (backend)

- Prerequisites: Node.js (16+), MongoDB instance, and `npm`.
- Copy `.env.example` to `.env` in `backend/` and fill values.

.env (important vars)

- `MONGO_URI` — MongoDB connection string (required)
- `MONGO_TABLE` — optional DB name
- `PORT` — server port (defaults to `5000`)

Install and run:

```cmd
cd "c:\Users\Sayoun Parui\Desktop\TimeTable Project\backend"
npm install
npm start
```

Notes:

- `npm start` runs `nodemon server.js` by default. You can also run `node server.js`.
- Ensure MongoDB is reachable from `MONGO_URI` before starting.

## Key Files (backend)

- `server.js` — Express app entrypoint (starts server after DB connect).
- `config/connection.js` — MongoDB connection helper.
- `package.json` — project dependencies and scripts.

## Common Issues

- Top-level `await` will fail under CommonJS. `server.js` uses an async startup function that awaits DB connection before listening.
- If you see module errors, ensure `backend/package.json` does not set `type` to `module` (or convert all files to ESM).

## API (examples)

- Health: `GET /health`

  - Response: `{ status: "OK", message: "Server is healthy" }`

- Root: `GET /`
  - Response: plain welcome text.

Sample curl (from CMD/PowerShell using `curl`):

```cmd
curl http://localhost:5000/health
```

If you add resource routes (example: teachers, subjects), they typically follow REST patterns:

- `GET /api/teachers`
- `POST /api/teachers`
- `GET /api/teachers/:id`
- `PUT /api/teachers/:id`
- `DELETE /api/teachers/:id`

## Development Notes

- Keep backend CommonJS (require/module.exports) unless you intentionally migrate the repo to ESM (`package.json` -> `type: module`).
- Use `.env.example` as the source of truth for environment variables.

## Next Steps / Suggestions

- Add a full OpenAPI/Swagger spec for all backend endpoints.
- Add example `.env` values in `docs/.env.example.md` for onboarding.
- Add frontend run instructions to this doc (if needed).

---

If you'd like, I can expand this into a full API reference or add example `.env` values. Tell me which part you'd like expanded next.

# Inventory Management System

A backend system for managing inventory across multiple warehouses and reserving stock for online orders.

## Scope

- View stock for a specific product stock at specific workhouse
- Reserve stocks
- View reservations statuses
- Confirm or cancel the reservation
- Prevent overselling during concurrent requests
- Record physical stock changes at warehouses

## Architecture

<img src="architecture.png" alt="Architecture Diagram" />

## API Endpoints

| Method | Endpoint                                | Description                              |
| ------ | --------------------------------------- | ---------------------------------------- |
| GET    | `/v1/inventory?sku=xxx&warehouseId=xxx` | Get stock for a product at a warehouse.  |
| POST   | `/v1/reservations`                      | Create a stock reservation.              |
| GET    | `/v1/reservations/:id`                  | Get reservation details.                 |
| POST   | `/v1/reservations/:id/confirm`          | Confirm a reservation.                   |
| POST   | `/v1/reservations/:id/cancel`           | Cancel a reservation and release stock.  |
| POST   | `/v1/warehouse-events`                  | Process Warehouse Physical Stock Changes |

## Data Model

## Running Locally

- Install Docker with the Compose plugin
- Copy the `.env.example` file to `.env` and update the environment variables as needed.

```sh
docker compose up --build -d
```

The API is available at <http://localhost:3000>.

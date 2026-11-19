# API Showcase

**Five free APIs. One clean integration.**

API Showcase is a full-stack web application demonstrating third-party REST API integration using Laravel and React.

The React frontend communicates with a versioned Laravel REST API (`/api/v1`), while the backend handles request validation, response formatting, caching, and error handling.

Each integration includes a working demonstration of its API endpoint, request parameters, and JSON response.

## Features

- **Weather Forecast** – Search for a city and retrieve current weather conditions and a 7-day forecast.
- **Currency Converter** – Convert currencies using European Central Bank reference exchange rates.
- **Translation** – Translate text between supported languages.
- **Geolocation** – Retrieve approximate location information based on IP address.
- **Public Holiday Calendar** – Retrieve public holidays by country and year.

## Tech Stack

**Frontend**
- React 19
- TypeScript
- Vite
- Tailwind CSS 4

**Backend**
- PHP 8.3
- Laravel 13
- RESTful API
- Laravel Cache
- PHPUnit

## Third-Party APIs

| Provider | Purpose |
|---|---|
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts and geocoding |
| [Frankfurter](https://frankfurter.dev/) | Currency conversion |
| [MyMemory](https://mymemory.translated.net/) | Text translation |
| [ipwho.is](https://ipwho.is/) | IP geolocation |
| [Nager.Date](https://date.nager.at/) | Public holiday data |

## Architecture

```text
React Frontend
      |
      | HTTP Requests
      v
Laravel REST API
      |
      |-- Request Validation
      |-- Service Layer
      |-- Response Formatting
      |-- Caching
      |-- Error Handling
      |
      v
External API Providers
```

All third-party API requests are handled by Laravel rather than directly by the frontend.

## API Endpoints

All endpoints use the `/api/v1` prefix.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/forecasts?city={city}` | Weather forecast |
| GET | `/conversions?from={currency}&to={currency}&amount={amount}` | Currency conversion |
| POST | `/translations` | Text translation |
| GET | `/locations/current` | IP-based geolocation |
| GET | `/countries/{code}/holidays?year={year}` | Public holidays |

### Example Requests

**Weather Forecast**
```http
GET /api/v1/forecasts?city=Lagonoy
```

**Currency Conversion**
```http
GET /api/v1/conversions?from=PHP&to=CAD&amount=100
```

**Translation**
```http
POST /api/v1/translations
Content-Type: application/json

{
  "text": "May pagkain ba?",
  "source": "tl",
  "target": "en"
}
```

**Geolocation**
```http
GET /api/v1/locations/current
```

**Public Holidays**
```http
GET /api/v1/countries/US/holidays?year=2026
```

## Getting Started

### Prerequisites

- PHP 8.3 or later
- Composer
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2. Backend Setup

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan serve
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to your Laravel backend.

## Testing

Run the backend test suite:

```bash
php artisan test
```

External API responses are simulated using Laravel's HTTP Client testing utilities, including `Http::fake`.

## License

This project is licensed under the [MIT License](LICENSE).

Third-party APIs remain subject to their respective terms and usage policies.

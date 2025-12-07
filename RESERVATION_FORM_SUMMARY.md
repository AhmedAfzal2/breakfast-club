# Reservation Form - Summary of Goals and Backend Plan

## Summary of Form Goals

### Primary Objective
The reservation form enables customers to book tables at The Breakfast Club restaurant by collecting essential booking information through a multi-step process.

### Form Structure
The reservation system consists of two main components:

1. **Reservation Page** - Initial booking details:
   - **Date Selection**: Required field using date picker (restricted to current month, no past dates)
   - **Time Selection**: Required field using time spinner (minimum 1 hour from current time, 30-minute intervals)
   - **Table Selection**: Interactive game-based selection where users select tables (table IDs stored in list)

2. **Reservation Form Modal** - Contact and additional details:
   - **Name**: Required field with validation (minimum 2 characters)
   - **Contact Number**: Required field with validation (phone number format, minimum 10 digits)
   - **Occasion**: Optional field for special events (e.g., Birthday, Anniversary)
   - **Additional Notes**: Optional textarea for special requests or notes

### Data Collection Goals
- Capture complete reservation information for restaurant management
- Ensure data quality through client-side validation
- Provide user-friendly interface with clear required/optional field indicators
- Support table capacity calculations based on selected tables
- Enable special occasion tracking and custom requests

### Validation Requirements
- **Client-side validation** for all required fields before form submission
- Date must be within current month and not in the past
- Time must be at least 1 hour from current time
- Name must be at least 2 characters
- Contact number must be valid format with minimum 10 digits
- At least one table must be selected

### User Experience Goals
- Clear visual feedback for required vs optional fields
- Real-time error messages for invalid input
- Modal popup for contact details collection
- Automatic calculation of maximum guests based on selected tables
- Display of selected tables in reservation details section

---

## Backend Plan

### API Endpoint
**POST** `/api/reservations`

### Data Structure
The reservation data sent to the backend includes:

```json
{
  "date": "ISO 8601 date string",
  "time": "ISO 8601 time string",
  "tableNumbers": [1, 2, 3],
  "name": "Customer Name",
  "contactNumber": "Phone Number",
  "occasion": "Optional occasion text or null",
  "additionalNotes": "Optional notes text or null",
  "maxGuests": 10,
  "tables": [
    { "id": 1, "capacity": 4 },
    { "id": 2, "capacity": 4 },
    { "id": 3, "capacity": 2 }
  ]
}
```

### Required Fields (Backend Validation)
- `date`: ISO 8601 formatted date string
- `time`: ISO 8601 formatted time string
- `tableNumbers`: Array of table IDs (at least one required)
- `name`: String (minimum 2 characters)
- `contactNumber`: String (valid phone format, minimum 10 digits)

### Optional Fields
- `occasion`: String or null
- `additionalNotes`: String or null

### Backend Processing Plan
1. **Data Validation**: Server-side validation of all required fields
2. **Data Storage**: Save reservation to JSON file in `server/data/submissions.json`
3. **Data Structure**: Store reservations in array format with timestamp
4. **Response**: Return success/error status with appropriate HTTP codes
5. **Logging**: Console log reservation submissions for debugging

### Storage Format
Reservations are stored in JSON format:
```json
{
  "reservations": [
    {
      "type": "reservation",
      "date": "2024-01-15T00:00:00.000Z",
      "time": "2024-01-15T14:30:00.000Z",
      "tableNumbers": [1, 2],
      "name": "John Doe",
      "contactNumber": "1234567890",
      "occasion": "Birthday",
      "additionalNotes": "Window seat preferred",
      "maxGuests": 8,
      "tables": [...],
      "timestamp": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### Error Handling
- Return 400 status for validation errors
- Return 500 status for server errors
- Provide descriptive error messages in response
- Log errors to console for debugging

### Future Enhancements (Planned)
- Database integration for persistent storage
- Table availability checking against existing reservations
- Email confirmation system
- Reservation management dashboard
- Table capacity fetched from database instead of hardcoded values


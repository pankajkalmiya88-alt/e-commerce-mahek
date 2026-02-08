# Unified Authentication Flow

## Overview

The application now uses a single unified authentication component for both login and signup at `/login`. The `/signup` route automatically redirects to `/login`.

## Authentication Flow

### Step 1: Email Entry

- User enters their email address
- User must agree to Terms of Use and Privacy Policy
- User must confirm they are above 18 years old
- Click "CONTINUE" to proceed

### Step 2: OTP Verification

- System sends a 6-digit OTP to the provided email
- User enters the OTP received in their email
- Click "VERIFY OTP" to authenticate

### Step 3: Authentication Complete

- Upon successful OTP verification:
  - **Bearer token** is stored in `localStorage` as `authToken`
  - **User data** is stored in `localStorage` as `userData`
  - User is redirected to the home page

## User Data Structure

When authentication is successful, the following data is stored in localStorage:

```json
{
  "id": "69823fb9adb8aaa29fba4174",
  "email": "user@example.com",
  "name": "User Name",
  "role": "USER",
  "addresses": []
}
```

## API Integration

### Send OTP Endpoint

- **URL**: `/api/auth/send-otp`
- **Method**: POST
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "name": ""
  }
  ```

### Verify OTP Endpoint

- **URL**: `/api/auth/verify-otp`
- **Method**: POST
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response Headers**:
  - `Authorization`: `Bearer <token>` - The authentication token is extracted from this header
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "OTP verified successfully",
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER",
    "addresses": []
  }
  ```

**Note**: The Bearer token is automatically extracted from the `Authorization` header in the response and stored in localStorage. If the token is also present in the response body, it will be used as a fallback.

## Auth Service Methods

The `authService` provides the following methods:

- `sendOtp(data)` - Send OTP to email
- `verifyOtp(data)` - Verify OTP and store auth data
- `setAuthToken(token)` - Store auth token in localStorage
- `getAuthToken()` - Retrieve auth token from localStorage
- `setUserData(userData)` - Store user data in localStorage
- `getUserData()` - Retrieve user data from localStorage
- `clearAuth()` - Clear all auth data from localStorage

## Features

- ✅ Single unified component for login/signup
- ✅ Email-based authentication only (no phone number)
- ✅ OTP verification flow
- ✅ Automatic token storage in localStorage
- ✅ Automatic user data storage in localStorage
- ✅ Terms and Privacy Policy agreement checkbox
- ✅ Age verification (18+ years)
- ✅ Resend OTP functionality
- ✅ Change email option during OTP verification
- ✅ Error handling and validation
- ✅ Loading states and success messages
- ✅ Automatic redirect after successful authentication

## Usage

To check if a user is authenticated:

```typescript
import { authService } from "@/features/auth/services/auth.service";

const token = authService.getAuthToken();
const userData = authService.getUserData();

if (token && userData) {
  // User is authenticated
  console.log("User:", userData);
} else {
  // User is not authenticated
  // Redirect to /login
}
```

To logout:

```typescript
import { authService } from "@/features/auth/services/auth.service";

authService.clearAuth();
// Redirect to /login
```

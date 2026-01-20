# LCG Mobile App - API Documentation

This document provides comprehensive information about all APIs used in the LCG Mobile Application, including endpoints, request methods, payloads, and usage locations.

## Table of Contents

- [Overview](#overview)
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication APIs](#authentication-apis)
  - [Patient Management APIs](#patient-management-apis)
  - [Ward Management APIs](#ward-management-apis)
  - [Staff Management APIs](#staff-management-apis)
  - [Medical Records APIs](#medical-records-apis)
  - [Notification APIs](#notification-apis)
  - [Profile Management APIs](#profile-management-apis)

---

## Overview

**Total APIs**: 51

The application uses two base URLs:
- **Primary Base URL**: `https://app.lcgapp.online/api-v2022/`
- **Login URL**: `https://lcgapi.projectlife.health/api/`

---

## Base URLs

```javascript
const BASEURL = "https://app.lcgapp.online/api-v2022/";
const LOGIN_BASE_URL = "https://lcgapi.projectlife.health/api/";
```

---

## Authentication

All API requests (except Login, Send OTP, Forgot Password, and Reset Password) require authentication using Bearer token:

```javascript
headers: {
  Accept: "application/json",
  "Content-Type": "application/json",  // or "multipart/form-data" for file uploads
  Authorization: `Bearer ${token}`
}
```

---

## API Endpoints

### Authentication APIs

#### 1. LOGIN
**Endpoint**: `https://lcgapi.projectlife.health/api/auth/sign-in/email`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload (Mobile)**:
```json
{
  "mobile": "string",
  "otp": "string"
}
```

**Request Payload (Email)**:
```json
{
  "email": "string",
  "otp": "string"
}
```

**Usage Location**:
- `src/screens/otp/OTP.js:102, 111`

**Response**:
```json
{
  "success": true,
  "data": {
    // user data
  }
}
```

**Headers**:
- Returns `authorization` header with Bearer token

---

#### 2. SEND_OTP
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/auth/v1/send-otp`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload (Email)**:
```json
{
  "email": "string"
}
```

**Request Payload (Mobile)**:
```json
{
  "mobile": "string"
}
```

**Usage Locations**:
- `src/screens/mobile/Mobile.js:92-95, 113-116`
- `src/screens/otp/OTP.js:122-125, 130-133`

---

#### 3. FORGOT_PASSWORD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/auth/v1/forgot-password`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "email": "string"
}
```

**Usage Location**:
- `src/screens/forgotPassword/ForgotPassword.js:76-79`

---

#### 4. RESET_PASSWORD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/auth/v1/reset-password`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "email": "string",
  "otp": "string",
  "password": "string"
}
```

**Usage Location**:
- `src/screens/resetPassword/ResetPassword.js:87-90`

---

### Patient Management APIs

#### 5. ADD_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "",
  "name": "string",
  "age": 0,
  "UHID": "string",
  "aadharNumber": "string",
  "mobile": 0,
  "countryCode": 91,
  "address": "string",
  "obstetricFormula": "string",
  "riskFactor": "string",
  "parity": "string",
  "dateOfAdmission": "string (ISO Date)",
  "assignedWard": "string (Ward ID)",
  "contraceptivesUsed": "string",
  "labourOnSet": {
    "isActiveLabourOnSet": false,
    "time": "string (ISO Date)"
  },
  "activeLabourDignosis": {
    "isActiveLabourDignosis": false,
    "time": "string (ISO Date)"
  },
  "membrane": {
    "isMembraneRuptured": false,
    "time": "string (ISO Date)"
  }
}
```

**Notes**:
- For editing: include the `patientId` value
- For adding new: `patientId` should be empty string

**Usage Locations**:
- `src/screens/addPatient/AddPatient.js:665-668` (Add)
- `src/screens/addPatient/AddPatient.js:701-704` (Edit)

---

#### 6. PATEINT_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "list?filterBy={OptionFilter}&filterValue=true&wardId={WardID}&page={currentPage}"
}
```

**Query Parameters**:
- `filterBy`: Filter type (e.g., "highRisk", "deliveryInProgress", "deliveryCompleted")
- `filterValue`: boolean (true/false)
- `wardId`: Ward ID (optional)
- `page`: Page number for pagination (optional)

**Usage Locations**:
- `src/screens/patientsList/PatientsList.js:131-134, 141-144, 154-157, 165-168, 173-176, 308`
- `src/screens/assignWard/AssignWard.js:74`
- `src/screens/pateintActions/PatientActions.js:160`
- `src/screens/addPatient/AddPatient.js:163`

---

#### 7. SEARCH_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "search?query={searchQuery}"
}
```

---

#### 8. SORT_PATIENT_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "list?sortBy={sortField}"
}
```

---

#### 9. HIGH_RISK_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/toggle-highrisk/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 10. TRANSFER_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/transfer-patient`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "patientId": "string",
  "wardId": "string",
  "note": "string",
  "date": "string (ISO Date)",
  "upload": []
}
```

**Usage Location**:
- `src/screens/pateintActions/PatientActions.js:408-411`

---

#### 11. DECLARE_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/declare`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "patientId": "string",
  "upload": [],
  "note": "string",
  "date": "string (ISO Date)"
}
```

**Usage Location**:
- `src/screens/pateintActions/PatientActions.js:439-442`

---

#### 12. DISCHARGE_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/discharge`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "patientId": "string",
  "upload": [],
  "note": "string",
  "date": "string (ISO Date)",
  "reason": "string"
}
```

**Usage Location**:
- `src/screens/pateintActions/PatientActions.js:484-487`

---

#### 13. PATEINT_DETAIL
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/single/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 14. PARITY_DETAIL
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/parities/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 15. TRANSFER_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/transfers/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

### Ward Management APIs

#### 16. WARD_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/ward/v1{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "list?page={currentPage}"
}
```

**Usage Locations**:
- `src/screens/wardsList/WardsList.js:62-65, 96-99`
- `src/screens/assignWard/AssignWard.js:88`
- `src/screens/pateintActions/PatientActions.js:174`
- `src/screens/addPatient/AddPatient.js:289`

---

#### 17. SEARCH_WARD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/ward/v1/{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "search?query={searchQuery}"
}
```

---

#### 18. ASSIGN_WARD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/transfer-patient`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Note**: This uses the same endpoint as TRANSFER_PATIENT

---

### Staff Management APIs

#### 19. STAFF_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/staff-list{uri}`
**Method**: `GET`

**Request Payload (Basic)**:
```json
{
  "payload": ""
}
```

**Request Payload (Paginated)**:
```json
{
  "uri": "?page={currentPage}"
}
```

**Usage Locations**:
- `src/screens/staffList/StaffList.js:78-81, 125-128`

---

#### 20. SEARCH_STAFF
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/staff-list/{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "search?query={searchQuery}"
}
```

---

#### 21. FILTER_STAFF
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/staff-list{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "?filterBy={filterType}&filterValue={value}"
}
```

---

#### 22. STAFF_PROFILE
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/profile`
**Method**: `GET`

---

#### 23. UPDATE_PROFILE
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/edit-profile`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "firstName": "string",
  "middleName": "",
  "lastName": "string",
  "dateOfBirth": "string (ISO Date)",
  "gender": "string",
  "email": "string",
  "city": "string",
  "medicalCouncil": "string",
  "profession": "string",
  "initials": "",
  "mobile": "string",
  "countryCode": "91",
  "isAdmin": false
}
```

**Usage Location**:
- `src/screens/profile/Profile.js:158-161`

---

#### 24. CHANGE_PASSWORD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/change-password`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "password": "string"
}
```

**Usage Location**:
- `src/screens/changePassword/ChangePassword.js:67-70`

---

#### 25. TOGGLE_DUTY_STATUS
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/toggle-duty-status`
**Method**: `GET`

---

#### 26. DASHBOARD
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1`
**Method**: `GET`

---

### Medical Records APIs

#### 27. ADD_PLAN
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/add-plan`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "text": "string",
  "patientId": "string",
  "upload": []
}
```

**Usage Location**:
- `src/screens/addPlan/AddPlan.js:198-201`

---

#### 28. GET_PLAN_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/plans/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 29. ADD_BISHOP_SCORE
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/add-bishop-score`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "string",
  "cervixDiameter": "string",
  "positionOfCervix": "string",
  "fatalStation": "string",
  "cervixConsistency": "string",
  "effacement": "string",
  "bishopScore": 0
}
```

**Bishop Score Fields**:
- `cervixDiameter`: Cervical dilation (0-3 cm, 3-4 cm, 5-6 cm, >6 cm)
- `positionOfCervix`: Position (Posterior, Mid, Anterior)
- `fatalStation`: Fetal station (-3, -2, -1/0, +1/+2)
- `cervixConsistency`: Consistency (Firm, Medium, Soft)
- `effacement`: Effacement (0-30%, 40-50%, 60-70%, >80%)
- `bishopScore`: Calculated total (0-13)

**Usage Location**:
- `src/screens/calculateBishop/CalculateBishop.js:753`

---

#### 30. UPDATE_LABOUR_STATUS
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/active-labour`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "string",
  "status": "boolean"
}
```

---

#### 31. ADD_LCG (Labour Care Guide)
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/add-lcg`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "string",
  "timeSlot": "string",
  "supportiveCare": {
    "companionship": "string",
    "painRelief": "string",
    "oralFluid": "string",
    "posture": "string"
  },
  "baby": {
    "FHRDeceleration": "string",
    "baselineFHR": "string",
    "amnioticFluid": "string",
    "fetalPosition": "string",
    "caput": "string",
    "moulding": "string"
  },
  "women": {
    "urine": "string",
    "acetone": "string",
    "pulse": "string",
    "systolicBP": "string",
    "diastolicBP": "string",
    "temperature": "string",
    "contraction": "string",
    "contractionDuration": "string"
  },
  "labourProgress": {
    "cervix": "string",
    "decent": "string"
  },
  "medication": {
    "oxytocin": "string",
    "ivFluids": "string"
  }
}
```

**Notes**:
- All nested objects are optional - only include if any of their fields have values
- Each section represents a different aspect of labour monitoring

**Usage Location**:
- `src/screens/PatientDetail/PatientDetail.js:1041-1044`

---

#### 32. GET_LCG_DETAILS
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/lcg/{lcgId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{lcgId}"
}
```

---

#### 33. LCG_DECISION
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/lcg-decision`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "patientId": "string",
  "lcgId": "string",
  "assessment": "string",
  "plan": "string"
}
```

**Usage Location**:
- `src/screens/PatientDetail/PatientDetail.js:1073-1076`

---

#### 34. VIEW_LCG
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/lcg-report/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 35. DELIVERY_COMPLETED
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/delivery-complete`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "string",
  "deliveryDateTime": "string (ISO Date)",
  "deliveryMethod": "string",
  "episiotomy": "string",
  "tear": "string",
  "bloodLoss": "string",
  "placentaDelivery": "string"
}
```

---

### Baby Management APIs

#### 36. ADD_BABY
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/add-baby`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "patientId": "string",
  "status": "string",
  "sex": "string",
  "weight": "string",
  "notes": "string",
  "breastFeeding": {
    "started": false,
    "withinOneHour": false,
    "moreThanOneHour": false
  },
  "apgar": {
    "oneMin": 0,
    "fiveMin": 0,
    "tenMins": 0,
    "twentyMins": 0
  }
}
```

**Usage Location**:
- `src/screens/addBaby/AddBaby.js:161-164`

---

#### 37. ADD_APGAR_SCORE
**Endpoint**: N/A (Data collected via navigation params)
**Method**: N/A

**Data Structure** (passed to ADD_BABY screen):
```json
{
  "timeInterval": 0,
  "color": "string",
  "heartRate": "string",
  "reflexIrritability": "string",
  "muscleTone": "string",
  "respiration": "string",
  "apgarScore": 0
}
```

**APGAR Score Fields**:
- `timeInterval`: Time in minutes (1, 5, 10, 20)
- `color`: Skin color assessment
- `heartRate`: Heart rate assessment
- `reflexIrritability`: Reflex response
- `muscleTone`: Muscle tone
- `respiration`: Breathing effort
- `apgarScore`: Calculated total (0-10)

**Usage Location**:
- `src/screens/apgarScore/Apgar.js:783`

---

#### 38. BABY_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/babies/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

### Drug Management APIs

#### 39. DRUG_CATEGORY_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/public/v1/drug-category`
**Method**: `GET`

**Note**: This is a public endpoint and doesn't require authentication

---

#### 40. ADD_DRUG
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/add-drug`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

**Request Payload**:
```json
{
  "patientId": "string",
  "category": "string",
  "type": "string",
  "name": "string",
  "route": "string",
  "dose": "string",
  "startDate": "string (ISO Date)",
  "endDate": "string (ISO Date)",
  "frequency": "string",
  "upload": [],
  "remark": "string"
}
```

**Usage Location**:
- `src/screens/addDrug/AddDrug.js:408-411`

---

#### 41. DRUG_HISTORY_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/drugs/{patientId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{patientId}"
}
```

---

#### 42. TOGGLE_DRUG_STATUS
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/toggle-drug-status/{drugId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{drugId}"
}
```

---

### Round Management APIs

#### 43. ROUND_DETAIL
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/round-tab/{wardId}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "{wardId}"
}
```

---

#### 44. FILTER_ROUND
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/round-tab{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "?filterBy={filterType}&filterValue={value}&wardId={wardId}"
}
```

---

#### 45. SEARCH_ROUND_PATIENT
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/patient/v1/round-tab/{uri}`
**Method**: `GET`

**Request Payload**:
```json
{
  "uri": "search?query={searchQuery}&wardId={wardId}"
}
```

---

### Notification APIs

#### 46. SET_FCM_TOKEN
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/set-fcm-token`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Payload**:
```json
{
  "fcmToken": "string"
}
```

---

#### 47. NOTIFCATION_LIST
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/notification`
**Method**: `GET`

---

#### 48. NOTIFICATION_STATUS
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/toggle-notification-status`
**Method**: `GET`

---

#### 49. TOGGLE_ALERT_HIDE
**Endpoint**: `https://app.lcgapp.online/api-v2022/staff/account/v1/toggle-high-risk-alert-hide-status`
**Method**: `GET`

---

## API Summary by Category

### Authentication (4 APIs)
1. LOGIN
2. SEND_OTP
3. FORGOT_PASSWORD
4. RESET_PASSWORD

### Patient Management (11 APIs)
5. ADD_PATIENT
6. PATEINT_LIST
7. SEARCH_PATIENT
8. SORT_PATIENT_LIST
9. HIGH_RISK_PATIENT
10. TRANSFER_PATIENT
11. DECLARE_PATIENT
12. DISCHARGE_PATIENT
13. PATEINT_DETAIL
14. PARITY_DETAIL
15. TRANSFER_LIST

### Ward Management (3 APIs)
16. WARD_LIST
17. SEARCH_WARD
18. ASSIGN_WARD

### Staff Management (7 APIs)
19. STAFF_LIST
20. SEARCH_STAFF
21. FILTER_STAFF
22. STAFF_PROFILE
23. UPDATE_PROFILE
24. CHANGE_PASSWORD
25. TOGGLE_DUTY_STATUS
26. DASHBOARD

### Medical Records (9 APIs)
27. ADD_PLAN
28. GET_PLAN_LIST
29. ADD_BISHOP_SCORE
30. UPDATE_LABOUR_STATUS
31. ADD_LCG
32. GET_LCG_DETAILS
33. LCG_DECISION
34. VIEW_LCG
35. DELIVERY_COMPLETED

### Baby Management (3 APIs)
36. ADD_BABY
37. ADD_APGAR_SCORE (Navigation Only)
38. BABY_LIST

### Drug Management (4 APIs)
39. DRUG_CATEGORY_LIST
40. ADD_DRUG
41. DRUG_HISTORY_LIST
42. TOGGLE_DRUG_STATUS

### Round Management (3 APIs)
43. ROUND_DETAIL
44. FILTER_ROUND
45. SEARCH_ROUND_PATIENT

### Notification (4 APIs)
46. SET_FCM_TOKEN
47. NOTIFCATION_LIST
48. NOTIFICATION_STATUS
49. TOGGLE_ALERT_HIDE

---

## Request Methods Summary

**POST Requests (21)**:
- LOGIN
- SEND_OTP
- FORGOT_PASSWORD
- RESET_PASSWORD
- ADD_PATIENT
- TRANSFER_PATIENT
- DECLARE_PATIENT
- DISCHARGE_PATIENT
- ADD_PLAN
- ADD_BISHOP_SCORE
- UPDATE_LABOUR_STATUS
- ADD_LCG
- LCG_DECISION
- DELIVERY_COMPLETED
- ADD_BABY
- ADD_DRUG
- UPDATE_PROFILE
- CHANGE_PASSWORD
- SET_FCM_TOKEN

**GET Requests (28)**:
- PATEINT_LIST
- SEARCH_PATIENT
- SORT_PATIENT_LIST
- HIGH_RISK_PATIENT
- PATEINT_DETAIL
- PARITY_DETAIL
- TRANSFER_LIST
- WARD_LIST
- SEARCH_WARD
- STAFF_LIST
- SEARCH_STAFF
- FILTER_STAFF
- STAFF_PROFILE
- TOGGLE_DUTY_STATUS
- DASHBOARD
- GET_PLAN_LIST
- GET_LCG_DETAILS
- VIEW_LCG
- BABY_LIST
- DRUG_CATEGORY_LIST
- DRUG_HISTORY_LIST
- TOGGLE_DRUG_STATUS
- ROUND_DETAIL
- FILTER_ROUND
- SEARCH_ROUND_PATIENT
- NOTIFCATION_LIST
- NOTIFICATION_STATUS
- TOGGLE_ALERT_HIDE

---

## Content-Type Summary

**application/json (39 APIs)**:
- All GET requests
- Most POST requests

**multipart/form-data (7 APIs)**:
- ADD_PLAN
- TRANSFER_PATIENT
- DECLARE_PATIENT
- DISCHARGE_PATIENT
- ADD_DRUG
- LCG_DECISION
- ASSIGN_WARD

---

## Common Response Structure

All API responses follow this general structure:

```json
{
  "success": true/false,
  "data": {},
  "message": "string"
}
```

**Success Response**:
- `success`: true
- `data`: Response data object/array
- `message`: Success message (optional)

**Error Response**:
- `success`: false
- `data`: null or error details
- `message`: Error message

**HTTP Status Codes**:
- `200`: Success
- `401`: Unauthorized (triggers automatic logout)
- `4xx`: Client error
- `5xx`: Server error

---

## File Upload Format

APIs that accept file uploads use `multipart/form-data`:

```javascript
const formData = new FormData();
formData.append('field', value);
formData.append('upload', fileObject);
```

Affected APIs:
- ADD_PLAN
- TRANSFER_PATIENT
- DECLARE_PATIENT
- DISCHARGE_PATIENT
- ADD_DRUG
- LCG_DECISION

---

## Pagination

APIs that support pagination use query parameters:

```
?page={currentPage}
```

Paginated APIs:
- PATEINT_LIST
- WARD_LIST
- STAFF_LIST

---

## Search & Filter

**Search Pattern**:
```
search?query={searchQuery}
```

**Filter Pattern**:
```
?filterBy={filterType}&filterValue={value}
```

---

## Error Handling

The application handles errors as follows:

1. **401 Unauthorized**: Automatically triggers logout
2. **Other Errors**: Returns error message to the UI
3. **Network Errors**: Displays generic error message

```javascript
if (error?.response?.status === 401) {
  // Automatic logout
  storeRef?.dispatch(User.signOutAction());
}
```

---

## Service File Locations

- **API Service**: `src/services/api/apiService.js`
- **API URLs**: `src/services/api/apiUrl.js`
- **API Call Types**: `src/services/api/apiCallTypes.js`
- **API Calls**: `src/services/api/apiCalls.js`
- **Redux Sagas**: `src/reduxSagas/`

---

## Notes

1. The `APGAR_SCORE` doesn't have a dedicated API endpoint - the data is collected via the Apgar screen and passed to the ADD_BABY screen through navigation parameters.

2. Several APIs use URI-based query parameters rather than traditional request body payloads (GET requests).

3. File uploads are handled using FormData and require `multipart/form-data` content type.

4. All authenticated requests require a Bearer token in the Authorization header.

5. The application uses Redux Saga for API state management.

6. DRUG_CATEGORY_LIST is the only public endpoint that doesn't require authentication.

---

**Last Updated**: January 20, 2026
**Total Endpoints**: 49 (51 including ASSIGN_WARD alias and ADD_APGAR_SCORE navigation)

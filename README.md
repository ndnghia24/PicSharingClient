
# PicSharingClient

## PicSharingClient is a NextJs Client designed for sharing images. This guide will help you set up and run the client locally.

## Prerequisites
- Node.js (version 14 or higher)
- NPM (version 6 or higher)

## Installation

### 1. Clone the repository:
```
git clone https://github.com/ndnghia24/PicSharingClient.git
cd PicSharingClient
```
### 2. Install dependencies:
```npm install```
### Configuration

To run the application locally, you need to set up environment variables. Create a .env file in the root directory of the project and add the following variables:
```
* PORT=<your_desired_port>
* NEXT_PUBLIC_API_BASE_URL=<your_api_base_url>
* NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
* NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
* NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_firebase_project_id>
* NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
* NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
* NEXT_PUBLIC_FIREBASE_APP_ID=<your_firebase_app_id>
```

## After configuring the environment variables, start the client using the following command:

```npm run start```

The client will be accessible at http://localhost:<your_desired_port> by default.

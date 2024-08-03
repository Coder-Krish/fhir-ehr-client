# FhirEhrClient

## Overview

This is a sample FHIR Client application built using HAPI FHIR Server, Angular 18, and Node.js 20. The application allows users to manage patient information, including registration and clinical details. The application utilizes the FHIR standard for managing healthcare information.

## Features

- **Patient Registration**: Register new patients with personal details.
- **Clinical Information**: Manage clinical information such as vitals, SOAP notes, and clinical notes.
- **Responsive UI**: Built with Angular 18 and styled using Tailwind CSS.

## Technology Stack

- **Backend**: HAPI FHIR Server
- **Frontend**: Angular 18
- **Runtime**: Node.js 20
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 20 or higher
- Angular CLI
- Docker (for running HAPI FHIR Server)

## Installation

### Backend Setup

1. **Clone the repository**:
```bash
git clone https://github.com/Coder-Krish/fhir-ehr-client.git
cd fhir-ehr-client
```
2. **Start the HAPI FHIR Server with Docker Compose:**
```bash
docker-compose up -d
```
### Frontend Setup
1. **Install dependencies**:
```bash
npm install
```
2. **Run the Angular development server:**
```bash
ng serve
```
3. **Access the application:**
Open your browser and go to http://localhost:4200.





# Database Models Documentation

This document describes the database models used in the middleware service.

## Overview

The application uses Sequelize as the ORM (Object-Relational Mapping) with SQLite as the database engine. The models are defined using Sequelize's model definition syntax.

## Models

### 1. User Model (`user.js`)
Represents user data in the system.

Key attributes:
- User authentication information
- User profile data
- Session management data

### 2. Project Model (`project.js`)
Manages project-related data.

Key attributes:
- Project metadata
- Project configuration
- Project status

## Model Relationships

The models are related through Sequelize associations defined in `index.js`. This ensures proper data relationships and referential integrity.

## Database Configuration

The database configuration is managed through:
- Sequelize configuration in `config` directory
- Migration files in `migrations` directory
- Model definitions in `models` directory

## Database Operations

Models support standard CRUD operations:
- Create: Insert new records
- Read: Query existing records
- Update: Modify existing records
- Delete: Remove records

## Data Validation

Each model includes:
- Data type validation
- Required field validation
- Custom validation rules where applicable

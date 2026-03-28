# Backend Integration Guide - VeloCity AI Support

This guide provides instructions for backend developers to integrate the AI Support system with a real backend API.

## Table of Contents
1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [OpenAI Integration](#openai-integration)
5. [WebSocket Setup](#websocket-setup)
6. [Security Implementation](#security-implementation)
7. [Code Examples](#code-examples)

---

## Overview

The frontend is fully functional with mock data. To make it production-ready, you need to:
1. Set up database tables
2. Create REST API endpoints
3. Integrate OpenAI or similar LLM
4. Implement WebSocket for real-time features
5. Add authentication middleware
6. Set up email/SMS services for escalation

---

## Database Schema

### PostgreSQL/MySQL Schema

```sql
-- Users table (if not exists)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  satisfaction_feedback BOOLEAN,
  escalation_flag BOOLEAN DEFAULT FALSE,
  resolved BOOLEAN DEFAULT FALSE,
  session_id UUID,
  INDEX idx_user_id (user_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_session_id (session_id)
);

-- Support tickets table
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  issue TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  assigned_to UUID REFERENCES users(id),
  last_message TEXT,
  INDEX idx_status (status),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- Ticket chat messages
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_type VARCHAR(10) NOT NULL, -- 'user' or 'agent'
  sender_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  INDEX idx_ticket_id (ticket_id)
);

-- Ride history (for context)
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  fare DECIMAL(10, 2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI analytics
CREATE TABLE ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  total_queries INT DEFAULT 0,
  escalated_queries INT DEFAULT 0,
  satisfied_responses INT DEFAULT 0,
  unsatisfied_responses INT DEFAULT 0,
  avg_response_time_ms INT,
  UNIQUE(date)
);

-- Common issues tracking
CREATE TABLE common_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_category VARCHAR(100),
  query_count INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(issue_category)
);
```

### MongoDB Schema (Alternative)

```javascript
// chatHistory collection
{
  _id: ObjectId,
  userId: ObjectId,
  message: String,
  response: String,
  timestamp: Date,
  satisfactionFeedback: Boolean,
  escalationFlag: Boolean,
  resolved: Boolean,
  sessionId: ObjectId
}

// supportTickets collection
{
  _id: ObjectId,
  ticketNumber: String,
  userId: ObjectId,
  userName: String,
  userEmail: String,
  issue: String,
  category: String,
  status: String,
  priority: String,
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date,
  assignedTo: ObjectId,
  chatHistory: [{
    message: String,
    response: String,
    timestamp: Date,
    satisfactionFeedback: Boolean
  }],
  rideHistory: [ObjectId]
}

// aiAnalytics collection
{
  _id: ObjectId,
  date: Date,
  totalQueries: Number,
  escalatedQueries: Number,
  satisfactionRate: Number,
  commonIssues: [{
    category: String,
    count: Number
  }]
}
```

---

## API Endpoints

### 1. Chat Endpoints

#### POST /api/ai/chat
Send user message and get AI response.

**Request:**
```json
{
  "userId": "uuid",
  "message": "I need help with my payment",
  "sessionId": "uuid",
  "context": {
    "currentPage": "/book-ride",
    "hasActiveBooking": false,
    "lastRide": "RIDE-123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "I can help you with payment issues. Could you provide more details?",
  "messageId": "uuid",
  "timestamp": "2026-03-15T10:30:00Z",
  "suggestions": [
    "Refund not received",
    "Payment failed",
    "View payment history"
  ]
}
```

**Node.js Implementation:**
```javascript
app.post('/api/ai/chat', authenticateUser, async (req, res) => {
  try {
    const { userId, message, sessionId, context } = req.body;

    // Store user message
    const userMessage = await db.query(
      'INSERT INTO chat_history (user_id, message, session_id) VALUES ($1, $2, $3) RETURNING id',
      [userId, message, sessionId]
    );

    // Get AI response (see OpenAI Integration section)
    const aiResponse = await getAIResponse(message, context, userId);

    // Update chat history with response
    await db.query(
      'UPDATE chat_history SET response = $1 WHERE id = $2',
      [aiResponse, userMessage.rows[0].id]
    );

    // Update analytics
    await updateAnalytics('total_queries');

    res.json({
      success: true,
      response: aiResponse,
      messageId: userMessage.rows[0].id,
      timestamp: new Date(),
      suggestions: generateSuggestions(message)
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Failed to process message' });
  }
});
```

#### POST /api/chat/feedback
Record user satisfaction feedback.

**Request:**
```json
{
  "messageId": "uuid",
  "solved": true
}
```

**Response:**
```json
{
  "success": true,
  "escalationRequired": false
}
```

#### POST /api/chat/escalate
Create escalation ticket.

**Request:**
```json
{
  "userId": "uuid",
  "sessionId": "uuid",
  "escalationType": "chat",
  "reason": "Issue not resolved after multiple attempts"
}
```

**Response:**
```json
{
  "success": true,
  "ticketId": "TKT-001",
  "message": "Ticket created successfully",
  "estimatedResponseTime": "15 minutes"
}
```

### 2. Support Dashboard Endpoints

#### GET /api/support/tickets
Get all support tickets (for agents).

**Query Parameters:**
- `status`: open, in-progress, escalated, resolved
- `priority`: low, medium, high, urgent
- `page`: pagination
- `limit`: results per page

**Response:**
```json
{
  "success": true,
  "tickets": [
    {
      "id": "uuid",
      "ticketNumber": "TKT-001",
      "userId": "uuid",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "issue": "Payment issue - refund not received",
      "category": "Payment",
      "status": "escalated",
      "priority": "high",
      "createdAt": "2026-03-15T08:30:00Z",
      "lastMessage": "I haven't received my refund"
    }
  ],
  "total": 23,
  "page": 1,
  "totalPages": 3
}
```

#### GET /api/support/tickets/:id
Get ticket details.

**Response:**
```json
{
  "success": true,
  "ticket": {
    "id": "uuid",
    "ticketNumber": "TKT-001",
    "userInfo": {
      "userId": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9876543210"
    },
    "issue": "Payment issue",
    "category": "Payment",
    "status": "escalated",
    "priority": "high",
    "createdAt": "2026-03-15T08:30:00Z",
    "chatHistory": [
      {
        "message": "I need help with payment",
        "response": "I can help you...",
        "timestamp": "2026-03-15T08:30:00Z",
        "satisfactionFeedback": false
      }
    ],
    "rideHistory": [
      {
        "rideId": "RIDE-123",
        "from": "Airport",
        "to": "City Center",
        "fare": 450,
        "status": "Cancelled",
        "date": "2026-03-13T10:00:00Z"
      }
    ]
  }
}
```

#### POST /api/support/tickets/:id/reply
Agent sends response.

**Request:**
```json
{
  "agentId": "uuid",
  "message": "Your refund has been processed and will reflect in 2-3 business days."
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "uuid",
  "timestamp": "2026-03-15T10:45:00Z"
}
```

#### PATCH /api/support/tickets/:id
Update ticket status.

**Request:**
```json
{
  "status": "resolved",
  "resolution": "Refund processed successfully"
}
```

### 3. Analytics Endpoints

#### GET /api/analytics/ai-support
Get AI support metrics.

**Response:**
```json
{
  "success": true,
  "analytics": {
    "totalQueries": 1247,
    "escalatedQueries": 23,
    "satisfactionRate": 87,
    "resolutionRate": 92,
    "avgResponseTime": 1.2,
    "period": "last_30_days"
  }
}
```

#### GET /api/analytics/common-issues
Get most common issues.

**Response:**
```json
{
  "success": true,
  "commonIssues": [
    { "issue": "Payment Issues", "count": 342, "percentage": 27 },
    { "issue": "Booking Problems", "count": 289, "percentage": 23 }
  ]
}
```

---

## OpenAI Integration

### Setup

```bash
npm install openai
```

### Environment Variables

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
```

### Implementation

```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(userMessage, context, userId) {
  try {
    // Get user's ride history for context
    const rideHistory = await getUserRideHistory(userId);
    
    // Build system prompt
    const systemPrompt = `
You are VeloCity AI Assistant, a helpful customer support bot for a cab booking platform.

Your capabilities:
- Help with ride bookings
- Provide fare estimates
- Explain ride categories
- Assist with cancellations
- Handle payment inquiries
- Address driver complaints
- Give safety information

Current context:
- User is on page: ${context.currentPage}
- Active booking: ${context.hasActiveBooking ? 'Yes' : 'No'}
- Recent rides: ${rideHistory.length}

Guidelines:
- Be friendly and professional
- Keep responses concise (2-3 sentences)
- If you can't help, offer to escalate to human support
- Never make up information about bookings or payments
- Always prioritize user safety
    `.trim();

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;

    // Track response time for analytics
    await trackResponseTime(completion.usage);

    return aiResponse;

  } catch (error) {
    console.error('OpenAI error:', error);
    // Fallback response
    return "I'm having trouble processing your request right now. Would you like to connect with a human support agent?";
  }
}

// Helper function to get user ride history
async function getUserRideHistory(userId) {
  const result = await db.query(
    'SELECT * FROM rides WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
    [userId]
  );
  return result.rows;
}

// Track AI performance metrics
async function trackResponseTime(usage) {
  await db.query(
    'INSERT INTO ai_analytics (date, total_queries, avg_response_time_ms) VALUES ($1, 1, $2) ON CONFLICT (date) DO UPDATE SET total_queries = ai_analytics.total_queries + 1',
    [new Date().toISOString().split('T')[0], usage.total_tokens * 10]
  );
}
```

### Advanced: Context-Aware AI

```javascript
async function getContextAwareAIResponse(userMessage, userId) {
  // Get conversation history
  const chatHistory = await db.query(
    'SELECT message, response FROM chat_history WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 5',
    [userId]
  );

  // Build conversation context
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Add previous conversation
  chatHistory.rows.reverse().forEach(chat => {
    messages.push(
      { role: 'user', content: chat.message },
      { role: 'assistant', content: chat.response }
    );
  });

  // Add current message
  messages.push({ role: 'user', content: userMessage });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}
```

---

## WebSocket Setup

For real-time agent-customer chat.

### Server Setup

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store active connections
const connections = new Map();

wss.on('connection', (ws, req) => {
  // Authenticate user from token
  const token = req.headers['sec-websocket-protocol'];
  const userId = verifyToken(token);

  if (!userId) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  // Store connection
  connections.set(userId, ws);

  ws.on('message', async (message) => {
    const data = JSON.parse(message);

    if (data.type === 'agent_message') {
      // Agent sending message to user
      const userConnection = connections.get(data.recipientId);
      if (userConnection) {
        userConnection.send(JSON.stringify({
          type: 'agent_message',
          message: data.message,
          agentName: data.agentName,
          timestamp: new Date()
        }));
      }

      // Store in database
      await db.query(
        'INSERT INTO ticket_messages (ticket_id, sender_type, sender_id, message) VALUES ($1, $2, $3, $4)',
        [data.ticketId, 'agent', data.agentId, data.message]
      );
    }
  });

  ws.on('close', () => {
    connections.delete(userId);
  });
});
```

### Frontend Integration

```typescript
// In ChatWidget.tsx
const connectToAgent = () => {
  const ws = new WebSocket('ws://localhost:8080', [authToken]);

  ws.onopen = () => {
    console.log('Connected to support agent');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'agent_message') {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.message,
        sender: 'bot',
        timestamp: new Date(data.timestamp),
      }]);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};
```

---

## Security Implementation

### 1. Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Usage
app.post('/api/ai/chat', authenticateUser, async (req, res) => {
  // req.userId is now available
});
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many messages, please try again later'
});

app.post('/api/ai/chat', chatLimiter, authenticateUser, async (req, res) => {
  // ...
});
```

### 3. Input Validation

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/ai/chat',
  authenticateUser,
  [
    body('message').isString().trim().isLength({ min: 1, max: 500 }),
    body('sessionId').isUUID(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ...
  }
);
```

### 4. Data Sanitization

```javascript
const sanitizeHtml = require('sanitize-html');

function sanitizeMessage(message) {
  return sanitizeHtml(message, {
    allowedTags: [],
    allowedAttributes: {}
  });
}

// Usage
const sanitizedMessage = sanitizeMessage(req.body.message);
```

---

## Code Examples

### Complete Chat API Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat endpoint
app.post('/api/ai/chat', authenticateUser, async (req, res) => {
  const { userId, message, sessionId, context } = req.body;

  try {
    // Sanitize input
    const sanitizedMessage = sanitizeMessage(message);

    // Store user message
    const result = await pool.query(
      `INSERT INTO chat_history (user_id, message, session_id, timestamp) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING id`,
      [userId, sanitizedMessage, sessionId]
    );

    const messageId = result.rows[0].id;

    // Get AI response
    const aiResponse = await getAIResponse(sanitizedMessage, context, userId);

    // Update with AI response
    await pool.query(
      'UPDATE chat_history SET response = $1 WHERE id = $2',
      [aiResponse, messageId]
    );

    // Update analytics
    await pool.query(
      `INSERT INTO ai_analytics (date, total_queries) 
       VALUES (CURRENT_DATE, 1) 
       ON CONFLICT (date) 
       DO UPDATE SET total_queries = ai_analytics.total_queries + 1`
    );

    res.json({
      success: true,
      response: aiResponse,
      messageId,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process message' 
    });
  }
});

// Feedback endpoint
app.post('/api/chat/feedback', authenticateUser, async (req, res) => {
  const { messageId, solved } = req.body;

  try {
    // Update satisfaction feedback
    await pool.query(
      'UPDATE chat_history SET satisfaction_feedback = $1 WHERE id = $2',
      [solved, messageId]
    );

    // Check if escalation needed
    const unsatisfiedCount = await pool.query(
      `SELECT COUNT(*) as count FROM chat_history 
       WHERE user_id = $1 
       AND satisfaction_feedback = false 
       AND timestamp > NOW() - INTERVAL '1 hour'`,
      [req.userId]
    );

    const escalationRequired = unsatisfiedCount.rows[0].count >= 3;

    // Update analytics
    const field = solved ? 'satisfied_responses' : 'unsatisfied_responses';
    await pool.query(
      `INSERT INTO ai_analytics (date, ${field}) 
       VALUES (CURRENT_DATE, 1) 
       ON CONFLICT (date) 
       DO UPDATE SET ${field} = ai_analytics.${field} + 1`
    );

    res.json({
      success: true,
      escalationRequired
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false });
  }
});

// Escalation endpoint
app.post('/api/chat/escalate', authenticateUser, async (req, res) => {
  const { userId, sessionId, escalationType, reason } = req.body;

  try {
    // Generate ticket number
    const ticketNumber = `TKT-${Date.now().toString().slice(-6)}`;

    // Get user info
    const userInfo = await pool.query(
      'SELECT name, email FROM users WHERE id = $1',
      [userId]
    );

    // Create support ticket
    const ticket = await pool.query(
      `INSERT INTO support_tickets 
       (ticket_number, user_id, user_name, user_email, issue, category, status, priority) 
       VALUES ($1, $2, $3, $4, $5, $6, 'escalated', 'high') 
       RETURNING id`,
      [
        ticketNumber,
        userId,
        userInfo.rows[0].name,
        userInfo.rows[0].email,
        reason,
        'Escalated from AI'
      ]
    );

    // Mark chat as escalated
    await pool.query(
      'UPDATE chat_history SET escalation_flag = true WHERE session_id = $1',
      [sessionId]
    );

    // Update analytics
    await pool.query(
      `INSERT INTO ai_analytics (date, escalated_queries) 
       VALUES (CURRENT_DATE, 1) 
       ON CONFLICT (date) 
       DO UPDATE SET escalated_queries = ai_analytics.escalated_queries + 1`
    );

    // Send notification based on escalation type
    if (escalationType === 'email') {
      await sendEmail(userInfo.rows[0].email, ticketNumber);
    } else if (escalationType === 'call') {
      await scheduleCallback(userId, ticketNumber);
    }

    res.json({
      success: true,
      ticketId: ticketNumber,
      message: 'Ticket created successfully',
      estimatedResponseTime: '15 minutes'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
```

---

## Deployment Checklist

- [ ] Set up database and run migrations
- [ ] Configure environment variables
- [ ] Set up OpenAI API key
- [ ] Implement authentication
- [ ] Add rate limiting
- [ ] Set up WebSocket server
- [ ] Configure email/SMS services
- [ ] Set up monitoring and logging
- [ ] Test all endpoints
- [ ] Set up HTTPS
- [ ] Configure CORS properly
- [ ] Set up backup strategy
- [ ] Implement error tracking (Sentry)
- [ ] Load testing
- [ ] Security audit

---

**Last Updated**: March 15, 2026
**Version**: 1.0.0

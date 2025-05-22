---

# 🧠 AI ChatBot – Intelligent Multi-Level Support Assistant#

**AI ChatBot** is a full-stack, intelligent customer support chatbot application developed using **Next.js**, **React**, **Node.js**, and **Gemini AI**. Created as part of a collaborative team project, the chatbot simulates a support assistant for a fictional sports retail company. The project highlights skills in **Generative AI integration**, **chatbot architecture**, and **modern web development**.


## 🚀 Project Highlights

* **Multi-Level Chatbot Design**: Starts with basic scripted responses and evolves into a generative AI-powered support system.
* **Retail Use-Case Simulation**: Supports purchasing, tracking, and canceling orders for a mock sporting goods retailer.
* **AI Integration**: Powered by **Gemini AI** via **OpenRouter API** and **LLaMA** for dynamic, intelligent conversations.
* **Team Collaboration**: Developed collaboratively, focusing on real-world project delivery and version control.

---

## 🛠 Tech Stack

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| **Next.js**    | Framework for React-based SSR       |
| **React**      | Frontend component architecture     |
| **Node.js**    | Backend services and APIs           |
| **Gemini AI**  | Generative AI for smart replies     |
| **OpenRouter** | API platform for AI integration     |
| **LLaMA**      | Language model for contextual logic |

---

## 💡 Features

* 🤖 **Conversational AI Interface**
  Handles user queries with intelligent, natural responses.

* 🛒 **Retail Operations**

  * **Purchases**: Simulate adding items to a cart and placing orders
  * **Tracking**: Validate tracking codes and return delivery status
  * **Cancellation**: Cancel orders and simulate refund process

* 📄 **Mock Order System**
  Generates:

  * Order numbers
  * Tracking IDs (e.g., `JMN321`)
  * Confirmation messages
  * Delivery estimates

* ⚙️ **Prompt Engineering**
  Custom system prompts to guide LLaMA and Gemini’s behavior.

---

## 📦 Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with `create-next-app`.

### ✅ Prerequisites

* Node.js (v16+)
* npm / yarn / bun / pnpm
* API key for OpenRouter (if integrating AI)

### 🧪 Run Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit: `http://localhost:3000`

### 🔧 Modify the Project

Edit the main chatbot interface at:

```
app/page.js
```

Project auto-refreshes as you update files.

---

## ✨ Live Demo Walkthrough

> 📺 [Watch the full demo on YouTube](https://www.youtube.com/watch?v=4RmZB5esvMs)

* **Welcome message** includes company name, store count, and services offered.
* **Purchase simulation**: User selects an item → receives confirmation and delivery details.
* **Tracking**: Input a 6-character tracking number → returns current order status.
* **Cancellation**: Cancel any order and simulate refund logic (5–7 business days).

Prompt engineering ensures realistic responses and fallback behavior when invalid inputs are used.

---

## 🌐 Deployment

Deployed using **Vercel** for seamless CI/CD.

### Deploy Your Own

1. Push this project to GitHub
2. Connect GitHub to [Vercel](https://vercel.com/)
3. Set any required environment variables (e.g., API key)
4. Deploy and go live in seconds

---

## 📘 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [OpenRouter API](https://openrouter.ai/)
* [Gemini AI Overview](https://deepmind.google/technologies/gemini/)
* [LLaMA Language Model](https://ai.meta.com/llama/)
* [Vercel Deployment Docs](https://vercel.com/docs)

---

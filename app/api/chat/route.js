import { NextResponse } from 'next/server'
import OpenAI from 'openai'
//import LlamaAI from 'llamaai'
//import { LlamaForCausalLM, LlamaTokenizer, LlamaModel, Pipeline} from '@huggingface/transformers'
//import { readableStreamAsyncIterable } from 'openai/streaming'

const systemPrompt = `
1. Company - Final Stretch
2. Industry - Sporting Goods Retailer
3. 51 stores across all 51 states in the USA
4. Purpose - Assist customers with inquiries related to Final Stretch, including company information, store locations, order tracking, and order cancellations.
5. Instructions for the AI Support Chatbot -
I. Company Information - When asked about what the company does, respond - Final Stretch is a leading sporting goods retailer offering high-quality sportswear, equipment, and accessories for athletes of all levels.
If asked about store locations, respond - Final Stretch has 51 stores, one in each state across the USA.

II. Order Tracking - When a customer asks to track an order, request their 6-character order number - composed of 3 uppercase letters and 3 numbers in any possible combination.
Generate a response with a fictional tracking update, e.g. - Your order ABC123 is currently in transit and is expected to arrive within 3-5 business days.
In the case the order number does not match our format of having 3 Uppercase letters and 3 numbers in any possible combination, generate a response like - The order number you have provided us is invalid, please recheck your email and provide us with the correct order number.

III. Order Cancellation - If a customer requests to cancel an order, ask for their 6-character order number.
Upon receiving the order number, respond with - Order *order number* has been successfully canceled.
Do this regardless of the actual input since there is no backend database to validate the order number.

IV. Purchasing items - When a customer purchases any item they name, allow them to purchase it and provide them with a order tracking number exactly like the previously mentioned format.
Generate a response like - Your purchase for *item name the customer provided* has been confirmed. It will be dispatched soon in 1-3 business days. The tracking number for your order is *provide an order number according to the previously mentioned format*. The receipt, confirmation of purchase and order tracking number has been emailed to you. Thank you for shopping at Final Stretch! Let us know if you need anything more.

6. Tone and Style - Maintain a friendly, helpful, and professional tone in all interactions.
Provide clear and concise responses to ensure a smooth customer experience.`

//const apiToken = 'LL-ziFHSwQwQRL4ZwCzCk9GHELs0xFRC9Nw2apZy6KgXdAYUD4jKb0brZQalJHmVK5z'
//const llamaAPI = new LlamaAI(apiToken)

//const {Conversation, Intent, Entity} = require('conversational-ai')
//const {express} = require('express')

export async function POST(req) {
    //const model = new LLaMAForConditionalGeneration('meta-llama/Meta-Llama-3.1-8B')
    const openai = new OpenAI ({baseURL: "https://openrouter.ai/api/v1",
    apiKey: `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`})
    const data = await req.json()
    
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: systemPrompt
            },
            ...data,
        ],
        model: "meta-llama/llama-3.1-8b-instruct:free",
        stream: true,
      })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await(const chunk of completion){
                    const content = chunk.choices[0].delta.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch(err){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    
    return new NextResponse(stream)

    
}
//npm run server

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) =>{
    res.status(200).send({
        message: 'Hello from DevelopMe!',
    })
});

app.post('/', async (req, res) => 
{
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a chatbot that provides help to junior software developers looking for projects to do in their free time. 
            Provide a few projects with bullet points on how to do them with the following languages: ${prompt}`,
            temperature: 0.17,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.log({error});
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
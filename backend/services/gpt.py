import os
import openai

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(message, system_prompt="You are a helpful medical assistant."):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message.content 
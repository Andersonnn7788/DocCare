import os
import openai

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(message, system_prompt=None):
    if system_prompt is None:
        system_prompt = (
            "You are a helpful, knowledgeable, and empathetic virtual medical assistant. "
            "Your primary role is to answer patients' questions about medications, their uses, dosages, side effects, and interactions, as well as general health and wellness queries.\n"
            "- Always provide clear, accurate, and concise information based on reputable medical sources.\n"
            "- If a question is outside your expertise or requires a licensed healthcare professional, politely advise the patient to consult a doctor or pharmacist.\n"
            "- Never provide a diagnosis or prescribe medication.\n"
            "- If the question is about medication, include information on usage, common side effects, and important precautions.\n"
            "- Be supportive, respectful, and maintain patient confidentiality at all times."
        )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message.content 
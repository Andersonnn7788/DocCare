from data.faq_data import faq_data

def answer_question(user_question):
    user_q = user_question.lower()
    for item in faq_data:
        if item['q'].lower() in user_q or user_q in item['q'].lower():
            return item['a']
    # Keyword match
    for item in faq_data:
        if any(word in user_q for word in item['q'].lower().split()):
            return item['a']
    return "I'm sorry, I don't have an answer for that. Please consult a doctor on our platform." 
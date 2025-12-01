import json

from django.db.backends.postgresql.psycopg_any import Json
from django.http import JsonResponse
from django.shortcuts import render

from chat_app.models import Chat


# Create your views here.
def chat_view(request):
    if request.method == "GET":
        all_chats = Chat.objects.all()  # Fetch all chat entries
        chats_data = list(all_chats.values())  # Convert QuerySet to list of dicts
        print("chats_data = ", chats_data)
        return JsonResponse({"chats": chats_data})
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        name = data.get("name", "").strip()
        message = data.get("message", "").strip()

        if not name or not message:
            return JsonResponse(
                {"error": "Name and message cannot be empty"}, status=400
            )

        chat = Chat(name=name, message=message)
        chat.save()

        return JsonResponse({"success": True, "chat_id": chat.id})

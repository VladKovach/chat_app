from django.db.backends.postgresql.psycopg_any import Json
from django.http import JsonResponse
from django.shortcuts import render
from market_app.models import Chat


# Create your views here.
def chat_view(request):
    if request.method == "GET":
        all_chats = Chat.objects.all()  # Fetch all chat entries
        print("all_chats.values() = ", all_chats.values())
        chats_data = list(all_chats.values())  # Convert QuerySet to list of dicts

        print("all_chats[0] = ", all_chats[0])
        return JsonResponse({"chats": chats_data})
    elif request.method == "POST":

        pass

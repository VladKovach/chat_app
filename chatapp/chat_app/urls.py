from django.urls import path

from chat_app.views import chat_view

urlpatterns = [
    path("", chat_view, name="chat_view"),
]
# urlpatterns

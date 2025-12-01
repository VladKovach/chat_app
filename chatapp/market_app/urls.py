from django.urls import path
from market_app.views import chat_view

urlpatterns = [
    path("", chat_view, name="chat_view"),
]
# urlpatterns

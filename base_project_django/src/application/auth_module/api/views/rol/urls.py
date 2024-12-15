

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.application.auth_module.api.views.rol.view import RolView

router = DefaultRouter()
router.register(r'rol', RolView, basename='rol')

urlpatterns = [
    path('', include(router.urls))
]

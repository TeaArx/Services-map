from rest_framework import  viewsets, generics
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ServiceFilterView

from . import serializers
from api_app.models import (
    Service,
    CustomUser,
)


class ServiceView(viewsets.ModelViewSet):
    """Представление Сервисов"""

    serializer_class = serializers.ServiceSerializer
    queryset = Service.objects.all()
    pagination_class = None
    
class CustomUserView(viewsets.ReadOnlyModelViewSet):
    """Представление Пользователей"""

    serializer_class = serializers.CustomUserSerializer
    queryset = CustomUser.objects.all()
    pagination_class = None
    
class ServiceFilterView(generics.ListAPIView):
    """Представление сервисов по имени, адресу и пользователю"""
    serializer_class = serializers.ServiceSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = ServiceFilterView

    def get_queryset(self):
        return Service.objects.all()

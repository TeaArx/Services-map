import django_filters
from api_app.models import Service


class ServiceFilterView(django_filters.FilterSet):
    """Фильтр для сервисов по имени, адресу и пользователю"""

    user_id = django_filters.NumberFilter(
        field_name='user_id', 
        lookup_expr='exact'
    )
    name = django_filters.CharFilter(
        field_name='name', 
        lookup_expr='icontains'
    )
    address = django_filters.CharFilter(
        field_name='address', 
        lookup_expr='icontains'
    )

    class Meta:
        model = Service
        fields = ['user_id', 'name', 'address']

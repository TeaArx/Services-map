from rest_framework import serializers
from .models import Service, CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор Пользователя"""
    
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",  # Логин пользователя
            "first_name",  # Имя пользователя
            "last_name",  # Фамилия пользователя
            "patronymic",  # Отчество пользователя
            "email",  # Email пользователя
            "speciality",  # Специальность пользователя
        )
        
class ServiceSerializer(serializers.ModelSerializer):
    """Сериализатор Сервиса"""
    user_id = CustomUserSerializer(many=True, read_only=True) 

    class Meta:
        model = Service
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.address = validated_data.get('address', instance.address)
        instance.description = validated_data.get('description', instance.description)
        instance.troubleshoot = validated_data.get('troubleshoot', instance.troubleshoot)
        instance.portainer = validated_data.get('portainer', instance.portainer)
        instance.save() 

        return instance

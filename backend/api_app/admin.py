from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Service, CustomUser

# Регистрируем сервисы
admin.site.register(Service)
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('patronymic', 'speciality')}),  
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('patronymic', 'speciality')}),  
    )
    list_display = UserAdmin.list_display + ('speciality',)  


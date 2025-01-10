from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class Service(models.Model):
    """Класс, описывающий сервисы"""
    name = models.CharField (verbose_name="Наименования сервиса", max_length=250)
    address = models.CharField (verbose_name="Адресс сервиса", max_length=250)
    description = models.TextField (verbose_name="Описания сервиса", blank=True)
    troubleshoot = models.TextField (verbose_name="Описания частых ошибок и их решений", blank=True)
    portainer = models.TextField (verbose_name="Контейнеры сервисов", blank=True)
    user_id = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name="Id пользователя",)
    
    class Meta:
        verbose_name = "Сервисы"
        verbose_name_plural = "Сервисы"

    def __str__(self):
        return self.name
    
class CustomUser(AbstractUser):
    """Класс, описывающий пользователя"""
    email = models.EmailField(verbose_name="Почта", unique=True)  
    speciality = models.CharField(verbose_name="Специальность пользователя", max_length=150, blank=True, null=True)
    patronymic = models.CharField(verbose_name="Отчество", max_length=255, blank=True)  
    
    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователь"
    def __str__(self):
        return self.username
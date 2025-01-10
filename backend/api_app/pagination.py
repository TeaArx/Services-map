import os
from typing import Literal

from django.conf import settings
from rest_framework.pagination import PageNumberPagination

from rest_framework.utils.urls import replace_query_param, remove_query_param


class CustomPageNumberPagination(PageNumberPagination):
    """Переопределение класса пагинации"""

    def get_next_link(self) -> Literal[b""] | None:
        """Переопределение метода формирования ссылки на следующую страницу"""
        if not self.page.has_next():
            return None
        if settings.DEBUG:
            url = self.request.build_absolute_uri()
        else:
            url = (
                f'http://{os.getenv("PRODUCTION_ADDRESS")}/backend{self.request.get_full_path()}'
            )
        page_number = self.page.next_page_number()
        return replace_query_param(url, self.page_query_param, page_number)

    def get_previous_link(self) -> Literal[b""] | None:
        """Переопределение метода формирования ссылки на предыдущую страницу"""
        if not self.page.has_previous():
            return None
        if settings.DEBUG:
            url = self.request.build_absolute_uri()
        else:
            url = (
                f'http://{os.getenv("PRODUCTION_ADDRESS")}/backend{self.request.get_full_path()}'
            )
        page_number = self.page.previous_page_number()
        if page_number == 1:
            return remove_query_param(url, self.page_query_param)
        return replace_query_param(url, self.page_query_param, page_number)

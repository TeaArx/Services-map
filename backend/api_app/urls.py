from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path(
        "Service/",
        views.ServiceView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "Service/<int:pk>/",
        views.ServiceView.as_view(
            {
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path("CustomUser/", views.CustomUserView.as_view({"get": "list"}),),
    path("Services/", views.ServiceFilterView.as_view(), name='Service-filter'),
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

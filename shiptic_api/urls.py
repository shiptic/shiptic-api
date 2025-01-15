from django.urls import include, path
from django.contrib import admin

from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts import views as account_views

from health_check.views import HealthCheckView

router = routers.DefaultRouter()

router.register(r'users', account_views.UserViewSet)
router.register(r'businesses', account_views.BusinessViewSet)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health_check'),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    #path('', include(router.urls)),
    path('auth/register', account_views.RegisterUserView.as_view(), name='register'),
    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),

]

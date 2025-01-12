from django.urls import include, path
#from rest_framework import routers
from django.contrib import admin

#from tutorial.quickstart import views

#router = routers.DefaultRouter()
#router.register(r'users', views.UserViewSet)

from rest_framework import routers

from apps.accounts import views as account_views

router = routers.DefaultRouter()

router.register(r'users', account_views.UserViewSet)
router.register(r'businesses', account_views.BusinessViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('', include(router.urls)),

]

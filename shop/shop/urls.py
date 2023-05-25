"""
URL configuration for shop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from shop_api.views import *
from rest_framework.authtoken import views



router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),

    path('api/categories/', CategoriesList.as_view()),

    path('api/register/', RegisterUser.as_view(), name='register'),
    path('api/login/', views.obtain_auth_token),
    path('api/category/<str:category>/', ProductList.as_view()),
    path('api/product/<int:product_id>', ProductView.as_view()),

    path('add-to-cart/<int:product_id>/', AddProduct.as_view()),
    path('shopping-cart/', ShoppingCartAPI.as_view()),
    path('update-quantity/<int:p_index>/<int:p_quantity>/', UpdateProductQuantity.as_view()),
    path('delete-product/<int:p_index>/', DeleteProduct.as_view()),
    path('clear-cart/', ClearCart.as_view()),

    path('create-order/', MakeOrder.as_view()),
    path('show-orders/', OverviewOrders.as_view()),
    path('show-order/<int:order_id>', OverviewOrder.as_view()),
    path('pay-order/<int:order_id>/', PayOrder.as_view()),
    path('update-status/', OrderStatus.as_view()),
]

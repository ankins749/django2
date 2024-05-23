from django.urls import path
from .views import index, nosotros, admin , agregar_producto, agregar_user , api, boleta,carrito_compras,historial_compras,mantenedor_bodega,mis_datos,navbar,nosotros
from .views import registro,store,ventas



urlpatterns = [
    path('', index, name="index"),
    path('nosotros', nosotros, name="nosotros"),
    path('admin',admin, name="admin"),
    path('agregar_producto', agregar_producto, name="agregar_producto"),
    path('agregar_user', agregar_user, name="agregar_user"),
    path('api', api, name="api"),
    path('boleta', boleta, name="boleta"),
    path('carrito_compras', carrito_compras, name="carrito_compras"),
    path('historial_compras', historial_compras, name="historial_compras"),
    path('mantenedor_bodega', mantenedor_bodega, name="mantenedor_bodega"),
    path('mismis_datos',mis_datos, name="mismis_datos"),
    path('navbar',navbar, name="navbar"),
    path('nosotros',nosotros, name="nosotros"),
    path('registro',registro, name="registro"),
    path('store',store, name="store"),
    path('ventas',ventas, name="ventas"),

]

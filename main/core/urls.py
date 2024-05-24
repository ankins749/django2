from django.urls import path
from .views import (
	index, nosotros, admin, 
	agregar_productos, agregar_user, api, 
	boleta, carrito_compras, historial_compras, 
	mantenedor_bodega, mis_datos, navegacion, 
	nosotros, registro, ventas
)

urlpatterns = [
    path('', index, name="index"),
    path('nosotros', nosotros, name="nosotros"),
    path('admin', admin, name="admin"),
    path('agregar_productos', agregar_productos, name="agregar_productos"),
    path('agregar_user', agregar_user, name="agregar_user"),
    path('api', api, name="api"),
    path('boleta', boleta, name="boleta"),
    path('carrito_compras', carrito_compras, name="carrito_compras"),
    path('historial_compras', historial_compras, name="historial_compras"),
    path('mantenedor_bodega', mantenedor_bodega, name="mantenedor_bodega"),
    path('mis_datos', mis_datos, name="mis_datos"),
    path('navegacion', navegacion, name="navegacion"),
    path('nosotros', nosotros, name="nosotros"),
    path('registro', registro, name="registro"),
    path('ventas', ventas, name="ventas"),
]

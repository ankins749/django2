from django.shortcuts import render

def index(request):
    return render(request, 'core/index.html')

def nosotros(request):
    return render(request, 'core/nosotros.html')
def admin(request):
    return render(request, 'core/admin.html')
def agregar_producto(request):
    return render(request, 'core/agregar_producto.html')
def agregar_user(request):
    return render(request, 'core/agregar_user.html')
def api(request):
    return render(request, 'core/api.html')
def boleta(request):
    return render(request, 'core/boleta.html')
def carrito_compras(request):
    return render(request, 'core/carrito_compras.html')
def historial_compras(request):
    return render(request, 'core/historial_compras.html')
def mantenedor_bodega(request):
    return render(request, 'core/mantenedor_bodega.html')
def mis_datos(request):
    return render(request, 'core/mis_datos.html')
def navbars(request):
    return render(request, 'core/navbars.html')
def nosotros(request):
    return render(request, 'core/nosotros.html')
def registro(request):
    return render(request, 'core/registro.html')
def store(request):
    return render(request, 'core/store.html')
def ventas(request):
    return render(request, 'core/ventas.html')




# Create your views here.

from django.db import models

# Create your models here.
class Producto(models.Model):
	CATEGORIAS = [
		("Carreras", "Carreras"),
		("Simulación", "Simulación"),
		("Acción", "Acción"),
		("Horror", "Horror"),
		("Aventura", "Aventura"),
		("Supervivencia", "Supervivencia"),
		("Sandbox", "Sandbox"),
		("Estrategia", "Estrategia"),
		("Party", "Party"),
		("Deportes", "Deportes")
	]

	id = models.AutoField(primary_key=True)
	nombre = models.CharField(max_length=100)
	precio = models.DecimalField(max_digits=12, decimal_places=0)
	stock = models.IntegerField(null=True, default=0)
	descripcion = models.TextField()
	imagen = models.ImageField(null=True, upload_to="img/")
	categoria = models.CharField(max_length=100, choices=CATEGORIAS, null=True)
	en_descuento = models.BooleanField(default=False)
	en_restock = models.BooleanField(default=False)
	descuento = models.DecimalField(max_digits=3, decimal_places=1, default=0)
	descuento_subs = models.DecimalField(max_digits=3, decimal_places=1, default=0)

	def __str__(self):
		return f"#{self.id} | {self.nombre}"

class Cuenta(models.Model):
	ROLES = [
		("Cliente", "Cliente"), 
		("Administrador", "Administrador")
	]

	rut = models.CharField(max_length=12, unique=True)
	nombres = models.CharField(max_length=100)
	apellidos = models.CharField(max_length=100)
	correo = models.EmailField(unique=True)
	direccion = models.TextField(max_length=100)
	contraseña = models.CharField(max_length=100)
	subscrito = models.BooleanField(default=False)
	rol = models.CharField(max_length=20, choices=ROLES, default="Cliente")
	favoritos = models.ManyToManyField(Producto, related_name="favorited_by", blank=True)

	def __str__(self):
		return f"{self.correo}"
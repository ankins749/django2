# Generated by Django 5.0.6 on 2024-06-30 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_calificacion_producto_descuento_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='descuento',
            field=models.DecimalField(choices=[('Carreras', 'Carreras'), ('Simulación', 'Simulación'), ('Acción', 'Acción'), ('Horror', 'Horror'), ('Aventura', 'Aventura'), ('Supervivencia', 'Supervivencia'), ('Sandbox', 'Sandbox'), ('Estrategia', 'Estrategia'), ('Party', 'Party'), ('Deportes', 'Deportes')], decimal_places=1, default=0, max_digits=3),
        ),
    ]

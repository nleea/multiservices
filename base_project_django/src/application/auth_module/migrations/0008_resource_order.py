# Generated by Django 5.0.7 on 2024-10-22 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_module', '0007_master'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]

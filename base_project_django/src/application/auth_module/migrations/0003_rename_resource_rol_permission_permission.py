# Generated by Django 5.0.7 on 2024-08-07 19:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_module', '0002_rename_persons_person'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rol_permission',
            old_name='resource',
            new_name='permission',
        ),
    ]

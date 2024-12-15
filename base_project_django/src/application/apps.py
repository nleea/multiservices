from django.apps import AppConfig

class AuthModuleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.application.auth_module'

class DefaultModuleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.application.default'

    def ready(self):
        import src.application.default.signals
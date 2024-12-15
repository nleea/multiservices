from rest_framework.viewsets import ViewSet
from src.application.auth_module.api.serializers.permission_serializer import PermissionValidateSerializer, PermissionUpdateValidateSerializer, PermissionCreateValidateSerializer
from src.application.auth_module.api.repositories.factory_repository import (
    AuthModuleRepositoryFactory,
)
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

class PermissionView(ViewSet):

    def get_serializer_class(self):
        return PermissionCreateValidateSerializer

    @property
    def get_service(self):
        return AuthModuleRepositoryFactory.get_permission_service(self.get_serializer_class())

    def list(self, request):
        res = self.get_service.get_all()
        return Response(**res)

    def retrieve(self, request, pk=None):
        
        """_summary_

        Returns:
            _type_: _description_
        """
        
        res = self.get_service.get_by_id(pk)
        return Response(**res)

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = PermissionValidateSerializer(data=data)

        if serializer.is_valid():
            res = self.get_service.create(serializer.data)
            return Response(**res)
        return Response(serializer.errors, 404)

    @extend_schema(request=PermissionUpdateValidateSerializer)
    def update(self, request, pk=None):

        data = request.data
        serializer = PermissionUpdateValidateSerializer(data=data)

        if serializer.is_valid():
            res = self.get_service.update(pk, serializer.data)
            return Response(**res)
        return Response(serializer.errors, 404)

    def destroy(self, request, pk=None):
        res = self.get_service.delete(pk)
        return Response(**res)

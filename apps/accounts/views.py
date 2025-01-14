# views.py
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.serializers import UserSerializer, UserRegistrationSerializer, BusinessSerializer
from apps.accounts.account_models import Business

User = get_user_model()


class RegisterUserView(APIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            user = serializer.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'user': user.email,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserViewSet(viewsets.ModelViewSet):
    """
    Users API endpoint
    """
    queryset = User.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Optional filter options by email and business name
        """
        queryset = super().get_queryset()

        email = self.request.query_params.get('email', None)
        business_name = self.request.query_params.get('business_name', None)

        if email:
            queryset = queryset.filter(email__iexact=email)
        if business_name:
            queryset = queryset.filter(business__name__iexact=business_name)

        return queryset

    def destroy(self, request, *args, **kwargs):
        """
        Override destroy to perform a soft delete
        """
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        return Response(
            {"detail": "User has been deleted"},
            status=status.HTTP_204_NO_CONTENT
        )
    

class BusinessViewSet(viewsets.ModelViewSet):
    """
    Busineeses API endpoint
    """
    queryset = Business.objects.all().order_by('-created_at')
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Optional filter options by name
        """
        queryset = super().get_queryset()

        name = self.request.query_params.get('name', None)

        if name:
            queryset = queryset.filter(name__iexact=name)

        return queryset
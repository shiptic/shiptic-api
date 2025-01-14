from django.contrib.auth import get_user_model
from django.db import IntegrityError

from rest_framework.exceptions import ValidationError
from rest_framework import serializers

User = get_user_model()

from apps.accounts.account_models import Business

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True)

    class Meta:

        model = User
        fields = ['user_id', 'email', 'password', 'business', 'account_status', 'is_root_user', 'parent_user']
        read_only_fields = ['user_id']

    def create(self, validated_data):

        password = validated_data.pop('password')

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user
    

class UserRegistrationSerializer(serializers.ModelSerializer):

    business_name = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:

        model = User
        fields = ['email', 'business_name', 'password', 'confirm_password']

    def to_internal_value(self, data):

        data = data.copy()

        if 'businessName' in data:
            data['business_name'] = data.pop('businessName')
        if 'confirmPassword' in data:
            data['confirm_password'] = data.pop('confirmPassword')

        return super().to_internal_value(data)

    def validate(self, data):

        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})

        business_name = data.get('business_name')
        if Business.objects.filter(name__iexact=business_name).exists():
            raise serializers.ValidationError({'business_name': 'A business with this name already exists.'})

        return data
    
    def create(self, validated_data):
        
        # Create business
        business_name = validated_data.pop('business_name')
        business = Business.objects.create(name=business_name)

        # Remove confirm password before creating user
        validated_data.pop('confirm_password')

        user = User.objects.create_user(**validated_data, business=business)
        user.save()

        return user
        


class BusinessSerializer(serializers.ModelSerializer):

    user_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:

        model = Business
        fields = ['business_id', 'name', 'address', 'user_id']
        read_only_fields = ['business_id']

    def create(self, validated_data):

        user_id = validated_data.pop('user_id')

        try:
            user = User.objects.get(user_id=user_id, is_active=True)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user_id": "Invalid user_id. User does not exist."})
        
        business = Business.objects.create(**validated_data)

        user.business = business
        user.save()

        return business


from django.contrib.auth import get_user_model
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


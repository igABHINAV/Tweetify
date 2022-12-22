from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

class Noteserializer(ModelSerializer) :
    class Meta :
        model=Note
        fields=[
            'username',
            'message',
            'tags',
            'date'
        ]

class SigninSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, min_length=6)
    password = serializers.CharField(max_length=150, write_only=True)
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, args):
        username = args.get('username', None)
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': ('username already exists')})
        return super().validate(args)
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
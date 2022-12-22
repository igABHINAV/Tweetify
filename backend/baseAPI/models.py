from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Note(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    username=models.CharField(max_length=200,blank=True,null=True)
    message=models.CharField(max_length=100000,null=True,blank=True,default="")
    date=models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=5000,null=True,blank=True,default="")
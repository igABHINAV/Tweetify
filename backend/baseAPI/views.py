from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import Noteserializer,SigninSerializer
from .models import Note
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def getNotes(req):
    if req.method=='GET' :
        user=req.user
        note=Note.objects.all().order_by('-date')
        flag=Noteserializer(note,many=True)
        return Response(flag.data)
    
    elif req.method=='POST':
        serializer=Noteserializer(data=req.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        else :
            return Response({"error":"Something went wrong !"})
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(req,username):
    user=req.user
    note=Note.objects.filter(username=username)
    flag=Noteserializer(note,many=True)
    return Response(flag.data)




class Signin(generics.GenericAPIView) :

    serializer_class=SigninSerializer
    def post(self, request):
        def get_tokens_for_user(user):
            refresh = RefreshToken.for_user(user)

            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        serializer = self.get_serializer(data = request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response({
                "Message": "User created successfully",
                
                "User": serializer.data}
                )
        
        return Response({"Errors":"Something went wrong!"})
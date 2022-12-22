from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/',views.Signin.as_view(),name='signup'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/',views.getNotes,name="notes"),
    path('note/<username>/',views.getNote,name='note'),
]

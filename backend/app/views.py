import json

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import CustomUser
from .serializers import UserUpdateSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            firstName = data.get("firstName")
            lastName = data.get("lastName")

            if not email or not password:
                return Response(
                    {"error": "Email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = CustomUser.objects.filter(email=email).first()
            if user is not None:
                return Response(
                    {"error": "User Already Exists"},
                    status=status.HTTP_409_CONFLICT,
                )

            CustomUser.objects.create_user(
                email=email, password=password, firstName=firstName, lastName=lastName
            )

            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )

        except json.JSONDecodeError:
            return Response(
                {"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return Response(
        {"error": "POST method required"}, status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_user(request):
    user = request.user
    serializer = UserUpdateSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        if "profile_picture" in request.FILES:
            user.profile_picture = request.FILES["profile_picture"]
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_profile_picture(request):
    user = request.user
    if user.profile_picture:
        profile_picture_url = request.build_absolute_uri(user.profile_picture.url)
        return Response({"profile_picture": profile_picture_url}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No profile picture available"}, status=status.HTTP_404_NOT_FOUND)
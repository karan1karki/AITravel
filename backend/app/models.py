from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=150)
    lastName = models.CharField(max_length=150)

    date_joined = models.DateTimeField(auto_now_add=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)


    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstName", "lastName"]

    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
        """
        Returns True if the user has the given permission.
        """
        # Admin users have all permissions
        if self.is_superuser:
            return True
        # You can customize this part based on your permission logic
        return False

    def has_module_perms(self, app_label):
        """
        Returns True if the user has permissions for the given app label.
        """
        # Admin users have access to all apps
        if self.is_superuser:
            return True
        # Customize this if needed based on the app label
        return False

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.
class HududViloyat(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class HududTuman(models.Model):
    name = models.CharField(max_length=50, unique=True)
    viloyat_id = models.ForeignKey(HududViloyat, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class CustomUserManager(BaseUserManager):

    def create_user(self, name, **extra_fields):

        if not name:
            raise ValueError(_('The name must be set'))
        # user_phone = self.get_by_natural_key(user_phone)
        user = self.model(user_phone=name, **extra_fields)
        # user.set_password(extra_fields['password'])
        user.save()
        return user

    def create_superuser(self, name, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_active') is not True:
            raise ValueError(_('Superuser must have is_active=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(name=name, **extra_fields)


class MyUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(_('Name'), max_length=50, unique=True)
    user_phone = models.CharField(_('Phone Number'), max_length=20, unique=True)

    viloyat = models.ForeignKey(HududViloyat, on_delete=models.CASCADE, null=True, blank=True, default=None)
    tuman = models.ForeignKey(HududTuman, on_delete=models.CASCADE, null=True, blank=True, default=None)
    muassasa = models.CharField(max_length=100, null=True, blank=True, default=None)
    is_type = models.CharField(max_length=20, null=True, blank=True, default=None)
    lavozimi = models.CharField(max_length=200, null=True, blank=True, default=None)
    # parol = models.CharField(max_length=20, null=True, blank=True, default=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateField(default=timezone.now)

    USERNAME_FIELD = 'user_phone'
    REQUIRED_FIELDS = ['name']

    object = CustomUserManager()

    class Meta:
        db_table = 'User'

    def __str__(self):
        return f'{self.name}'

    def __setitem__(self, key, value):
        self.__dict__[key] = value


class UserMuhokama(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    idea = models.TextField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.name

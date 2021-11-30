from django.db import models
from django.template.defaultfilters import slugify
from embed_video.fields import EmbedVideoField


class BilimSoxasi(models.Model):
    _id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=70)

    def __str__(self):
        return self.name


class TalimSoxasi(models.Model):
    _id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=200)
    bilim_id = models.ForeignKey(BilimSoxasi, on_delete=models.CASCADE, related_name='bilim')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Ta\'lim soxasi'


class TalimYunalishi(models.Model):
    _id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=200)
    tSoxa_id = models.ForeignKey(TalimSoxasi, on_delete=models.CASCADE, related_name='t_soxa')

    def __str__(self):
        return self.name


class KasbVaMutaxasislik(models.Model):
    _id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=200)
    img = models.ImageField(upload_to='images/')
    definition = models.TextField(max_length=1024)
    prof_stand = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    malaka_talab = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uquv_reja = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uquv_dastur = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uqutish_mater = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    professiog = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    date = models.DateField(auto_now=True)
    tYunalish_id = models.ForeignKey(TalimYunalishi, on_delete=models.CASCADE)

    # #slug = models.SlugField(unique=True, null=True, default=None)

    view = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def get_id(self):
        return self._id

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.slug = slugify(f"{self._id}-{self.name}")
    #     super(KasbVaMutaxasislik, self).save(force_insert=False, force_update=False, using=None,
    #                                          update_fields=None)


class UquvQullanma(models.Model):
    name = models.CharField(max_length=200)
    definition = models.TextField(max_length=1024)
    prof_stand = models.FileField(upload_to='files/', null=True, default=None, blank=True)

    guv_img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)
    guv_nomer = models.CharField(max_length=10, default=None, null=True, blank=True)
    guv_date = models.DateField(auto_now=True)
    guv_muall = models.CharField(max_length=100, default=None, null=True, blank=True)

    img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)
    view = models.PositiveIntegerField(default=0)

    date = models.DateField(auto_now=True)
    tSoxa_id = models.ForeignKey(TalimSoxasi, on_delete=models.CASCADE, verbose_name='Ta\'lim soxasi')
    k_va_m = models.ForeignKey(KasbVaMutaxasislik, on_delete=models.CASCADE, verbose_name='Kasb va mutaxasisliklar',
                               default=None, null=True, blank=True)

    # slug = models.SlugField(default=None, null=True, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'O\'quv qo\'llanma'
        verbose_name_plural = 'O\'quv qo\'llanmalar'

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.slug = slugify(f'{self.guv_nomer}-{self.name}')
    #     super(UquvQullanma, self).save(force_insert=False, force_update=False, using=None,
    #                                    update_fields=None)


class UquvMaterial(models.Model):
    name = models.CharField(max_length=200)
    definition = models.TextField(max_length=1024)
    prof_stand = models.FileField(upload_to='files/', null=True, default=None, blank=True)

    guv_img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)
    guv_nomer = models.CharField(max_length=10)
    guv_date = models.DateField(auto_now=True)
    guv_muall = models.CharField(max_length=100)

    img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)
    view = models.PositiveIntegerField(default=0)

    date = models.DateField(auto_now=True)
    tSoxa_id = models.ForeignKey(TalimSoxasi, on_delete=models.CASCADE)

    # slug = models.SlugField(blank=True, null=True, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'O\'quv material'
        verbose_name_plural = 'O\'quv materiallar'

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.slug = slugify(f'{self.guv_nomer}-{self.name}')
    #     super(UquvMaterial, self).save(force_insert=False, force_update=False, using=None,
    #                                    update_fields=None)


class QisqaKursTur(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Qisqa muddatli kurslar turi"


class QisqaMuddatliKurslar(models.Model):
    _id = models.CharField(max_length=10, null=True, default=None, blank=True)
    name = models.CharField(max_length=200)
    difinition = models.TextField(max_length=1024, null=True, default=None, blank=True)
    pdf = models.FileField(upload_to="files/", null=True, default=None, blank=True)
    img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)
    video = EmbedVideoField(verbose_name='YouTube URL', null=True, blank=True, default=None)

    date = models.DateField(auto_now=True)
    kurs_tur_id = models.ForeignKey(QisqaKursTur, on_delete=models.CASCADE)

    # slug = models.SlugField(blank=True, null=True, default=None)

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.slug = slugify(f'{self._id}-{self.name}')
    #     super(QisqaMuddatliKurslar, self).save(force_insert=False, force_update=False, using=None,
    #                                            update_fields=None)

    def __str__(self):
        return self.name


class SizUchunFoydali(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1024)
    url = models.URLField(verbose_name='url')
    imag = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name


class JurnalTur(models.Model):
    year = models.CharField(max_length=10)

    def __str__(self):
        return self.year

    class Meta:
        verbose_name_plural = 'Jurnal yillari'


class Jurnal(models.Model):
    soni = models.CharField(max_length=10)
    pdf = models.FileField(upload_to='files/')
    year_id = models.ForeignKey(JurnalTur, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='images/', null=True, default=None, blank=True)

    def __str__(self):
        return f'{self.year_id} {self.soni}'


class Muhokama(models.Model):
    _id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=200)
    img = models.ImageField(upload_to='images/')
    definition = models.TextField(max_length=1024)
    prof_stand = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    malaka_talab = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uquv_reja = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uquv_dastur = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    uqutish_mater = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    professiog = models.FileField(upload_to='files/', null=True, default=None, blank=True)
    date = models.DateField(auto_now=True)

    # slug = models.SlugField(blank=True, null=True, default=None)

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     self.slug = slugify(f'{self._id}-{self.name}')
    #     super(Muhokama, self).save(force_insert=False, force_update=False, using=None,
    #                                update_fields=None)

    def __str__(self):
        return self.name

    def get_id(self):
        return self._id


class Yangilik(models.Model):
    text = models.CharField(max_length=200)
    description = models.TextField()
    img = models.ImageField(upload_to='images/')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Yangiliklar'

    def __str__(self):
        return self.text

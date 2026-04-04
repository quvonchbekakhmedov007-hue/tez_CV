from django.db import models
from django.conf import settings

TEMPLATE_CHOICES = [
    ('modern', 'Modern'),
    ('classic', 'Classic'),
    ('creative', 'Creative'),
]

SKILL_LEVEL_CHOICES = [
    (1, 'Boshlang\'ich'),
    (2, 'O\'rta-past'),
    (3, 'O\'rta'),
    (4, 'Yuqori'),
    (5, 'Ekspert'),
]

LANGUAGE_LEVEL_CHOICES = [
    ('A1', 'A1 - Boshlang\'ich'),
    ('A2', 'A2 - Elementar'),
    ('B1', 'B1 - O\'rta'),
    ('B2', 'B2 - O\'rta-yuqori'),
    ('C1', 'C1 - Yuqori'),
    ('C2', 'C2 - Professional'),
    ('native', 'Ona tili'),
]


class CV(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cvs')
    title = models.CharField(max_length=150, default='Mening CV')
    template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES, default='modern')

    # Personal info
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profession = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=25)
    address = models.CharField(max_length=200, blank=True)
    website = models.CharField(max_length=200, blank=True)
    linkedin = models.CharField(max_length=200, blank=True)
    github = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='cv_photos/', blank=True, null=True)

    # Summary
    summary = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.title}"


class Experience(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='experiences')
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    start_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"


class Education(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='educations')
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200, blank=True)
    start_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20, blank=True)
    is_current = models.BooleanField(default=False)
    gpa = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Skill(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    level = models.IntegerField(choices=SKILL_LEVEL_CHOICES, default=3)
    category = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Language(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='languages')
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=10, choices=LANGUAGE_LEVEL_CHOICES, default='B1')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.level})"


class Certificate(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='certificates')
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, blank=True)
    date = models.CharField(max_length=20, blank=True)
    url = models.CharField(max_length=300, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

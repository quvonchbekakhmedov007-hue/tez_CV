from django.contrib import admin
from .models import CV, Experience, Education, Skill, Language, Certificate


class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 0


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0


class LanguageInline(admin.TabularInline):
    model = Language
    extra = 0


class CertificateInline(admin.TabularInline):
    model = Certificate
    extra = 0


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'first_name', 'last_name', 'template', 'created_at')
    list_filter = ('template',)
    search_fields = ('title', 'first_name', 'last_name', 'user__email')
    inlines = [ExperienceInline, EducationInline, SkillInline, LanguageInline, CertificateInline]

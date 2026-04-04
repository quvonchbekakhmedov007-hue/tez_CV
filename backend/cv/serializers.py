from rest_framework import serializers
from .models import CV, Experience, Education, Skill, Language, Certificate


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        read_only_fields = ('cv',)


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        read_only_fields = ('cv',)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ('cv',)


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        read_only_fields = ('cv',)


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'
        read_only_fields = ('cv',)


class CVSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    certificates = CertificateSerializer(many=True, read_only=True)

    class Meta:
        model = CV
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')


class CVCreateSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    educations = EducationSerializer(many=True, required=False)
    skills = SkillSerializer(many=True, required=False)
    languages = LanguageSerializer(many=True, required=False)
    certificates = CertificateSerializer(many=True, required=False)

    class Meta:
        model = CV
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        educations_data = validated_data.pop('educations', [])
        skills_data = validated_data.pop('skills', [])
        languages_data = validated_data.pop('languages', [])
        certificates_data = validated_data.pop('certificates', [])

        cv = CV.objects.create(**validated_data)

        for exp in experiences_data:
            Experience.objects.create(cv=cv, **exp)
        for edu in educations_data:
            Education.objects.create(cv=cv, **edu)
        for skill in skills_data:
            Skill.objects.create(cv=cv, **skill)
        for lang in languages_data:
            Language.objects.create(cv=cv, **lang)
        for cert in certificates_data:
            Certificate.objects.create(cv=cv, **cert)

        return cv

    def update(self, instance, validated_data):
        validated_data.pop('experiences', None)
        validated_data.pop('educations', None)
        validated_data.pop('skills', None)
        validated_data.pop('languages', None)
        validated_data.pop('certificates', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class CVListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = ('id', 'title', 'template', 'first_name', 'last_name', 'profession', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

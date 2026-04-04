from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.template.loader import render_to_string
from .models import CV, Experience, Education, Skill, Language, Certificate
from .serializers import (
    CVSerializer, CVCreateSerializer, CVListSerializer,
    ExperienceSerializer, EducationSerializer,
    SkillSerializer, LanguageSerializer, CertificateSerializer
)
try:
    from xhtml2pdf import pisa
    import io
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False


class CVListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CVCreateSerializer
        return CVListSerializer

    def get_queryset(self):
        return CV.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CVDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return CVCreateSerializer
        return CVSerializer

    def get_queryset(self):
        return CV.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def duplicate_cv(request, pk):
    cv = get_object_or_404(CV, pk=pk, user=request.user)
    new_cv = CV.objects.create(
        user=request.user,
        title=f"{cv.title} (nusxa)",
        template=cv.template,
        first_name=cv.first_name,
        last_name=cv.last_name,
        profession=cv.profession,
        email=cv.email,
        phone=cv.phone,
        address=cv.address,
        website=cv.website,
        linkedin=cv.linkedin,
        github=cv.github,
        summary=cv.summary,
    )
    for exp in cv.experiences.all():
        Experience.objects.create(
            cv=new_cv, company=exp.company, position=exp.position,
            location=exp.location, start_date=exp.start_date,
            end_date=exp.end_date, is_current=exp.is_current,
            description=exp.description, order=exp.order
        )
    for edu in cv.educations.all():
        Education.objects.create(
            cv=new_cv, institution=edu.institution, degree=edu.degree,
            field=edu.field, start_date=edu.start_date, end_date=edu.end_date,
            is_current=edu.is_current, gpa=edu.gpa,
            description=edu.description, order=edu.order
        )
    for skill in cv.skills.all():
        Skill.objects.create(cv=new_cv, name=skill.name, level=skill.level,
                             category=skill.category, order=skill.order)
    for lang in cv.languages.all():
        Language.objects.create(cv=new_cv, name=lang.name, level=lang.level, order=lang.order)
    for cert in cv.certificates.all():
        Certificate.objects.create(
            cv=new_cv, name=cert.name, issuer=cert.issuer,
            date=cert.date, url=cert.url, order=cert.order
        )
    serializer = CVSerializer(new_cv)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_cv_pdf(request, pk):
    cv = get_object_or_404(CV, pk=pk, user=request.user)
    template_name = f"cv/{cv.template}_template.html"

    context = {'cv': cv}
    html_content = render_to_string(template_name, context)

    if PDF_AVAILABLE:
        result = io.BytesIO()
        pdf = pisa.pisaDocument(io.BytesIO(html_content.encode('UTF-8')), result)
        if not pdf.err:
            response = HttpResponse(result.getvalue(), content_type='application/pdf')
            filename = f"{cv.first_name}_{cv.last_name}_CV.pdf"
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response

    response = HttpResponse(html_content, content_type='text/html')
    return response


# --- Nested resource views ---

class ExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_cv(self):
        return get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)

    def get_queryset(self):
        return Experience.objects.filter(cv=self.get_cv())

    def perform_create(self, serializer):
        serializer.save(cv=self.get_cv())


class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cv = get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)
        return Experience.objects.filter(cv=cv)


class EducationListCreateView(generics.ListCreateAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_cv(self):
        return get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)

    def get_queryset(self):
        return Education.objects.filter(cv=self.get_cv())

    def perform_create(self, serializer):
        serializer.save(cv=self.get_cv())


class EducationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cv = get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)
        return Education.objects.filter(cv=cv)


class SkillListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_cv(self):
        return get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)

    def get_queryset(self):
        return Skill.objects.filter(cv=self.get_cv())

    def perform_create(self, serializer):
        serializer.save(cv=self.get_cv())


class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cv = get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)
        return Skill.objects.filter(cv=cv)


class LanguageListCreateView(generics.ListCreateAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticated]

    def get_cv(self):
        return get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)

    def get_queryset(self):
        return Language.objects.filter(cv=self.get_cv())

    def perform_create(self, serializer):
        serializer.save(cv=self.get_cv())


class LanguageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cv = get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)
        return Language.objects.filter(cv=cv)


class CertificateListCreateView(generics.ListCreateAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]

    def get_cv(self):
        return get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)

    def get_queryset(self):
        return Certificate.objects.filter(cv=self.get_cv())

    def perform_create(self, serializer):
        serializer.save(cv=self.get_cv())


class CertificateDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cv = get_object_or_404(CV, pk=self.kwargs['cv_pk'], user=self.request.user)
        return Certificate.objects.filter(cv=cv)

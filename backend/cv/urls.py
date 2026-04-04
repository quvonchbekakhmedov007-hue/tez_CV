from django.urls import path
from . import views

urlpatterns = [
    path('', views.CVListCreateView.as_view(), name='cv-list-create'),
    path('<int:pk>/', views.CVDetailView.as_view(), name='cv-detail'),
    path('<int:pk>/duplicate/', views.duplicate_cv, name='cv-duplicate'),
    path('<int:pk>/download/', views.download_cv_pdf, name='cv-download'),

    # Experiences
    path('<int:cv_pk>/experiences/', views.ExperienceListCreateView.as_view(), name='experience-list'),
    path('<int:cv_pk>/experiences/<int:pk>/', views.ExperienceDetailView.as_view(), name='experience-detail'),

    # Educations
    path('<int:cv_pk>/educations/', views.EducationListCreateView.as_view(), name='education-list'),
    path('<int:cv_pk>/educations/<int:pk>/', views.EducationDetailView.as_view(), name='education-detail'),

    # Skills
    path('<int:cv_pk>/skills/', views.SkillListCreateView.as_view(), name='skill-list'),
    path('<int:cv_pk>/skills/<int:pk>/', views.SkillDetailView.as_view(), name='skill-detail'),

    # Languages
    path('<int:cv_pk>/languages/', views.LanguageListCreateView.as_view(), name='language-list'),
    path('<int:cv_pk>/languages/<int:pk>/', views.LanguageDetailView.as_view(), name='language-detail'),

    # Certificates
    path('<int:cv_pk>/certificates/', views.CertificateListCreateView.as_view(), name='certificate-list'),
    path('<int:cv_pk>/certificates/<int:pk>/', views.CertificateDetailView.as_view(), name='certificate-detail'),
]

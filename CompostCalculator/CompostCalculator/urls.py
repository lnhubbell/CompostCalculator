from django.conf.urls import patterns, include, url
from django.contrib import admin

from calculator.views import RegistrationView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'CompostCalculator.views.home', name='home'),
    url(r'^calculator/', include('calculator.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('registration.auth_urls')),
    url(r'^accounts/profile/', 'calculator.views.profile', name='profile'),
    url(r'^accounts/register/',
        RegistrationView.as_view(),
        name='registration_register'),

)

from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'CompostCalculator.views.home', name='home'),
    url(r'^calculator/', include('calculator.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('registration.backends.simple.urls')),
    url(r'^accounts/profile/', 'calculator.views.profile', name='profile'),
)

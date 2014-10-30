from django.conf.urls import patterns, include, url
from api import CompostItemDetail, CompostItemList
from api import RecipeDetail, RecipeList, UserDetail, UserList, UserDestroy
from django.contrib.auth import views as auth_views

item_urls = patterns('',
    url(r'^/(?P<pk>\d+)$', CompostItemDetail.as_view(), name='photo-detail'),
    url(r'^$', CompostItemList.as_view(), name='photo-list'),
)

recipe_urls = patterns('',
    url(r'^/(?P<pk>\d+)$', RecipeDetail.as_view(), name='recipe-detail'),
    url(r'^$', RecipeList.as_view(), name='recipe-list'),

)

user_urls = patterns('',
    url(r'^/(?P<pk>\d+)$', UserDetail.as_view(), name='user-detail'),
    url(r'^$',UserList.as_view(), name='user-list'),
    # url(r'^/destroy/(?P<pk>\d+)$', UserDestroy.as_view(), name='user-destroy'),
    url(r'^/destroy/(?P<username>.+)/$', UserDestroy.as_view(), name='user-destroy'),
)


urlpatterns = patterns('',
    url(r'^$', 'calculator.views.home', name='home'),
    url(r'new', 'calculator.views.create', name='create'),
    url(r'list', 'calculator.views.list', name='list'),
    url(r'modal', 'calculator.views.modal', name='modal'),
    url(r'heap', 'calculator.views.heap', name='heap'),
    url(r'browse', 'calculator.views.browse', name='browse'),
    url(r'testInLay', 'calculator.views.testInLay', name='testInLay'),
    url(r'^login/$', auth_views.login,
       {'template_name': 'registration/login.html'}, name='auth_login'),
    url(r'^logout/$', auth_views.logout,
       {'template_name': 'calculator/base.html'}, name='auth_logout'),
    # url(r'^post_item/', 'calculator.views.submit', name='submit'),
    url(r'^items', include(item_urls)),
    url(r'^recipes', include(recipe_urls)),
    url(r'^users', include(user_urls)),
)

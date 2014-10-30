from django.shortcuts import render, HttpResponse
from django.views.generic import CreateView, UpdateView, DetailView
from calculator.models import CompostItem
from calculator.forms import CompostItemCreateForm, CompostItemUpdateForm

from registration.backends.simple.views import RegistrationView as BaseRegistrationView

class CompostItemCreate(CreateView):
    template_name = 'calculator/base.html'
    model = CompostItem
    form_class = CompostItemCreateForm
    def create(self, request, *args, **kwargs):
        return HttpResponse(request, {'form': CompostItemCreateForm})

class RegistrationView(BaseRegistrationView):
    def get_success_url(self, request, user):
        return "/calculator/"


def home(request):
    template_name = 'calculator/base.html'
    return render(request, template_name, {'form': CompostItemCreateForm})

def create(request):
    template_name = 'calculator/create.html'
    return render(request, template_name)

def list(request):
    template_name = 'calculator/list.html'
    return render(request, template_name)

def modal(request):
    template_name = 'calculator/modal.html'
    return render(request, template_name)

def heap(request):
    template_name = 'calculator/heap.html'
    return render(request, template_name, {'user':request.user})


def profile(request):
    template_name="calculator/profile.html"
    return render(request, template_name)

def testInLay(request):
    template_name="calculator/testInlay.html"
    return render(request, template_name)

def browse(request):
    template_name="calculator/browse.html"
    return render(request, template_name)


# class CompostItemUpdate(UpdateView):
#     model = CompostItem
#     form_class = CompostItemUpdateForm

# class CompostItemDetail(DetailView):
#     model = CompostItem





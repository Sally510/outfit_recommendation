from django.shortcuts import render

from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the accounts index.")

# def index(request):
#     return render(request, "users/index.html")
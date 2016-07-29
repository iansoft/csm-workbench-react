# _*_ coding: utf-8 _*_
import json
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect
from django.utils.translation import ugettext_lazy as _


class IndexView(TemplateView):
    template_name = 'dashboard/index.html'

    def dispatch(self, request, *args, **kwargs):
        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context
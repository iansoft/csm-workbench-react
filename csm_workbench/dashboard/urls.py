from django.conf.urls import include, url
from dashboard.views import IndexView
urlpatterns = [
    url(r'^$', IndexView.as_view(),name="homepage"),
]
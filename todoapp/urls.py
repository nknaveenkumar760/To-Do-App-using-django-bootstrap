from django.urls import path
from todoapp import views

urlpatterns = [
    path('', views.index, name='index'),
    path('task', views.addtask, name='task'),
    path('delete', views.delete, name='delete'),
    path('edit', views.edits, name='edit'),
    path('savemodal', views.savemodal, name='savemodal'),
]

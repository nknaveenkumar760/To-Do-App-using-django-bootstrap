from django.shortcuts import render, HttpResponse,redirect
from todoapp.models import Category, Task
import json
import datetime
# Create your views here.


def index(request):
    category1 = Category.objects.all()
    task = Task.objects.all()
    reminder = Task.objects.filter(due_date=datetime.datetime.now().date())
    if reminder:
        print("Today is  task")
    else:
        print("No any Task")
    print(reminder)
    return render(request, 'index.html', {'category': category1, 'task': task})


def addtask(request):

    if request.method == "POST":
        title = request.POST['title']
        category = request.POST['category']
        date = str(request.POST['date'])
        content = title + date + category

        record = Task(title=title, content=content, due_date=date, category=category)
        record.save()

    return HttpResponse("Task is Saved Successfully")


def delete(request):

    checked = request.POST.getlist('arr[]')

    for check in checked:

        Task.objects.get(id=int(check)).delete()

    return HttpResponse("/")


def edits(request):

    id = request.POST.get('arr')
    print(id)

    editdata = Task.objects.get(id=id)
    print(editdata.title)

    record = {}

    record['id'] = editdata.id
    record['title'] = editdata.title
    record['category'] = editdata.category
    record['date'] = str(editdata.due_date)
    return HttpResponse(json.dumps(record), content_type="application/json")


def savemodal(request):

    id = request.POST.get('id')
    title = request.POST.get('description')
    category = request.POST.get('category_select')
    date = request.POST.get('date')
    content = title + date + category
    savedata = Task(id=id, title=title, content=content, due_date=date, category=category)
    savedata.save()
    return redirect('/')

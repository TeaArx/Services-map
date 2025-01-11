# ИС "Карта сервисов"

Сервис для просмотра сервисов а также выявления частых проблем и отвественных

## Функционал

- Просмотр Сервисов
- Редактирования сервисов


## Стек технологий

При разработке данной ИС были использованы следующие технологии:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitLab CI](https://img.shields.io/badge/gitlab%20ci-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)


### Расположение

На момент написания документации:

* Release (frontend): ```http://x.x.x.x:6020```
* Release (backend): ```http://x.x.x.x:6010```
* Development: ```http://localhost:3000```

<h3>Установка:</h3>
    backend:
    1. Установка poetry здесь: https://python-poetry.org/docs/#installing-with-the-official-installer

    2. Ввод следующих команд в командной строке:

        1. poetry shell
        2. poetry install

    3. Создать и настроить .env файл в корневой папке проекта
    4. Сделать миграции баз данных с помощью python manage.py migrate

    frontend:
    1. Установка node js здесь: https://nodejs.org/en

    2. Ввод следующих команд в командной строке:

        1. npm install

    3. Создать и настроить .env файл в корневой папке проекта
<h3>Запуск:</h3>

    backend:
    1. Ввод в командной строке: python manage.py runserver

    frontend:
    1. Ввод в командной строке: npm run dev

<h3>Документация:</h3>
    backend:
    /swagger/
    /schema/
    /redoc/

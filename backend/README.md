# ИС "Карта сервисов" - серверная часть (Rest API)

Restful API, like a trusty steed on the open range, rides smooth and steady, delivering data to weary travelers in need of information.


## Перед установкой
На вашей локальной тачке нужны следующие установленные программы (утилиты):
- [Python >= 3.12](https://www.python.org/)
- [Poetry](https://python-poetry.org/)

## Установка
1) Клонируем репозиторий
    ```bash
    git clone 
    ```
2) Переходим в папку проекта и в папку серверной части
    ```bash
    cd /services-map/backend 
    ```
3) Создаём виртуальную среду
    ```bash
    poetry shell
    ```
4) Ставим зависимости
    ```bash
    poetry install
    ```
5) Создаём ```.env``` файл на основе шаблона для работоспособности приложения
6) Запускаем приложение
    ```bash
    python manage.py runserver
    ```

## Отладочные настройки
1) Не забываем прописать cors-allowed-origins
2) Внимательно следим за тем какая база данных сейчас используется

## Структура приложения
```
├───backend
│   ├───servicemap
│   ├───api_app
│   │   ├───migrations
│   └───xmls_downloads
```
- ```servicemap``` - Папка с конфигурационными файлами
- ```api_app``` - Папка с самим приложением
    - ```migrations``` - Модули миграций бд джанго
## Структура БД
1) ```Service``` - Таблица с сервисами
2) ```CustomUser``` - Таблица описывающий пользователя 

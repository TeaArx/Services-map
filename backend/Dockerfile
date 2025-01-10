FROM python:3.12-slim AS builder

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_NO_INTERACTION=1

ENV PATH="$POETRY_HOME/bin:$PATH"

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /opt/app

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root --only main

#_________________________________________________________________

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/app/.venv/bin:$PATH" \
    APP_HOME="/opt/app"

RUN addgroup --system app \
    && adduser --system --group app

WORKDIR $APP_HOME

COPY . ./

COPY --from=builder /opt/app/.venv ./.venv

RUN mkdir xmls_downloads log

RUN chown -R app:app $APP_HOME

USER app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "config.wsgi:application", "-b", "0.0.0.0:8000", "--timeout", "900"]

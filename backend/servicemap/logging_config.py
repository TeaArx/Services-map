CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(name)s - %(message)s"
        },
        "simple": {"format": "%(levelname)s %(name)s - %(message)s"},
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "WARNING",
            "class": "logging.FileHandler",
            "filename": "log/bills_reestr.log",
            "mode": "a",
            "encoding": "utf-8",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "": {
            "level": "DEBUG",
            "handlers": ["console", "file"],
            "propagate": False,
        },
        "django.server": {
            "level": "DEBUG",
            "handlers": ["console", "file"],
            "propagate": False,
        },
        "django.template": {
            "level": "WARNING",
            "handlers": ["console", "file"],
            "propagate": False,
        },
        "django.db.backends": {
            "level": "DEBUG",
            "handlers": ["console"],
            "propagate": False,
        },
        "django.security": {
            "level": "DEBUG",
            "handlers": ["console", "file"],
            "propagate": False,
        },
        "django.security.csrf": {
            "level": "DEBUG",
            "handlers": ["console", "file"],
            "propagate": False,
        },
    },
}

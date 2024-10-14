from celery import Celery
from flask import current_app as app

celery = Celery("Application Jobs")            
class ContextTask(celery.Task):
    def __call__(self, *args, **kwargs):
        with app.app_context():
            return self.run(*args, **kwargs)

# Here is a succinct explanation of the ContextTask class definition:

# The ContextTask class is a custom Celery task class that inherits from celery.Task.
# The call method:
# Creates an application context using app.app_context().
# Calls the run method of the task with the provided arguments and keyword arguments, within the application context.
# In other words, this class ensures that Celery tasks are executed within the Flask application context, which is necessary for accessing Flask's configuration, database connections, and other application-level resources.
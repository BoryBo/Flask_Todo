from mvc import app
from mvc.models import Todo, db


@app.shell_context_processor
def create_shell_context():
    return {'db': db, "Todo": Todo }
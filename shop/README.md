# Install Python 3.11: 
Ensure that Python 3.11 is installed on the computer. You can download and install Python 3.11 from the official Python website (https://www.python.org).

## Set up a virtual environment: 
Create a virtual environment for your project to isolate its dependencies. Open the terminal or command prompt and navigate to your project directory. Then, run the following command to create a virtual environment:

```
python3.11 -m venv myenv
```
Activate the virtual environment using the appropriate command based on the operating system:

### For Windows:

```
myenv\Scripts\activate
```
### For macOS/Linux:

```
source myenv/bin/activate
```
## Install Django and Django Rest Framework: 
With the virtual environment activated, install Django and Django Rest Framework using the following command:

```python
pip install django djangorestframework
```
## Install django-cors-headers: 
Install the django-cors-headers package, which allows Cross-Origin Resource Sharing (CORS) in your Django project:
```python
pip install django-cors-headers
```
## Install requests which allows communication between 2 APIs.
```python
pip install requests
```
## Install psycopg2-binary:
This library allows django to connect with PostgreSQL
```python
pip install psycopg2-binary
```

## Set up the PostgreSQL database: 
Install PostgreSQL on the computer and create a new PostgreSQL database for your project. Note down the database name, username, password, and host details for the next step.

# Configure the project settings: 
In your Django project, open the settings.py file and make the following changes:

## Set up the database connection details by updating the DATABASES configuration. 
Provide the PostgreSQL database name, username, password, and host information.


## Migrate the database: Run the following command to apply the initial database migrations:
```python
python manage.py migrate
python manage.py loaddata sample
```
## Launch the development server: 
Start the development server using the following command:

```python
python manage.py runserver 127.0.0.1:7777
```
The server will start running on http://localhost:7777.

## Initialize passwords for test users
Go to http://localhost:7777/passwords/
Then comment out line in urls.py
```python
path('passwords/', SetupPasswords.as_view())
```

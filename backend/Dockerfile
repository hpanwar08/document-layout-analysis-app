# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

ENV APP /app

WORKDIR ${APP}

ENV PYTHONUSERBASE ${APP}
ENV PATH "${PYTHONUSERBASE}/bin:$PATH"
ENV User appuser
ENV MPLCONFIGDIR /tmp/


RUN apt-get update -y \
    && apt-get -y install \
    git \
    build-essential=12.6 \
    libglib2.0-0=2.58.3-2+deb10u2 \
    libsm6=2:1.2.3-1 \
    libxext6=2:1.3.3-1+b2 \
    libxrender-dev=1:0.9.10-1 \
    libgl1-mesa-dev=18.3.6-2+deb10u1 \
    && rm -rf /var/lib/apt/lists/*

# Detectron2 prerequisites
RUN pip install --user --no-cache-dir torch==1.5.1+cpu torchvision==0.6.1+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install --user --no-cache-dir cython
RUN pip install --user --no-cache-dir pycocotools

# Install pip requirements
ADD requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Detectron2 - CPU copy
RUN pip install --user --no-cache-dir detectron2==0.2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cpu/torch1.5/index.html

COPY . .

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN useradd ${User} && chown -R ${User} ${APP}
USER ${User}

# CMD ["gunicorn", "--config", "gunicorn.conf.py", "dla:app"]
CMD ["flask", "run", "--host", "0.0.0.0"]

FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    /usr/local/bin/python -m pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
EXPOSE 9001
CMD [ "python", "main.py" ]
FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libzip-dev unzip libpng-dev libonig-dev libxml2-dev zip curl git \
    && docker-php-ext-install pdo pdo_mysql zip

RUN a2enmod rewrite

COPY apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR  /var/www/html

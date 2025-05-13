<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- FUTURES
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]-->





<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="/logo.png" alt="Logo" width="160" height="160">
  </a>

<h3 align="center">StreamHub</h3>

  <p align="center">
    Una aplicacion con la que compartir tu gusto cinematografico con el mundo
    <br />
</div>

[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#test">Test</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre StreamHub

StreamHub es una red social centrada en peliculas y series. El objetivo de StreamHub es quitarle importancia a la opinion de criticos y darsela a la comunidad, consiguiendo asi una manera mas completa e involucrada para descubrir nuevas peliculas y series y poder compartir estos descubrimientos con amigos.

## Contributors
[![Contributors][contributors-shield]][contributors-url]

Adrián Ortega Olgoso - adrian.ortega@gracia.lasalle.cat

### Built With

* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* ![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

<!-- See: https://github.com/alexandresanlim/Badges4-README.md-Profile?tab=readme-ov-file#-terminal -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
Estas instrucciones serviran para levantar el backend localmente.

### Prerequisites

- PHP >= 8.0
- Composer
- MySQL o SQLite
- Laravel CLI (`composer global require laravel/installer`)

### Installation

### Installation

1. Clona el repositorio
   ```bash
   git clone https://github.com/github_username/streamhub-backend.git
   cd streamhub-backend
   ```
2. Instala dependencias
  ```
  composer install
  ```
3. Copia el archibo .env
  ```
  cp .env.example .env
  ```
4. Configura la base de datos en .env con tu configuración
5. Instala el paquete de mongodb
   ```
   composer require jenssegers/mongodb
   ```
6. Haz las migrations
   ```
   docker exec -it laravel_app php artisan migrate
   ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



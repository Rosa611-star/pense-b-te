# 📝 Pense-Bête — Application de gestion de notes

Une application web full-stack pour créer, organiser et gérer vos notes personnelles selon leur priorité. Construite avec **Laravel 12** (API REST) et **React 19** (SPA).

---

## Aperçu

Pense-Bête permet à chaque utilisateur de :

- Créer un compte et se connecter de manière sécurisée
- Ajouter, modifier et supprimer des notes
- Attribuer une priorité à chaque note (Haute / Moyenne / Basse)
- Filtrer ses notes par priorité
- Bénéficier de notifications toast en temps réel

---

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Laravel 12, PHP 8.2+ |
| Authentification | Laravel Sanctum (tokens Bearer) |
| Base de données | SQLite (dev) / MySQL, PostgreSQL (prod) |
| Frontend | React 19, React Router 7 |
| HTTP Client | Axios |
| Styles | CSS custom (design tokens, sans framework UI) |

---

## Structure du projet

```
pense-bête/
├── notes-backend/          # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php   # Register, Login, Logout
│   │   │   └── NoteController.php   # CRUD notes
│   │   └── Models/
│   │       ├── User.php
│   │       └── Note.php
│   ├── database/migrations/
│   ├── routes/
│   │   └── api.php                  # Routes de l'API
│   └── config/cors.php              # CORS configuré pour React
│
└── notes-frontendd/pense-bete/      # SPA React
    └── src/
        ├── api/axios.js             # Instance Axios + intercepteurs
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   └── Notes.js
        └── components/
            ├── NoteForm.js
            ├── NoteList.js
            ├── NoteItem.js
            └── Toast.js
```

---

## Prérequis

- PHP >= 8.2 et Composer
- Node.js >= 18 et npm
- Extension PHP : `pdo_sqlite` (ou `pdo_mysql` pour la production)

---

## Installation & lancement

### 1. Backend (Laravel)

```bash
cd notes-backend

# Installer les dépendances
composer install

# Copier et configurer l'environnement
cp .env.example .env
php artisan key:generate

# Créer la base de données et exécuter les migrations
touch database/database.sqlite
php artisan migrate

# (Optionnel) Seeder de test
php artisan db:seed

# Démarrer le serveur
php artisan serve
```

Le backend tourne sur **http://localhost:8000**.

---

### 2. Frontend (React)

```bash
cd notes-frontendd/pense-bete

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

Le frontend tourne sur **http://localhost:3000**.

---

## API — Endpoints

Toutes les routes sont préfixées par `/api`.

| Méthode | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | Non | Créer un compte |
| `POST` | `/login` | Non | Se connecter |
| `POST` | `/logout` | Oui | Se déconnecter |
| `GET` | `/notes` | Oui | Lister ses notes |
| `POST` | `/notes` | Oui | Créer une note |
| `PUT` | `/notes/{id}` | Oui | Modifier une note |
| `DELETE` | `/notes/{id}` | Oui | Supprimer une note |

### Authentification

Les routes protégées nécessitent un header :

```
Authorization: Bearer <token>
```

Le token est retourné lors du login/register et stocké dans le `localStorage` côté frontend.

### Exemple de payload — Créer une note

```json
{
  "title": "Faire les courses",
  "content": "Lait, pain, œufs",
  "priority": "Haute"
}
```

Les valeurs valides pour `priority` : `Basse`, `Moyenne`, `Haute`.

---

## Fonctionnalités

- **Authentification sécurisée** — Laravel Sanctum avec tokens API
- **CRUD complet** — Créer, lire, modifier, supprimer des notes
- **Filtrage** — Par priorité (Toutes / Haute / Moyenne / Basse)
- **Validation** — Côté frontend (titre obligatoire, max 100 caractères) et backend
- **Isolation des données** — Chaque utilisateur ne voit que ses propres notes
- **Notifications** — Toasts animés pour les succès et erreurs
- **Gestion des erreurs réseau** — Redirection automatique vers `/login` sur 401
- **Interface responsive** — Adaptée mobile et desktop

---

## Configuration CORS

Le backend autorise par défaut les origines suivantes (voir `config/cors.php`) :

```
http://localhost:3000
http://localhost:5173
```

Pour la production, remplacez ces valeurs par l'URL de votre frontend.

---

## Variables d'environnement clés (`.env`)

```env
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite

# Pour MySQL en production :
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=pense_bete
# DB_USERNAME=root
# DB_PASSWORD=secret
```

---

## Lancer les tests

```bash
# Backend
cd notes-backend
php artisan test

# Frontend
cd notes-frontendd/pense-bete
npm test
```

---

## Licence

Projet personnel — tous droits réservés.

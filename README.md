# Ready-Set-Bid: React/Rails API

## Description

Apple Cypher is an app for families to find fun things do around the Dallas Fort Worth Metroplex.

As a User, you can:

1. Create an account.
2. View all the places which have been saved by other users and their location on a map.
3. Save a new place that can be seen by other users.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Heroku CLI
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Setup

Start by **cloning** the project repository:

```console
$ git clone git@github.com:JPStupfel/ready-set-bid.git
$ cd ready-set-bid
$ code .
```

When you're ready to start working on this project, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```sh
ruby -v
```

Make sure that the Ruby version you're running is listed in the [supported
runtimes][] by Heroku. At the time of writing, supported versions are 2.6.8,
2.7.4, or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site
for the latest supported versions.

If it's not, you can use `rvm` to install a newer version of Ruby:

```sh
rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```

[supported runtimes]: https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Install Postgresql

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

## Troubleshooting

If you ran into any errors along the way, here are some things you can try to
troubleshoot:

- If you're on a Mac and got a server connection error when you tried to run
  `rails db:create`, one option for solving this problem for Mac users is to
  install the Postgres app. To do this, first uninstall `postgresql` by running
  `brew remove postgresql`. Next, download the app from the
  [Postgres downloads page][postgres downloads page] and install it. Launch the
  app and click "Initialize" to create a new server. You should now be able to
  run `rails db:create`.

- If you're using WSL and got the following error running `rails db:create`:

  ```txt
  PG::ConnectionBad: FATAL:  role "yourusername" does not exist
  ```

  The issue is that you did not create a role in Postgres for the default user
  account. Check [this video](https://www.youtube.com/watch?v=bQC5izDzOgE) for
  one possible fix.

## This application makes use of three external API's, each requiring unique API keys that will have to be replaced within the code as follows:

Note, for numbers 1 & 2 you will need a paid google maps api subscription. To do so, follow the prompts on this page: https://developers.google.com/maps/documentation/javascript/get-api-key

1. Google Maps Javascript API, you must create a .env file in the client directory and include GOOGLE_MAPS_API_KEY= Your API Key here.

2. Google Maps Geocoding API, you must create a .env file in the root directory and include GOOGLE_GEOCODING_API_KEY= Your API Key here.

3. You will need to sign up for a Cloudinary account at https://cloudinary.com/. In the Cloudinary home menu, navigate to the "getting started" icon. Then select 'Configure your SDK' > Start configuring. Under "Ruby", copy the code in the lower window. Then create a file cloudinary.yml file in your config directory. Finally, paste the copied code into this file.

If you would like to learn more about how to secure your API keys, I have written a two part blog on the subject using examples from this project:

Part one: https://dev.to/jpstupfel/build-google-maps-search-component-in-react-part-one-204m

Part two: https://dev.to/jpstupfel/build-google-maps-search-component-in-react-part-two-57l8

# Integrating with Arcgis

1. Installed arcgis per https://odoe.net/blog/create-react-app

2. uninstalled tailwind per https://stackoverflow.com/questions/72175358/how-to-uninstall-tailwind-from-my-react-application

3. reinstalled npm i PostCss

# helpful command

scp -r /Users/jpstupfel/Development/post-bootcamp/applecyppher/client/build deploy@137.184.138.163:/home/deploy/applecypher/client/

scp -r deploy@137.184.138.163:/tmp/passenger-error-JVAJ0S.html /Users/jpstupfel/Development/post-bootcamp/


